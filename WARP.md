# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server (runs on port 8080)
- `npm run build` - Build production version
- `npm run build:dev` - Build development version
- `npm run preview` - Preview built application
- `npm run lint` - Run ESLint for code quality

### Deployment
- `npm run predeploy` - Pre-deployment build
- `npm run deploy` - Deploy to GitHub Pages
- `npm run postbuild` - Post-build script (copies 404.html for SPA routing)

## Architecture Overview

This is a React + TypeScript + Vite application for the VITS (ICT Society of St. Sylvester's College) website. The project uses modern frontend technologies and follows a component-based architecture.

### Key Technologies
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Styling**: Tailwind CSS with custom animations and gradients
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM (client-side routing)
- **State Management**: TanStack Query for server state
- **Animations**: GSAP, Motion (Framer Motion successor), and custom CSS animations
- **3D Graphics**: Three.js with OGL library
- **Forms**: React Hook Form with Zod validation

### Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components (buttons, cards, etc.)
│   ├── Dock.tsx        # macOS-style dock navigation
│   ├── Navbar.tsx      # Main navigation component  
│   ├── Footer.tsx      # Site footer
│   └── [Feature].tsx   # Custom feature components (3D, animations)
├── pages/              # Page-level components
│   ├── Home.tsx        # Landing page with hero animations
│   ├── About.tsx       # About page
│   ├── Events.tsx      # Events listing
│   ├── Projects.tsx    # Projects showcase
│   ├── Gallery.tsx     # Image gallery
│   ├── Contact.tsx     # Contact form
│   └── NotFound.tsx    # 404 error page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configs
└── assets/             # Static assets
```

### Component Architecture

The application follows a hierarchical component structure:

1. **App.tsx** - Root component with providers and routing
2. **Pages** - Top-level page components that compose features
3. **Feature Components** - Complex components like `Interactive3DText`, `LightRays`, `LaserFlow`
4. **UI Components** - Reusable primitives from shadcn/ui
5. **Hooks** - Custom logic like `useScrollAnimation`, `useToast`

### Styling System

- **Base**: Tailwind CSS with custom configuration
- **Components**: CSS-in-JS through Tailwind classes
- **Themes**: CSS variables with dark mode support
- **Animations**: Mix of Tailwind animate classes and custom keyframes
- **3D Effects**: Canvas-based animations using Three.js/OGL

### Key Features

1. **Interactive 3D Elements**: Text animations, light rays, particle effects
2. **Responsive Design**: Mobile-first approach with adaptive layouts  
3. **Smooth Animations**: GSAP-powered scroll animations and page transitions
4. **Modern UI**: glassmorphism effects, gradient backgrounds, custom dock navigation
5. **Performance**: Optimized builds, code splitting, lazy loading

### Development Patterns

- **Component Composition**: Heavy use of compound components pattern
- **Custom Hooks**: Logic abstraction for reusable functionality
- **TypeScript**: Full type safety with interfaces for props and data
- **Path Aliases**: `@/` prefix for clean imports from src directory
- **CSS Custom Properties**: Dynamic theming through CSS variables

### Deployment Configuration

- **Target**: GitHub Pages with custom domain support
- **Base Path**: Configurable via environment (production: `/vester-tech-hub/`)
- **SPA Routing**: 404.html fallback for client-side routing
- **Build Optimization**: Vite handles chunking and optimization automatically

## Development Notes

- The project uses both npm and bun (bun.lockb present), but package.json scripts use npm
- ESLint configured with React hooks rules and TypeScript support
- Custom animations rely heavily on GSAP and Motion libraries
- 3D components may require WebGL support in development environment
- The dock component provides primary navigation and follows macOS design patterns