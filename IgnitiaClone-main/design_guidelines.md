# Design Guidelines: Ignitia Techno-Cultural Fest Clone

## Design Approach
**Reference-Based:** Drawing from the original Ignitia website with influences from modern tech event sites (e.g., tech conference sites, gaming events). Dark, energetic aesthetic with emphasis on visual impact and interactive elements.

## Core Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32
- Container: max-w-7xl with px-4 md:px-8
- Section padding: py-16 md:py-24
- Component gaps: gap-6 to gap-12
- Tight spacing for navigation: gap-2 to gap-4

## Typography Hierarchy

**Font Strategy:** Google Fonts via CDN
- Primary: "Orbitron" or "Rajdhani" (tech/modern feel) - headings, navigation
- Secondary: "Inter" or "Space Grotesk" - body text, descriptions

**Scale:**
- Hero Title: text-5xl md:text-7xl font-bold
- Section Headers: text-3xl md:text-5xl font-bold
- Subsections: text-2xl md:text-3xl font-semibold
- Card Titles: text-xl font-semibold
- Body: text-base md:text-lg
- Captions/Meta: text-sm

## Navigation

**Top Navigation Bar:**
- Fixed position with backdrop blur (backdrop-blur-lg)
- Icon + text pairs for each route (Home, Events, Sponsors, Team, Contact)
- Use Heroicons for consistent iconography
- Icons sized at w-5 h-5, aligned with text
- Horizontal layout on desktop, hamburger menu on mobile
- Social media icons cluster in navigation (YouTube, Instagram, Facebook, LinkedIn, Twitter) - w-4 h-4

## Page-Specific Layouts

### Home Page
**Hero Section:**
- Full viewport height (min-h-screen)
- Centered festival title with date badge/image prominently displayed
- Large decorative rotating circle graphic (CSS animation: rotate 360deg over 20s infinite)
- Main hero image/graphic below title
- Particle effect overlays (floating animated dots using CSS keyframes)
- CTA button: "Explore Events" with blurred background (backdrop-blur-md bg-white/10)

**Additional Sections:**
- About Ignitia: 2-column layout (text + image) max-w-6xl
- Highlights Grid: 3-column feature cards (Technical, Cultural, Literary)
- Past Event Glimpses: Masonry-style image gallery (2-3 columns)
- Countdown Timer: Centered, large display

### Events Page
**Layout:**
- Category filter tabs at top (Technical, Cultural, Literary, All)
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Event cards with: Icon/image, title, date/time, brief description, "Learn More" link
- Hover effect: subtle scale transform (scale-105)

### Sponsors Page
**Tiered Structure:**
- Title Sponsor: Single large card, centered
- Platinum/Gold/Silver: Grid layouts with decreasing logo sizes
- Platinum: grid-cols-2 md:grid-cols-3
- Gold: grid-cols-3 md:grid-cols-4
- Silver: grid-cols-4 md:grid-cols-6
- Logo cards with subtle border, padding p-6 to p-8

### Team Page
**Member Grid:**
- grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Profile cards: circular avatar images, name, role/position
- Organized by departments/roles with section headers
- Hover: lift effect with shadow

### Contact Page
**Split Layout:**
- 2-column on desktop (form + info sidebar)
- Form fields: name, email, phone, message (full-width inputs with p-3)
- Info sidebar: Address, phone, email, social links, embedded map placeholder
- Submit button: full-width on mobile, auto on desktop

## Component Library

**Cards:**
- Rounded corners: rounded-xl to rounded-2xl
- Padding: p-6 md:p-8
- Border: subtle border or outlined style
- Shadow on hover: transition-shadow

**Buttons:**
- Primary: px-8 py-3 rounded-full font-semibold
- With blurred backgrounds when over images: backdrop-blur-md bg-white/10 border border-white/20
- Icon buttons (social, chat): p-2 to p-3 rounded-full

**Input Fields:**
- Rounded: rounded-lg
- Padding: px-4 py-3
- Focus state: ring-2 outline-none

**AI Chat Assistant:**
- Fixed position bottom-right (bottom-6 right-6)
- Circular button with AI icon (w-14 h-14)
- Popup modal: rounded-2xl, max-w-md, positioned above button
- Chat interface with input at bottom

## Images

**Hero Section:** 
- Large hero graphic/illustration (festival theme, techno-cultural vibe)
- Date announcement badge/poster image
- Rotating decorative circle graphic (PNG with transparency)

**Throughout Site:**
- Event category icons (microphone, code, book)
- Team member photos (circular crops)
- Sponsor logos (high-resolution, transparent backgrounds)
- Past event gallery photos (rectangular, various aspects)
- Particle effect graphics (small, semi-transparent)

**Image Placement:**
- Home hero: Central, layered with date graphic
- About section: Right-aligned supporting image
- Events: Icon/thumbnail per event card
- Team: Circular avatar per member
- Sponsors: Logo grid arrangements

## Visual Effects

**Animations (Minimal):**
- Rotating circle on hero (continuous slow rotation)
- Particle float effect (translateY keyframes)
- Hover scale on cards (scale-105, duration-300)
- Fade-in on scroll for sections

**Transitions:**
- All interactive elements: transition-all duration-300
- Page transitions: smooth fade effects

## Footer

**Multi-column Layout:**
- 3-4 columns on desktop, stacked on mobile
- Quick Links column (routes)
- Contact Info column
- Social Media column (icon grid)
- Newsletter signup (optional)
- Copyright and credits at bottom
- Height: auto with py-12 padding

## Accessibility

- Icon-text pairs in navigation for clarity
- High contrast text (handle with theme)
- Focus states on all interactive elements (ring-2)
- Alt text for all images
- Semantic HTML throughout (nav, main, section, footer)