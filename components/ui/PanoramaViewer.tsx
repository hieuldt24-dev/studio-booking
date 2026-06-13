"use client";

import { useEffect, useRef, useState } from "react";

interface PanoramaViewerProps {
  imageSrc: string;
  onLoaded?: () => void;
  onError?: (err: string) => void;
}

const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    // Flip Y for texture space
    vUv.y = 1.0 - vUv.y;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uYaw;
  uniform float uPitch;
  uniform float uFov;
  uniform float uAspectRatio;

  #define PI 3.14159265359

  void main() {
    // Convert UV to NDC coords [-1, 1]
    vec2 ndc = (vUv - 0.5) * 2.0;
    ndc.x *= uAspectRatio;

    // Camera focal length based on FOV
    float f = 1.0 / tan(uFov * 0.5 * PI / 180.0);
    vec3 ray = normalize(vec3(ndc.x, ndc.y, -f));

    // Rotate ray by Pitch (around X axis)
    float cp = cos(uPitch);
    float sp = sin(uPitch);
    vec3 r1;
    r1.x = ray.x;
    r1.y = ray.y * cp - ray.z * sp;
    r1.z = ray.y * sp + ray.z * cp;

    // Rotate ray by Yaw (around Y axis)
    float cy = cos(uYaw);
    float sy = sin(uYaw);
    vec3 r2;
    r2.x = r1.x * cy + r1.z * sy;
    r2.y = r1.y;
    r2.z = -r1.x * sy + r1.z * cy;

    // Calculate spherical coordinates (longitude theta, latitude phi)
    float theta = atan(r2.x, -r2.z);
    float phi = acos(r2.y);

    // Map spherical coordinates to equirectangular texture coords [0, 1]
    vec2 texCoord = vec2((theta + PI) / (2.0 * PI), phi / PI);

    gl_FragColor = texture2D(uTexture, texCoord);
  }
`;

export function PanoramaViewer({ imageSrc, onLoaded, onError }: PanoramaViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);

  // Interaction tracking refs
  const stateRef = useRef({
    yaw: 0,
    pitch: 0,
    targetYaw: 0,
    targetPitch: 0,
    fov: 75,
    targetFov: 75,
    isDragging: false,
    startX: 0,
    startY: 0,
    velYaw: 0,
    velPitch: 0,
    lastInteraction: Date.now(),
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    if (!gl) {
      const errMsg = "WebGL is not supported in this browser.";
      if (onError) onError(errMsg);
      setLoading(false);
      return;
    }

    // Compile Shader helper
    const compileShader = (src: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(VERTEX_SHADER_SRC, gl.VERTEX_SHADER);
    const fs = compileShader(FRAGMENT_SHADER_SRC, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      if (onError) onError("Failed to compile shaders.");
      return;
    }

    // Link Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      if (onError) onError("Failed to link shaders.");
      return;
    }

    // Get Uniform/Attrib locations
    const positionLoc = gl.getAttribLocation(program, "position");
    const yawLoc = gl.getUniformLocation(program, "uYaw");
    const pitchLoc = gl.getUniformLocation(program, "uPitch");
    const fovLoc = gl.getUniformLocation(program, "uFov");
    const aspectLoc = gl.getUniformLocation(program, "uAspectRatio");
    const textureLoc = gl.getUniformLocation(program, "uTexture");

    // Setup full screen quad buffer
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Setup Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Load Image
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    let isDestroyed = false;

    image.onload = () => {
      if (isDestroyed) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      setLoading(false);
      if (onLoaded) onLoaded();
    };

    image.onerror = () => {
      if (isDestroyed) return;
      setLoading(false);
      if (onError) onError("Không thể tải hình ảnh không gian 3D.");
    };

    // Keep track of resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        stateRef.current.width = width;
        stateRef.current.height = height;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    });
    resizeObserver.observe(canvas.parentElement || canvas);

    // Animation Loop
    let animationFrameId: number;

    const render = () => {
      if (isDestroyed) return;

      const state = stateRef.current;
      const now = Date.now();

      // Auto rotation when idle
      if (!state.isDragging && now - state.lastInteraction > 3000) {
        state.targetYaw += 0.0015;
      }

      // Drag inertia / friction
      if (!state.isDragging) {
        state.targetYaw += state.velYaw;
        state.targetPitch += state.velPitch;
        state.velYaw *= 0.92;
        state.velPitch *= 0.92;
      }

      // Clamp pitch to prevent turning upside down (-85 to +85 degrees in rad)
      const maxPitch = (85 * Math.PI) / 180;
      state.targetPitch = Math.max(-maxPitch, Math.min(maxPitch, state.targetPitch));

      // Easing LERP
      state.yaw += (state.targetYaw - state.yaw) * 0.15;
      state.pitch += (state.targetPitch - state.pitch) * 0.15;
      state.fov += (state.targetFov - state.fov) * 0.15;

      // Draw
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // Bind buffer
      gl.enableVertexAttribArray(positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      // Set uniforms
      gl.uniform1f(yawLoc, state.yaw);
      gl.uniform1f(pitchLoc, state.pitch);
      gl.uniform1f(fovLoc, state.fov);
      
      const aspect = state.width / (state.height || 1);
      gl.uniform1f(aspectLoc, aspect);

      // Bind texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(textureLoc, 0);

      // Draw quad
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event Handlers for Dragging
    const handleMouseDown = (e: MouseEvent) => {
      const state = stateRef.current;
      state.isDragging = true;
      state.startX = e.clientX;
      state.startY = e.clientY;
      state.velYaw = 0;
      state.velPitch = 0;
      state.lastInteraction = Date.now();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const state = stateRef.current;
      if (!state.isDragging) return;

      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;
      state.startX = e.clientX;
      state.startY = e.clientY;

      // Sensitivity factor
      const fovFactor = state.fov / 75;
      const sensitivity = 0.003 * fovFactor;

      const diffYaw = -dx * sensitivity;
      const diffPitch = dy * sensitivity;

      state.targetYaw += diffYaw;
      state.targetPitch += diffPitch;

      // Accumulate velocity for momentum
      state.velYaw = diffYaw * 0.5 + state.velYaw * 0.5;
      state.velPitch = diffPitch * 0.5 + state.velPitch * 0.5;
      state.lastInteraction = Date.now();
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    // Touch Event Handlers for Mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const state = stateRef.current;
      state.isDragging = true;
      state.startX = e.touches[0].clientX;
      state.startY = e.touches[0].clientY;
      state.velYaw = 0;
      state.velPitch = 0;
      state.lastInteraction = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const state = stateRef.current;
      if (!state.isDragging || e.touches.length !== 1) return;

      const touch = e.touches[0];
      const dx = touch.clientX - state.startX;
      const dy = touch.clientY - state.startY;
      state.startX = touch.clientX;
      state.startY = touch.clientY;

      const fovFactor = state.fov / 75;
      const sensitivity = 0.005 * fovFactor;

      const diffYaw = -dx * sensitivity;
      const diffPitch = dy * sensitivity;

      state.targetYaw += diffYaw;
      state.targetPitch += diffPitch;

      state.velYaw = diffYaw * 0.5 + state.velYaw * 0.5;
      state.velPitch = diffPitch * 0.5 + state.velPitch * 0.5;
      state.lastInteraction = Date.now();
    };

    // Mouse Wheel Zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const state = stateRef.current;
      
      const zoomSpeed = 0.05;
      state.targetFov += e.deltaY * zoomSpeed;
      // Clamp FOV between 30 and 100 degrees
      state.targetFov = Math.max(30, Math.min(100, state.targetFov));
      state.lastInteraction = Date.now();
    };

    // Register events
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleMouseUp);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup
    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleMouseUp);
      canvas.removeEventListener("wheel", handleWheel);

      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [imageSrc, onError, onLoaded]);

  // Adjust zoom handlers manually (e.g. from buttons)
  const adjustZoom = (amount: number) => {
    const state = stateRef.current;
    state.targetFov = Math.max(30, Math.min(100, state.targetFov + amount));
    state.lastInteraction = Date.now();
  };

  const toggleAutoRotate = () => {
    const state = stateRef.current;
    // Set last interaction in the past or future to toggle idle rotation
    const isIdle = Date.now() - state.lastInteraction > 3000;
    state.lastInteraction = isIdle ? Date.now() : Date.now() - 5000;
  };

  return (
    <div className="relative w-full h-full bg-neutral-950 overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-neutral-900/90 text-white z-10 transition-opacity duration-300">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
          <p className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-neutral-400">
            Đang tải không gian 3D...
          </p>
        </div>
      )}

      {/* Controls HUD */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
        <button
          onClick={() => adjustZoom(-15)}
          className="w-10 h-10 bg-black/60 hover:bg-black text-white rounded-lg flex items-center justify-center font-mono text-xl transition-colors border border-white/10"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => adjustZoom(15)}
          className="w-10 h-10 bg-black/60 hover:bg-black text-white rounded-lg flex items-center justify-center font-mono text-xl transition-colors border border-white/10"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={toggleAutoRotate}
          className="px-3 h-10 bg-black/60 hover:bg-black text-white rounded-lg flex items-center justify-center text-xs font-sans tracking-wider uppercase transition-colors border border-white/10"
          title="Auto-Rotate Toggle"
        >
          360° Auto
        </button>
      </div>
    </div>
  );
}
