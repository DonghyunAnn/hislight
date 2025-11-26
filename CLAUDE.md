# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT
- ALWAYS use Shadcn MCP to create UI.
- ALWAYS ask user for permission whet implementing a plan.
- Never use emoji for design.
- Always prioritize server component over client component.

## Project Overview

HisLight is a Next.js 16 application using React 19 with TypeScript, styled with Tailwind CSS v4, and configured with shadcn/ui components.

## Project Purpose & Vision

HisLight is a platform providing life information for retired missionaries and pastors.

### Target Users
- **Age Group**: 50+ retired missionaries and pastors
- **Primary Device**: PC (with mobile responsive support)
- **Characteristics**: Prefer systematically organized information over complex layouts

### MVP Scope (Phase 1)
- **Categories**: Housing, Daily Life (2 categories)
- **Format**: Searchable resource directory with advanced filtering
- **Features**:
  - Search functionality
  - Multi-level filtering (Taxonomy + Tags)
  - Categorized resource cards with descriptions
- **Page Structure**: Separate pages per category (`/housing`, `/life`)
- **UI Pattern**: Vercel Templates style (SearchBar + Sidebar + Grid)
- **Data Source**: JSON files in `data/` directory
  - `categories.json`: 2 major categories
  - `subcategories.json`: 9 subcategories
  - `resources.json`: 20 resources
  - `tags.json`: 40+ tags for filtering

## Design Concept

### Brand Identity
- **Concept**: Lighthouse
  - "Like a lighthouse illuminating the dark sea at night, guiding the path after retirement"
  - Light = Hope, Guidance, Direction

### Color System
- **Primary (Yellow)**: oklch(0.7 0.18 90) - Lighthouse beam
- **Secondary (Navy)**: oklch(0.25 0.08 250) - Night sea
- **Philosophy**:
  - Yellow = Light, Hope
  - Navy = Night, Sea, Stability

### Accessibility Requirements
- ✅ Light mode by default (NO dark mode)
- ✅ Large fonts (16px+ base, 24px+ headings)
- ✅ High contrast (WCAG AAA target)
- ✅ Large click/tap areas
- ✅ Clear typography

## Core Message

**Psalm 71:18**
```
오! 하나님,
내가 늙고 머리가 희어졌다고
나를 버리지 마소서
내가 늙어 죽을 때까지
내 후손에게
주의 크신 능력을 전하겠습니다.
```

## UI/UX Guidelines

### Design Principles
- Generous spacing (inspired by Linear/Vercel, but light mode)
- Prevent information overload
- Intuitive navigation
- Clean, minimal aesthetic

### Future Considerations
- Admin panel for link management
- Search functionality
- Category expansion
- User feedback system


## Development Commands

### Running the application
```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
```

### Installing packages
```bash
npm install          # Install all dependencies
```

## Component Development

### Components Demo Page
- **URL**: `http://localhost:3000/components-demo`
- **Purpose**: Visual showcase and testing page for all implemented components
- **Usage**: When implementing new components, add them to this page to demonstrate their functionality
- **Note**: This is a development-only page and should not be included in production builds

### Component Development Workflow
1. Implement the component in the appropriate directory (`components/common/`, `components/layout/`, etc.)
2. Add the component to `/components-demo` page with:
   - Visual examples
   - Different size/state variations
   - Usage documentation
3. Test the component in the demo page before integrating into actual pages

## Architecture

### Framework & Routing
- **Next.js 16** with App Router (app directory)
- Server Components by default
- File-based routing in `app/` directory

### Styling Stack
- **Tailwind CSS v4** (@tailwindcss/postcss)
- Custom utility: `cn()` in `lib/utils.ts` for conditional class merging
- CSS variables configured in `app/globals.css`
- Global styles and Tailwind directives in `app/globals.css`

### Component System
- **shadcn/ui** configured with:
  - Style: "new-york"
  - Base color: "neutral"
  - Icon library: lucide-react
  - Components installed to `@/components/ui`
- Path aliases configured in `tsconfig.json`:
  - `@/*` maps to root directory
  - Specific aliases in `components.json`:
    - `@/components` - Components directory
    - `@/lib/utils` - Utility functions
    - `@/components/ui` - shadcn/ui components
    - `@/hooks` - Custom React hooks

### TypeScript Configuration
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler (Next.js optimized)
- Path aliases use `@/*` pattern

### Fonts
- Geist Sans and Geist Mono loaded via `next/font/google`
- CSS variables: `--font-geist-sans` and `--font-geist-mono`
- Applied globally in root layout

## Code Organization

```
app/                  # Next.js App Router
  ├── layout.tsx      # Root layout with fonts and metadata
  ├── page.tsx        # Home page (category selection)
  ├── components-demo/ # Component showcase page (development only)
  │   └── page.tsx
  ├── housing/        # Housing category page
  │   └── page.tsx
  ├── life/           # Life category page
  │   └── page.tsx
  └── globals.css     # Global styles and Tailwind configuration

components/           # React components
  ├── ui/             # shadcn/ui component installations (auto-generated)
  ├── common/         # Shared/reusable components across the app
  │   ├── PageContainer.tsx       # Layout wrapper
  │   ├── UnicornBackground.tsx   # Unicorn Studio animation
  │   └── CategoryCard.tsx        # Category selection card (homepage)
  ├── layout/         # Layout components
  │   ├── Header.tsx
  │   └── Footer.tsx
  ├── resource/       # Resource browsing components (Vercel Templates style)
  │   ├── ResourcePageLayout.tsx  # Main layout (SearchBar + Sidebar + Grid)
  │   ├── SearchBar.tsx           # Search functionality
  │   ├── FilterSidebar.tsx       # Left sidebar container
  │   ├── SubcategoryFilter.tsx   # Subcategory filter (radio buttons)
  │   ├── TagFilter.tsx           # Tag filter (checkboxes)
  │   └── ResourceCard.tsx        # Individual resource card
  └── icons/          # Custom SVG icons
      └── LighthouseIcon.tsx

lib/
  ├── utils.ts        # Utility functions (cn for className merging)
  └── types.ts        # TypeScript type definitions (Category, Subcategory, Resource, Tag)

data/                 # JSON data files
  ├── categories.json    # 2 major categories (housing, life)
  ├── subcategories.json # 9 subcategories
  ├── resources.json     # 20 resources with links
  ├── tags.json          # 40+ filtering tags
  └── DB_README.md       # Data structure documentation

public/               # Static assets
  └── logo.svg        # HisLight logo

prompts/              # Component implementation guides
  ├── CategoryCard.md
  ├── Footer.md
  ├── Header.md
  ├── HomePage.md
  ├── LighthouseIcon.md
  ├── PageContainer.md
  └── UnicornBackground.md
```

### Component Organization Rules

- **`ui/`**: shadcn/ui managed components - do not modify manually
- **`common/`**: Generic reusable components used across the entire app
  - PageContainer: Layout wrapper with consistent padding/spacing
  - UnicornBackground: Client component for Unicorn Studio animations
  - CategoryCard: Homepage category selection card
- **`layout/`**: Structural layout components (Header, Footer, etc.)
- **`resource/`**: Resource browsing and filtering components
  - Vercel Templates inspired layout
  - Search + Multi-filter functionality
  - Grid-based resource display
- **`icons/`**: Custom SVG icon components

### Data Structure

HisLight uses a hierarchical JSON data structure:

```
Category (대분류)
 └─ Subcategory (중분류)
     └─ Resource (리소스)
         └─ Tags (태그)
```

**Example:**
```
주거 (Category)
 └─ 금융지원 (Subcategory)
     └─ 버팀목 전세자금대출 (Resource)
         └─ #전세 #대출 #무주택 (Tags)
```

See `data/DB_README.md` for detailed data structure documentation.

## Working with shadcn/ui

When adding shadcn/ui components, they will be installed to `@/components/ui` with the New York style variant. The `cn()` utility from `@/lib/utils` should be used for conditional className composition.

## ESLint Configuration

ESLint uses the flat config format with Next.js presets:
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## External Integrations

### Unicorn Studio
- **Purpose**: Animated backgrounds for hero sections
- **Component**: `UnicornBackground.tsx` (Client Component)
- **Usage**: Background animations loaded via CDN
- **Implementation Guide**: `prompts/UnicornBackground.md`
- **Script Strategy**: `lazyOnload` for optimal performance
- **Accessibility**: Backgrounds are decorative (aria-hidden)
- **Note**: Watermark hiding CSS exists in `globals.css` for development/testing purposes. Verify Unicorn Studio Terms of Service for production use.
