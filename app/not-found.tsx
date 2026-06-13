"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative p-4 overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center relative z-10 max-w-md mx-auto">
        {/* Visual Icon */}
        <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-8 animate-pulse">
          <HelpCircle className="w-10 h-10 text-indigo-400" />
        </div>

        {/* Heading */}
        <h1 className="text-8xl font-black font-display tracking-widest text-indigo-500 mb-2">
          404
        </h1>
        <h2 className="text-2xl font-bold font-display mb-4">
          Không tìm thấy trang yêu cầu
        </h2>
        
        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          Đường dẫn bạn truy cập có thể đã thay đổi, bị xóa hoặc không tồn tại. Vui lòng kiểm tra lại URL hoặc quay lại trang chủ.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 w-full sm:w-auto rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 w-full sm:w-auto rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
