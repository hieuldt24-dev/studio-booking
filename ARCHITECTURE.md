# ARCHITECTURE.md
Tài liệu kiến trúc kỹ thuật chuẩn
Next.js · TypeScript · Tailwind CSS
Version 1.0  |  Phiên bản nội bộ  |  Bắt buộc tuân thủ cho mọi landing page

## 0. Mục tiêu tài liệu
Tài liệu này định nghĩa cấu trúc dự án, quy ước đặt tên, tech stack, và workflow bắt buộc cho toàn bộ landing page được ship bởi team. Mọi thành viên (Intern, COO, Marketing) đều phải đọc và tuân thủ trước khi bắt đầu bất kỳ task nào.

| Mục tiêu | Chi tiết |
| :--- | :--- |
| Thống nhất codebase | Mọi LP có cùng cấu trúc thư mục, cùng naming convention. |
| Tăng tốc onboarding | Intern mới có thể clone template và ship LP trong ngày đầu. |
| Giảm bug sau deploy | Checklist rõ ràng, chuẩn hóa component, không tái phát lỗi cũ. |
| Đo được output | Mỗi LP có tracking chuẩn ngay từ template. |

## 1. Tech Stack chính thức
Đây là bộ công nghệ DUY NHẤT được sử dụng. Không thêm thư viện ngoài danh sách này mà không có phê duyệt từ CTO.

### 1.1 Core
| Công nghệ | Version | Mục đích | Ghi chú |
| :--- | :--- | :--- | :--- |
| Next.js | 14.x (App Router) | Framework chính, routing, SSR/SSG | Dùng App Router, KHÔNG dùng Pages Router |
| TypeScript | 5.x | Type safety toàn bộ codebase | strict mode bật, không dùng any |
| Tailwind CSS | 3.x / 4.x | Styling duy nhất | Không viết CSS thuần ngoài globals.css |
| React | 18.x / 19.x | UI library | Đi kèm Next.js |

### 1.2 UI Components & Icons
| Thư viện | Mục đích | Import pattern |
| :--- | :--- | :--- |
| shadcn/ui | Component library chuẩn (Button, Form, Dialog…) | `npx shadcn-ui add <component>` |
| Lucide React | Icon set duy nhất | `import { IconName } from 'lucide-react'` |
| clsx + tailwind-merge | Merge class Tailwind có điều kiện | `import { cn } from '@/lib/utils'` |

### 1.3 Form & Validation
- **React Hook Form**: Quản lý state form, validation
- **Zod**: Schema validation type-safe
- **@hookform/resolvers**: Kết nối Zod với React Hook Form

### 1.4 Analytics & Tracking
- **Google Tag Manager**: Container tracking tập trung (BẮT BUỘC)
- **Google Analytics 4**: Page view, events, conversion (BẮT BUỘC)

---

## 2. Cấu trúc thư mục chuẩn
Mọi project landing page phải tuân theo cấu trúc này. Không thêm thư mục gốc mà không có lý do kỹ thuật rõ ràng.

```
project-name/
├── app/                         # Next.js App Router
│   ├── (landing)/               # Route group cho LP
│   │   ├── [slug]/              # Dynamic route mỗi LP
│   │   │   ├── page.tsx         # Entry point LP
│   │   │   └── layout.tsx       # Layout riêng LP (nếu cần)
│   │   └── page.tsx             # Root page (Default view)
│   ├── api/                     # API routes (form submit, webhook)
│   ├── globals.css              # CSS global duy nhất
│   ├── layout.tsx               # Root layout (GTM, font, meta)
│   └── not-found.tsx            # 404 page
├── components/                  # Shared components
│   ├── ui/                      # shadcn/ui components (auto-generated)
│   ├── sections/                # LP sections tái sử dụng
│   │   └── HeroSection.tsx      # Core Stacked Hero Section
│   ├── forms/                   # Form components
│   └── layout/                  # Header, Footer, Navigation
│       └── Navbar.tsx           # Global Header Navbar
├── lib/                         # Utility functions
│   ├── utils.ts                 # cn(), formatters
│   └── content.ts               # Local content & cards database
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript type definitions
│   └── landing.ts               # Core type interface definitions
├── public/                      # Static assets
│   ├── images/
│   └── audio/                   # Audio asset sound effects
├── ARCHITECTURE.md              # File này
└── package.json
```

---

## 3. Naming Convention
Quy tắc đặt tên là bắt buộc. PR sẽ bị reject nếu vi phạm.

| Đối tượng | Convention | Ví dụ đúng | Ví dụ sai |
| :--- | :--- | :--- | :--- |
| File component | PascalCase.tsx | HeroSection.tsx | hero-section.tsx |
| File hook/util | camelCase.ts | useFormSubmit.ts | UseFormSubmit.ts |
| Thư mục | kebab-case | social-proof/ | SocialProof/ |
| Route (URL) | kebab-case | /san-pham-abc | /sanPhamAbc |
| Props interface | PascalCaseProps | HeroSectionProps | HeroSectionProp |
| Constant | SCREAMING_SNAKE_CASE | MAX_FORM_FIELDS | maxFormFields |

---

## 4. Component Pattern chuẩn
Mọi section trong LP phải theo cấu trúc TypeScript interface + named exports + Tailwind classes. Không dùng any.

```typescript
// Component template
interface HeroSectionProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage?: string;
}

export function HeroSection({
  title,
  description,
  ctaText,
  ctaHref,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen">
      {/* Content */}
    </section>
  );
}
```

---

## 5. Daily Async & QA Checklist
Mọi LP phải pass 100% QA Checklist trước khi deploy:

- [ ] Performance >= 80 (Google Lighthouse)
- [ ] Mobile responsive (320px - 2560px)
- [ ] Alt tags đầy đủ cho tất cả images
- [ ] Zero console errors
- [ ] Zero build errors
- [ ] SEO: meta tags, Open Graph
- [ ] Analytics tracking (GTM + GA4)
- [ ] Form validation hoạt động
- [ ] CTA links verified
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
