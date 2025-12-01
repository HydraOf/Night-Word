# Night Word - Interactive 3D Night Experience Platform

## Overview

Night Word is an immersive web platform combining 3D visualization, AI-powered features, and social interaction in a cyberpunk-themed night world. The application presents users with an interactive 3D scene featuring a purple moon, animated stars, and floating UI elements, all designed with a futuristic aesthetic inspired by experimental web experiences and synthwave culture.

The platform is built as a modern full-stack web application with plans to incorporate AI storytelling, community features, and night-themed events scheduled for launch in 2026.

## Recent Changes (December 2025)

- Fixed SiTwitter → SiX icon import for react-icons compatibility
- Added WebGL error handling with graceful fallbacks for headless environments
- Improved AI notification accessibility (Escape key, focus trap, ARIA attributes)
- Fixed responsive design for hero section and roadmap canvas
- All e2e tests passing

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack**: React 18 with TypeScript, using Vite as the build tool and development server. The application follows a component-based architecture with client-side routing via Wouter.

**3D Rendering**: Three.js is used for all 3D graphics, creating an immersive night scene as the primary interface. The 3D canvas runs at 60fps with fog effects, animated celestial bodies, and particle systems for stars. The architecture separates 3D rendering logic into dedicated scene components (NightScene, RoadmapScene) that manage their own WebGL renderers, cameras, and animation loops.

**UI Component System**: Built on Radix UI primitives with a custom design system using shadcn/ui components. The UI follows a glassmorphism design pattern with backdrop blur effects, gradient borders, and floating elements overlaid on the 3D canvas. Typography uses Orbitron for headers (futuristic, geometric) and Inter for body text.

**Styling Approach**: TailwindCSS with extensive customization for the cyberpunk theme. Custom CSS variables define a comprehensive design token system covering colors (purple/pink gradients), spacing, shadows, and elevation effects. The dark mode theme is default with purple (285° hue) as the primary brand color.

**State Management**: React Query (@tanstack/react-query) handles server state, API requests, and caching. Local component state is managed with React hooks. No global state management library is used, keeping state close to where it's needed.

**Form Handling**: React Hook Form with Zod validation for type-safe form schemas, integrated through @hookform/resolvers.

### Backend Architecture

**Server Framework**: Express.js running on Node.js, configured as an ES module project. The server provides a minimal API structure with placeholder routes, designed to be extended with application-specific endpoints.

**Development Mode**: In development, Vite middleware is integrated directly into Express for hot module replacement and fast refresh. Production builds serve static files from the dist/public directory.

**Storage Interface**: Abstracted storage layer (IStorage interface) with an in-memory implementation (MemStorage). This pattern allows swapping storage backends without changing business logic. Currently implements basic user CRUD operations.

**Build Process**: Custom esbuild configuration bundles the server code with selective dependency bundling. Critical dependencies are bundled to reduce filesystem calls and improve cold start times, while others remain external.

### Data Storage

**Database Solution**: Configured for PostgreSQL via Drizzle ORM with @neondatabase/serverless for serverless database connectivity. The setup is prepared but minimal, with only a users table defined in the schema.

**Schema Management**: Drizzle Kit handles migrations and schema management. Type-safe schemas are defined using drizzle-zod for runtime validation that stays in sync with the database schema.

**Session Storage**: Infrastructure is in place for connect-pg-simple (PostgreSQL session store), though authentication is not yet implemented.

### Design System

**Color System**: HSL-based color tokens with alpha channel support for transparency. Primary colors use purple/pink gradients (285° hue at various saturations and lightnesses). Card backgrounds, borders, and shadows are carefully calibrated for depth and hierarchy.

**Component Styling**: Components use class-variance-authority (CVA) for variant-based styling, allowing multiple visual styles per component. Buttons support default, destructive, outline, secondary, and ghost variants with three size options.

**Elevation System**: Custom hover and active state elevations create tactile feedback. Uses CSS custom properties for shadow intensities and translucent overlays.

**Responsive Breakpoints**: Mobile-first design with 768px as the primary mobile breakpoint. The useIsMobile hook provides reactive mobile detection.

### Performance Optimizations

**3D Rendering**: WebGL renderer configured with antialiasing and pixel ratio capping (max 2x) to balance quality and performance. Scene fog reduces draw distance for better frame rates. Animation loops use requestAnimationFrame with proper cleanup on component unmount.

**Code Splitting**: Vite automatically code-splits routes and components. The build process generates optimized chunks for better caching.

**Bundle Size**: Server-side bundling selectively inlines critical dependencies to reduce the number of file operations while keeping the bundle size manageable.

## External Dependencies

### Core Runtime Dependencies

- **Three.js** (@types/three): 3D graphics rendering engine for the night scene visualization
- **Neon Database** (@neondatabase/serverless): Serverless PostgreSQL database driver
- **Drizzle ORM** (drizzle-orm, drizzle-zod): Type-safe database toolkit with Zod schema integration

### UI Component Libraries

- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (accordion, dialog, dropdown, popover, select, tabs, toast, tooltip, etc.)
- **shadcn/ui**: Pre-styled component system built on Radix UI with customizable design tokens
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets (SiTelegram, SiDiscord, SiX, SiGithub for social links)

### State Management & Forms

- **TanStack Query** (@tanstack/react-query): Server state management, data fetching, and caching
- **React Hook Form**: Performant form library with validation
- **Zod**: Schema validation library for runtime type checking
- **@hookform/resolvers**: Integrates Zod with React Hook Form

### Styling & Design Tools

- **TailwindCSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **clsx & tailwind-merge**: Utility for conditional class names

### Build & Development Tools

- **Vite**: Fast build tool and development server with HMR
- **esbuild**: JavaScript bundler for production server builds
- **TypeScript**: Type safety across the entire codebase
- **Wouter**: Lightweight client-side router (alternative to React Router)

### Replit-Specific Plugins

- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation enhancement (dev only)
- **@replit/vite-plugin-dev-banner**: Development mode indicator (dev only)

### Typography

- **Google Fonts**: Orbitron (display font) and Inter (body font) loaded via CDN

### Future Integration Points

The codebase includes infrastructure for features not yet implemented:

- Session management (express-session, connect-pg-simple, memorystore)
- Authentication (passport, passport-local, jsonwebtoken)
- File uploads (multer)
- Email (nodemailer)
- Payment processing (stripe)
- External APIs (axios, openai, @google/generative-ai)
- Real-time communication (ws)
- Rate limiting (express-rate-limit)
- Data export (xlsx)