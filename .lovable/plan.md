
# Pre-Landing Page "IPTV EXPRESS" - High-Converting Design

## Overview

This plan creates a brand new, high-converting pre-landing page with a modern dark aesthetic inspired by Netflix/Hulu. The page will feature an "Electric Green" accent color for maximum CTA visibility and a complete redesign focused on conversion optimization.

## Color Scheme Changes

**New Primary Accent**: Electric Green (`#00FF88` / `hsl(152, 100%, 50%)`)

Updates to `src/index.css`:
- Replace purple primary with electric green
- Update all gradient references
- Adjust glow effects for green accent
- Keep deep black backgrounds (`#000000`, zinc/slate grays)

## New Components to Create

### 1. Pre-Landing Page (`src/pages/PreLanding.tsx`)

Main single-page landing with all sections integrated.

### 2. Sticky Navbar (`src/components/prelanding/StickyNavbar.tsx`)

- Logo "IPTV EXPRESS" on the left (bold, modern Inter font)
- "Get Started" CTA button on the right
- Glass effect with blur
- Smooth scroll behavior
- Mobile hamburger menu

### 3. Hero Section (`src/components/prelanding/PrelandingHero.tsx`)

- Dark abstract gradient background with subtle cinematic pattern
- Headline: "Stop Overpaying for Cable TV. Get Unlimited Access Today."
- Sub-headline: "Enjoy 10,000+ Channels, Movies, and Series in 4K/HD without freezing."
- Large pulsing CTA button: "Check Availability & Price"
- Floating decorative elements

### 4. Pain vs Solution Section (`src/components/prelanding/ComparisonSection.tsx`)

Two-column comparison layout:
- Left: "Old Cable" with red X icons (Expensive, Contracts, Limited, Poor Quality)
- Right: "IPTV EXPRESS" with green checkmarks (Affordable, No Contracts, Unlimited, 4K Quality)
- Glassmorphism cards with subtle animations

### 5. Features Grid - Bento Box (`src/components/prelanding/FeaturesGrid.tsx`)

4-column grid with Lucide React icons:
- 4K/FHD Quality (Monitor icon)
- Anti-Freeze Technology (Zap icon)
- Multi-Device Support (Devices icon)
- 24/7 Support (Headphones icon)

Each feature in a dark glass card with subtle green border on hover.

### 6. Device Compatibility Banner (`src/components/prelanding/DeviceBanner.tsx`)

Horizontal row showing:
- Smart TV
- Android
- Apple/iOS
- Firestick
- MAG Box

Simple icons with labels, subtle animation on hover.

### 7. Reviews Section (`src/components/prelanding/ReviewsSection.tsx`)

3 realistic testimonial cards:
- 5-star ratings (yellow/gold stars)
- Real-looking names and photos
- Quotes like: "Finally a service that doesn't buffer during football matches. Highly recommend!"
- Glass effect cards

### 8. FAQ Accordion (`src/components/prelanding/PrelandingFAQ.tsx`)

Questions:
- "Do I need a satellite dish?"
- "Is there a free trial?"
- "How fast is setup?"
- "What devices are supported?"

Using Shadcn Accordion component with custom styling.

### 9. Final CTA Section (`src/components/prelanding/FinalCTA.tsx`)

- High-contrast centered section
- Headline: "Ready to switch?"
- Pulsing CTA button: "Get Your Free Trial Now"
- Background gradient effect

### 10. Simple Footer (`src/components/prelanding/PrelandingFooter.tsx`)

- Terms of Service link
- Privacy Policy link
- Copyright "2026 IPTV EXPRESS"
- Minimal design

## Technical Implementation

### Mobile-First Responsive Design

- Full-width CTA buttons on mobile
- Stacked layouts for comparison section
- Collapsible navbar on mobile
- Touch-friendly interactions

### Animations (Lightweight)

Using Tailwind CSS animations:
- Pulse animation on CTA buttons
- Fade-in on scroll (intersection observer)
- Hover scale effects
- Smooth transitions

### Routing Update (`src/App.tsx`)

Add new route `/prelanding` for the pre-landing page.

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/index.css` | Modify | Add electric green color variables |
| `src/pages/PreLanding.tsx` | Create | Main pre-landing page |
| `src/components/prelanding/StickyNavbar.tsx` | Create | Sticky navigation bar |
| `src/components/prelanding/PrelandingHero.tsx` | Create | Hero section |
| `src/components/prelanding/ComparisonSection.tsx` | Create | Pain vs Solution |
| `src/components/prelanding/FeaturesGrid.tsx` | Create | Bento-style features |
| `src/components/prelanding/DeviceBanner.tsx` | Create | Device compatibility |
| `src/components/prelanding/ReviewsSection.tsx` | Create | Testimonials |
| `src/components/prelanding/PrelandingFAQ.tsx` | Create | FAQ accordion |
| `src/components/prelanding/FinalCTA.tsx` | Create | Final call-to-action |
| `src/components/prelanding/PrelandingFooter.tsx` | Create | Simple footer |
| `src/App.tsx` | Modify | Add /prelanding route |

## Design Details

### Typography
- Font: Inter (already installed)
- Headings: Bold/Black weight (700-900)
- Body: Regular weight (400-500)

### Glassmorphism Cards
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Electric Green Accent
```css
--electric-green: 152 100% 50%;  /* #00FF88 */
--electric-green-glow: 0 0 40px rgba(0, 255, 136, 0.4);
```

### Pulsing CTA Animation
```css
@keyframes pulse-cta {
  0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
  50% { transform: scale(1.02); box-shadow: 0 0 40px rgba(0, 255, 136, 0.5); }
}
```

---

**Technical Notes:**
- Uses existing Shadcn UI components (Button, Accordion, Card)
- Lucide React for all icons
- Tailwind CSS for styling
- No external animation libraries required (CSS animations only)
- Fully responsive mobile-first approach
