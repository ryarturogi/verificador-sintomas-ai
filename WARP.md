# VitalCheck - WARP Guide

This file provides guidance to WARP (warp.dev) when working with the VitalCheck AI Symptom Checker codebase.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack (Next.js 15)
- `npm run build` - Build for production with Turbopack optimization
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Component Development
- `npx shadcn@latest add <component>` - Add new shadcn/ui components
- `npx shadcn@latest add button card input` - Add multiple components at once

### TypeScript
- `npx tsc --noEmit` - Type checking without compilation (useful for validation)

## Architecture Overview

This is a Next.js 15 application built as an AI-powered symptom checker using the App Router architecture.

### Key Technologies
- **Next.js 15** with App Router and Turbopack for fast development
- **React 19** with concurrent features
- **TypeScript** with strict configuration
- **Tailwind CSS 4** with utility classes
- **shadcn/ui** components (New York style) with Lucide icons
- **Framer Motion** for animations
- **ESLint** with Next.js configuration

### Source Structure
```
src/
├── app/                    # Next.js App Router pages and layouts
├── components/
│   ├── ui/                # shadcn/ui base components
│   └── symptom-checker/   # Application-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (includes cn() helper for class merging)
├── services/              # API services and business logic
├── types/                 # TypeScript type definitions
└── constants/             # Application constants
```

### Component System
- Uses shadcn/ui with "new-york" style variant
- CSS variables enabled for theming
- Components aliased via `@/components` path mapping
- Utility functions in `@/lib/utils` for class name merging with clsx and tailwind-merge

### Styling Approach
- Tailwind CSS 4 with PostCSS configuration
- Custom fonts: Geist Sans and Geist Mono
- CSS variables for theme customization
- Responsive design patterns with mobile-first approach

### Import Aliases
- `@/*` - Maps to `src/*`
- `@/components` - Component imports
- `@/lib/utils` - Utility functions
- `@/hooks` - Custom hooks

## Project Context

This is a medical symptom verification system that uses AI to help users evaluate symptoms and get relevant health information. The application emphasizes accessibility, responsive design, and user-friendly interactions.

**Important**: This is for informational/educational purposes only and should not replace professional medical advice.