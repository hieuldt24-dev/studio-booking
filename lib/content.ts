import { LandingPageContent } from "@/types/landing";

export interface MultiLangContent {
  vi: LandingPageContent;
  en: LandingPageContent;
}

export const landingPagesDb: Record<string, MultiLangContent> = {
  root: {
    vi: {
      slug: "",
      seo: {
        title: "LUMINA | Hệ thống Studio Nhiếp ảnh Cao cấp",
        description: "Không gian Sáng tạo. Tối ưu hóa cho kỹ thuật. Được thiết kế cho các nghệ sĩ sáng tạo. Ba không gian studio độc bản phù hợp với mọi ý tưởng nghệ thuật.",
        keywords: ["phòng studio", "thuê studio concept", "daylight studio", "lumina studio", "studio chụp ảnh quay phim"],
      },
      hero: {
        title: "Không Gian Để Sáng Tạo",
        description: "Hệ thống Studio Nhiếp ảnh Cao cấp",
        ctaText: "KHÁM PHÁ PHÒNG QUAY",
        ctaHref: "#studios",
        backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gdOuE2geUt0i4zpCj3LotPluaCixHeWyLZM2qTtJo9v7qqLYZqdrOax28U3Fp73OQ_1Fjyh2t74mj5xqS5ouZeH4p3WW5L4JKoWyFzZtWM7Ln8-IuqGJMZZ4ql4SU7Z2GjI32db__NayxKwDfEognSac1Tb6PgvjMbLT9n-2sy2b5FLJWafo6540ZTUvW4sgl3uPdnD-Xt6IO72EOvx_5aMS74uHvWYdvQx046Pz9XDyztlFgt69PILEZayo8kiehpwczviAonLA=s2560",
      },
      features: {
        tagline: "Tầm Nhìn",
        title: "Nhiếp ảnh là ngôn ngữ duy nhất có thể được thấu hiểu ở bất kỳ nơi nào trên thế giới.",
        description: "BRUNO BARBEY",
        items: [],
      },
      studios: {
        title: "Không gian Studio",
        description: "Thiết kế tối ưu cho kỹ thuật quay chụp. Dành cho các nhà sáng tạo nghệ thuật. Ba không gian studio độc bản phù hợp với mọi ý tưởng của bạn.",
        rooms: [
          {
            id: "studio-a",
            name: "Studio A: The Loft",
            description: "Phòng studio phong cách loft cao cấp với trần cao và sàn bê tông mài bóng. Các ô cửa kính công nghiệp lớn từ trần đến sàn ngập tràn ánh sáng tự nhiên dịu nhẹ của buổi sáng. Tông màu đơn sắc chủ đạo với các sắc độ xám mát, trắng tinh khôi và đen thạch anh.",
            pricePerHour: 450000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gdOuE2geUt0i4zpCj3LotPluaCixHeWyLZM2qTtJo9v7qqLYZqdrOax28U3Fp73OQ_1Fjyh2t74mj5xqS5ouZeH4p3WW5L4JKoWyFzZtWM7Ln8-IuqGJMZZ4ql4SU7Z2GjI32db__NayxKwDfEognSac1Tb6PgvjMbLT9n-2sy2b5FLJWafo6540ZTUvW4sgl3uPdnD-Xt6IO72EOvx_5aMS74uHvWYdvQx046Pz9XDyztlFgt69PILEZayo8kiehpwczviAonLA",
            capacity: 12,
            equipment: ["Bộ đèn Profoto B10X Plus", "Các loại tản sáng / modifier", "Gương phản xạ & bao cát"],
            panoramaUrl: "/images/panorama-chatgpt.jpg",
          },
          {
            id: "studio-b",
            name: "Studio B: Industrial Edge",
            description: "Studio nhiếp ảnh phong cách công nghiệp với những bức tường gạch mộc được sơn màu trắng mờ sạch sẽ. Các dầm thép chịu lực chạy cắt ngang trần nhà, nâng đỡ hệ thống thanh ray treo đèn chuyên nghiệp phía trên.",
            pricePerHour: 350000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCymThhRxVtTZ0j_XjjVKcuOhcw_dPjEbSPU4QmRU38efsbwJrzhQuzg3CH6vpBs_I29Oag5BSnFrrqXE5W3U4qmNcc0RHy03l1Yt80hs6BwdecdBXAiqXXVOnX_kzXe6wnU4jT5XSFWoMIbVIlU8HxrBNUftwC9hMJqjlfsFHAkeYfjWmvAx5uf2LdxHUecDuE5cmsj3Fgq6LgiqF5gbUFfX5Lur9ayvAr3x5JPwLrCdf7G6BUlFDoTEm9n-FQhnKcQ83PsCwczsUT",
            capacity: 8,
            equipment: ["Vách phông vô cực (Cyc Wall)", "Trần cao 4.5m", "Bộ đèn tiêu chuẩn"],
            panoramaUrl: "/images/panorama-b.jpg",
          },
          {
            id: "studio-c",
            name: "Studio C: The Daylight Suite",
            description: "Một không gian studio yên bình, tươi sáng được thiết kế đặc biệt cho các buổi chụp chân dung bằng ánh sáng tự nhiên. Phong cách trang trí tối giản với một chiếc ghế nghệ thuật độc bản và vài cây nhiệt đới chậu đen lớn. Cửa sổ hướng Nam đón sáng chan hòa.",
            pricePerHour: 400000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOEq6kuR9dewOd1p0l3g5gNJ0O0VcRG51Ckc-u6t8jh4P8mRonTdHchFJHnU42sBNEUj_ivScIwmLqAhLl33pcKcL47UgXHo-Rpj0ULchU09CPHAwFm37E9Ynp4cnYRpYzaky6lErAAAr6NMU75TsbtRVE3-vXrZx7MFEoTgh78P8_dwjCavFof58xLNQGS0HGknurDnR9auYP7OGGS7IFzivS9fIXTf43VVbUqsIYtO4exljlL5s0cspBkOsPSN0xfVre6gRm5k5h",
            capacity: 6,
            equipment: ["Góc đón nắng tự nhiên", "Cài đặt sẵn sàng chụp chân dung", "Bộ phản sáng chuyên dụng"],
            panoramaUrl: "/images/panorama-c.jpg",
          },
        ],
      },
      testimonials: {
        title: "Đánh giá từ đối tác",
        testimonials: [],
      },
      equipment: [
        {
          id: "sony-fx3",
          name: "Sony FX3 Cinema Camera",
          category: "camera",
          description: "Máy quay điện ảnh full-frame nhỏ gọn với độ nhạy sáng cực cao, hỗ trợ ghi hình 4K 120p và hệ màu S-Cinetone chuyên nghiệp.",
          pricePerSession: 800000,
          image: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=600&auto=format&fit=crop",
          specs: ["Xuất file Raw 4K 120p", "Dải động sáng 15+ stop", "Kèm cụm tay cầm XLR Audio"]
        },
        {
          id: "sony-a7rv",
          name: "Sony A7R V (61MP)",
          category: "camera",
          description: "Máy ảnh mirrorless độ phân giải siêu cao 61MP, trang bị lấy nét tự động AI thông minh và chống rung 8 stop. Hoàn hảo cho chụp quảng cáo thương mại.",
          pricePerSession: 600000,
          image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop",
          specs: ["Cảm biến 61 Megapixel", "Quay video 8K 24p", "Tự động nhận diện chủ thể AI"]
        },
        {
          id: "sony-2470-gm2",
          name: "Sony FE 24-70mm f/2.8 GM II",
          category: "camera",
          description: "Ống kính zoom đa dụng cao cấp nhất. Độ nét cực cao trên toàn dải tiêu cự, lấy nét tự động siêu nhanh và hiệu ứng xóa phông tuyệt đẹp.",
          pricePerSession: 300000,
          image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=600&auto=format&fit=crop",
          specs: ["Khẩu độ mở rộng F/2.8 toàn dải", "Lớp phủ Nano AR II chống lóa tốt", "Kháng bụi và kháng nước nhẹ"]
        },
        {
          id: "profoto-b10x",
          name: "Profoto B10X Plus (2-Light Kit)",
          category: "lighting",
          description: "Bộ 2 đèn flash studio di động dùng pin cực mạnh và linh hoạt. Đã bao gồm tản sáng softbox, trigger đồng bộ và chân đèn đứng.",
          pricePerSession: 500000,
          image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
          specs: ["Công suất phát sáng 500 Ws", "Tương thích chế độ TTL & HSS", "Đèn dẫn LED liên tục cho video"]
        },
        {
          id: "aputure-600d",
          name: "Aputure 600d Pro LED Light",
          category: "lighting",
          description: "Đèn LED nguồn điểm công suất cực lớn, lý tưởng cho quay phim và giả lập ánh sáng ban ngày. Thiết kế chống chịu thời tiết chuyên nghiệp.",
          pricePerSession: 600000,
          image: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=600&auto=format&fit=crop",
          specs: ["Công suất bóng LED COB 600W", "Thiết kế kháng bụi/nước Pro", "Điều khiển từ xa app Sidus Link"]
        },
        {
          id: "shure-sm7b",
          name: "Shure SM7B Vocal Kit",
          category: "audio",
          description: "Bộ microphone tiêu chuẩn công nghiệp cho podcasting và ghi âm giọng nói. Bao gồm cục kích âm Cloudlifter và soundcard Focusrite Scarlett.",
          pricePerSession: 300000,
          image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
          specs: ["Micro Dynamic định hướng cao", "Kích âm Cloudlifter CL-1 cực sạch", "Soundcard Focusrite 2i2 đi kèm"]
        },
        {
          id: "dji-rs3-pro",
          name: "DJI RS 3 Pro Gimbal",
          category: "other",
          description: "Gimbal chống rung 3 trục chuyên nghiệp. Hỗ trợ các cấu hình máy quay cinema lớn với khóa trục tự động và lấy nét LiDAR.",
          pricePerSession: 350000,
          image: "https://images.unsplash.com/photo-1619597455322-4fbbd820250a?q=80&w=600&auto=format&fit=crop",
          specs: ["Tải trọng thực tế lên đến 4.5kg", "Khóa các trục tự động", "Cấu tạo từ sợi carbon siêu nhẹ"]
        }
      ],
    },
    en: {
      slug: "",
      seo: {
        title: "LUMINA | Premium Photography Studios",
        description: "Space to Create. Engineered for precision. Crafted for artists. Three distinct environments designed to accommodate any creative vision.",
        keywords: ["photography studio", "loft studio", "daylight studio", "lumina studio", "concept room"],
      },
      hero: {
        title: "Space to Create",
        description: "Premium Photography Studios",
        ctaText: "EXPLORE SPACES",
        ctaHref: "#studios",
        backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gdOuE2geUt0i4zpCj3LotPluaCixHeWyLZM2qTtJo9v7qqLYZqdrOax28U3Fp73OQ_1Fjyh2t74mj5xqS5ouZeH4p3WW5L4JKoWyFzZtWM7Ln8-IuqGJMZZ4ql4SU7Z2GjI32db__NayxKwDfEognSac1Tb6PgvjMbLT9n-2sy2b5FLJWafo6540ZTUvW4sgl3uPdnD-Xt6IO72EOvx_5aMS74uHvWYdvQx046Pz9XDyztlFgt69PILEZayo8kiehpwczviAonLA=s2560",
      },
      features: {
        tagline: "The Vision",
        title: "Photography is the only language that can be understood anywhere in the world.",
        description: "BRUNO BARBEY",
        items: [],
      },
      studios: {
        title: "Our Studios",
        description: "Engineered for precision. Crafted for artists. Three distinct environments designed to accommodate any creative vision.",
        rooms: [
          {
            id: "studio-a",
            name: "Studio A: The Loft",
            description: "A high-end loft photography studio with soaring ceilings and polished concrete floors. Huge floor-to-ceiling industrial windows flood the space with soft, natural morning light. Monochromatic palette dominated by shades of cool gray, stark white, and deep obsidian.",
            pricePerHour: 450000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gdOuE2geUt0i4zpCj3LotPluaCixHeWyLZM2qTtJo9v7qqLYZqdrOax28U3Fp73OQ_1Fjyh2t74mj5xqS5ouZeH4p3WW5L4JKoWyFzZtWM7Ln8-IuqGJMZZ4ql4SU7Z2GjI32db__NayxKwDfEognSac1Tb6PgvjMbLT9n-2sy2b5FLJWafo6540ZTUvW4sgl3uPdnD-Xt6IO72EOvx_5aMS74uHvWYdvQx046Pz9XDyztlFgt69PILEZayo8kiehpwczviAonLA",
            capacity: 12,
            equipment: ["Profoto B10X Plus Kit", "Selection of Modifiers", "V-Flats & Sandbags"],
            panoramaUrl: "/images/panorama-chatgpt.jpg",
          },
          {
            id: "studio-b",
            name: "Studio B: Industrial Edge",
            description: "An industrial-style photography studio with exposed brick walls painted in a clean matte white. Heavy metal structural beams cross the ceiling, supporting a professional rail system for overhead lighting.",
            pricePerHour: 350000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCymThhRxVtTZ0j_XjjVKcuOhcw_dPjEbSPU4QmRU38efsbwJrzhQuzg3CH6vpBs_I29Oag5BSnFrrqXE5W3U4qmNcc0RHy03l1Yt80hs6BwdecdBXAiqXXVOnX_kzXe6wnU4jT5XSFWoMIbVIlU8HxrBNUftwC9hMJqjlfsFHAkeYfjWmvAx5uf2LdxHUecDuE5cmsj3Fgq6LgiqF5gbUFfX5Lur9ayvAr3x5JPwLrCdf7G6BUlFDoTEm9n-FQhnKcQ83PsCwczsUT",
            capacity: 8,
            equipment: ["Cyc Wall", "15ft Ceilings", "Standard Light Kit"],
            panoramaUrl: "/images/panorama-b.jpg",
          },
          {
            id: "studio-c",
            name: "Studio C: The Daylight Suite",
            description: "A serene, bright photography studio specifically designed for natural light portraits. Minimalist decor with a single sculptural chair and a few large tropical plants in black pots. Southern-facing windows.",
            pricePerHour: 400000,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOEq6kuR9dewOd1p0l3g5gNJ0O0VcRG51Ckc-u6t8jh4P8mRonTdHchFJHnU42sBNEUj_ivScIwmLqAhLl33pcKcL47UgXHo-Rpj0ULchU09CPHAwFm37E9Ynp4cnYRpYzaky6lErAAAr6NMU75TsbtRVE3-vXrZx7MFEoTgh78P8_dwjCavFof58xLNQGS0HGknurDnR9auYP7OGGS7IFzivS9fIXTf43VVbUqsIYtO4exljlL5s0cspBkOsPSN0xfVre6gRm5k5h",
            capacity: 6,
            equipment: ["Sunlit View", "Portrait Ready Setups", "Reflector Selection"],
            panoramaUrl: "/images/panorama-c.jpg",
          },
        ],
      },
      testimonials: {
        title: "What our clients say",
        testimonials: [],
      },
      equipment: [
        {
          id: "sony-fx3",
          name: "Sony FX3 Cinema Camera",
          category: "camera",
          description: "Compact full-frame cinema camera with outstanding low-light sensitivity, 4K 120p recording, and S-Cinetone color science.",
          pricePerSession: 800000,
          image: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=600&auto=format&fit=crop",
          specs: ["4K 120p Raw Output", "15+ Stops Dynamic Range", "XLR Handle Unit Included"]
        },
        {
          id: "sony-a7rv",
          name: "Sony A7R V (61MP)",
          category: "camera",
          description: "High-resolution mirrorless camera featuring a 61MP sensor, AI-based autofocus, and 8-stop image stabilization. Perfect for commercial photography.",
          pricePerSession: 600000,
          image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop",
          specs: ["61 Megapixel Sensor", "8K 24p Video Capture", "AI Subject Recognition"]
        },
        {
          id: "sony-2470-gm2",
          name: "Sony FE 24-70mm f/2.8 GM II",
          category: "camera",
          description: "The ultimate standard zoom lens. Extremely sharp throughout the zoom range, with rapid autofocus and excellent background defocus.",
          pricePerSession: 300000,
          image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=600&auto=format&fit=crop",
          specs: ["f/2.8 Constant Aperture", "Nano AR Coating II", "Dust & Moisture Resistant"]
        },
        {
          id: "profoto-b10x",
          name: "Profoto B10X Plus (2-Light Kit)",
          category: "lighting",
          description: "Powerful and versatile battery-powered studio flashes. Includes modifiers, sync triggers, and stands.",
          pricePerSession: 500000,
          image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
          specs: ["500 Ws Power Output", "TTL & HSS Compatible", "Continuous LED Video Light"]
        },
        {
          id: "aputure-600d",
          name: "Aputure 600d Pro LED Light",
          category: "lighting",
          description: "High-output point-source LED light, ideal for video and heavy-ambient daylight fill. Weatherproof construction.",
          pricePerSession: 600000,
          image: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=600&auto=format&fit=crop",
          specs: ["600W COB LED Output", "Weather-Resistant Design", "Sidus Link App Control"]
        },
        {
          id: "shure-sm7b",
          name: "Shure SM7B Vocal Kit",
          category: "audio",
          description: "Industry-standard podcasting and vocal microphone. Includes Cloudlifter pre-amp and Focusrite Scarlett interface.",
          pricePerSession: 300000,
          image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
          specs: ["Dynamic Vocal Mic", "Cloudlifter CL-1 Gain Booster", "Focusrite Audio Interface"]
        },
        {
          id: "dji-rs3-pro",
          name: "DJI RS 3 Pro Gimbal",
          category: "other",
          description: "Professional 3-axis gimbal stabilizer. Supports large cinema payloads with auto-locking axes and LiDAR focusing compatibility.",
          pricePerSession: 350000,
          image: "https://images.unsplash.com/photo-1619597455322-4fbbd820250a?q=80&w=600&auto=format&fit=crop",
          specs: ["4.5kg Tested Payload", "Automated Axis Locks", "Carbon Fiber Construction"]
        }
      ],
    }
  },
};
