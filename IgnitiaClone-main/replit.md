Ignitia 2K25 - Techno-Cultural Festival Website
Overview
This is a full-stack web application for Ignitia 2K25, the flagship techno-cultural festival of PSIT Kanpur. The application features a modern, dark-themed website with event listings, sponsor showcases, team profiles, and interactive features like an AI chatbot. Built with React, TypeScript, Express, and styled with Tailwind CSS using shadcn/ui components, the application emphasizes a sleek, energetic aesthetic inspired by modern tech conference sites.

User Preferences
Preferred communication style: Simple, everyday language.

Deployment Notes
Vercel Deployment
The project is configured for deployment to Vercel with the following setup:

Build command: npm run build
Start command: npm run start
Output directory: dist/public (frontend), dist (backend)
Known Build Warnings
PostCSS Warning (Harmless): During the build process, you may see this warning:

A PostCSS plugin did not pass the `from` option to `postcss.parse`.
This may cause imported assets to be incorrectly transformed.

This is a known issue in Tailwind CSS v3.4.3+ (see GitHub Issue #13591) and is completely harmless. It occurs when custom CSS utilities are used with pseudo-element variants and does not affect:

Build success (exit code 0)
Application functionality
Vercel deployment (warnings do not fail builds, only errors do)
Asset transformation or styling
The warning has been addressed in Tailwind CSS v4, but for v3 projects it can be safely ignored. Vercel will log this warning but proceed with successful deployment.

System Architecture
Frontend Architecture
Framework & Build System

React 18 with TypeScript for type-safe component development
Vite as the build tool and development server, providing fast HMR and optimized production builds
Client-side routing implemented using Wouter (lightweight React router)
UI Component System

shadcn/ui component library with Radix UI primitives for accessible, unstyled components
Tailwind CSS for utility-first styling with custom design tokens
Custom CSS variables for theming (dark mode by default)
Component architecture follows atomic design principles with reusable cards, buttons, and form elements
Design System

Typography: Google Fonts (Orbitron/Rajdhani for headings, Inter/Space Grotesk for body text)
Spacing scale: Tailwind units (2, 4, 6, 8, 12, 16, 20, 24, 32)
Color system: HSL-based with CSS custom properties for dynamic theming
Responsive breakpoints: Mobile-first approach with md (768px) breakpoint
State Management

TanStack Query (React Query) for server state management and data fetching
Local component state using React hooks
Form handling with React Hook Form and Zod validation
Page Structure

Home: Hero section with animated graphics, festival highlights
Events: Filterable event cards by category (Technical, Cultural, Literary)
Sponsors: Tiered sponsor showcase with tab-based filtering
Team: Grid of team member cards with role information
Contact: Contact form with location information
Gallery: Placeholder for past event photos
About: Festival statistics and description
Backend Architecture
Server Framework

Express.js for HTTP server and API routing
TypeScript for type safety across the stack
Custom middleware for request logging and JSON parsing
Development Setup

Vite middleware integration for development mode
Hot module replacement (HMR) support
Runtime error overlay for development
API Structure

RESTful API design (routes currently minimal, infrastructure prepared)
Routes registered in /server/routes.ts
Separation of concerns: routing, business logic, and data access
Data Access Layer

Storage interface pattern (IStorage) for database abstraction
In-memory storage implementation (MemStorage) for development
Prepared for migration to persistent database (Postgres with Drizzle ORM)
Data Storage
Database Schema

Drizzle ORM configured for PostgreSQL
Schema defined in /shared/schema.ts
Current schema includes users table (id, username, password)
Migrations managed through drizzle-kit
Database Provider

Configured for Neon serverless PostgreSQL
Connection string via DATABASE_URL environment variable
Schema shared between client and server for type consistency
Storage Pattern

Interface-based design allows swapping storage implementations
Current in-memory implementation for rapid development
Prepared for Postgres integration with minimal code changes
External Dependencies
UI & Styling

Tailwind CSS 3.x - Utility-first CSS framework
Radix UI - Headless UI component primitives for accessibility
shadcn/ui - Pre-built component library built on Radix
Lucide React - Icon library
React Icons (Simple Icons, Font Awesome) - Additional icon sets
Data Fetching & Forms

TanStack Query v5 - Server state management
React Hook Form - Form state management
Zod - Schema validation
@hookform/resolvers - Validation resolver for React Hook Form
Database & ORM

Drizzle ORM - Type-safe SQL query builder
@neondatabase/serverless - Serverless Postgres driver
drizzle-zod - Zod schema generation from Drizzle schemas
connect-pg-simple - PostgreSQL session store (for future session management)
Development Tools

Vite - Build tool and dev server
TypeScript - Type system
ESBuild - JavaScript bundler for production builds
@replit/vite-plugin-* - Replit-specific development plugins
Date & Time

date-fns - Date utility library
UI Enhancement Libraries

class-variance-authority - Utility for managing component variants
clsx & tailwind-merge - Utility for conditional className composition
cmdk - Command menu component
embla-carousel-react - Carousel/slider component
Fonts

Google Fonts CDN integration (Orbitron, Rajdhani, Inter via link tag in HTML)
Build & Development

tsx - TypeScript execution for development
PostCSS & Autoprefixer - CSS processing