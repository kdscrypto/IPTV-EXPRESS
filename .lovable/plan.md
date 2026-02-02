

# Multilingual Support (EN/FR) Implementation Plan

## Overview

This plan implements a complete internationalization (i18n) system for the IPTV EXPRESS website, with:
- **English as the default language** on the Pre-Landing page
- **Language persistence** via localStorage so the selected language carries over to the main site
- **Language switcher** component in the Pre-Landing navbar

## Architecture

### State Management Approach

We'll use React Context to manage language state globally across the application. This is lightweight and doesn't require additional dependencies.

```text
┌─────────────────────────────────────────────────────────────────┐
│                     LanguageContext                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  language   │  │ setLanguage │  │  t() translation func   │  │
│  │  ('en'/'fr')│  │  function   │  │  returns translated text│  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │PreLanding│   │  Index   │   │Components│
        │   Page   │   │  Page    │   │   ...    │
        └──────────┘   └──────────┘   └──────────┘
```

## Files to Create

### 1. Translation Files

**`src/i18n/translations/en.ts`** - English translations

Contains all text strings for:
- Pre-Landing page (Hero, Comparison, Features, Reviews, FAQ, CTA, Footer)
- Main site (Hero, Features, Pricing, Testimonials, FAQ, Contact, Footer, Activation Form)

**`src/i18n/translations/fr.ts`** - French translations

Same structure with French text (current content).

**`src/i18n/index.ts`** - Translation utility

Exports the `translations` object and type definitions.

### 2. Language Context

**`src/contexts/LanguageContext.tsx`**

```typescript
// Provides:
// - language: 'en' | 'fr' (default: 'en')
// - setLanguage: function to change language
// - t: function to get translated text by key
// - Persists language choice to localStorage
// - Reads from localStorage on mount
```

### 3. Language Switcher Component

**`src/components/LanguageSwitcher.tsx`**

- Dropdown or toggle buttons showing EN / FR
- Flag icons or text indicators
- Updates context on selection
- Styled to match the dark theme with glassmorphism

### 4. Custom Hook

**`src/hooks/useLanguage.ts`**

Simple hook to access language context:
```typescript
export const useLanguage = () => useContext(LanguageContext);
```

## Files to Modify

### Pre-Landing Components (9 files)

| Component | Changes |
|-----------|---------|
| `StickyNavbar.tsx` | Add LanguageSwitcher, translate nav links |
| `PrelandingHero.tsx` | Translate headline, sub-headline, CTA |
| `ComparisonSection.tsx` | Translate "Old Cable" vs "IPTV EXPRESS" items |
| `FeaturesGrid.tsx` | Translate feature titles and descriptions |
| `DeviceBanner.tsx` | Translate device labels and section text |
| `ReviewsSection.tsx` | Translate section title and review content |
| `PrelandingFAQ.tsx` | Translate all FAQ questions and answers |
| `FinalCTA.tsx` | Translate "Ready to switch?" and CTA button |
| `PrelandingFooter.tsx` | Translate footer links and copyright |

### Main Site Components (8 files)

| Component | Changes |
|-----------|---------|
| `HeroSection.tsx` | Translate headline, description, buttons |
| `FeaturesSection.tsx` | Translate all 8 features |
| `PricingSection.tsx` | Translate plan names, features, badges |
| `TestimonialsSection.tsx` | Translate section title and testimonials |
| `FAQSection.tsx` | Translate all 10 FAQ items |
| `ContactSection.tsx` | Translate form labels, placeholders, buttons |
| `ActivationForm.tsx` | Translate all form content |
| `Footer.tsx` | Translate all footer content |

### App Configuration

**`src/App.tsx`**

- Wrap entire app with `LanguageProvider`

## Translation Keys Structure

```typescript
{
  // Common
  common: {
    getStarted: "Get Started",
    learnMore: "Learn More",
    // ...
  },
  
  // Pre-Landing
  prelanding: {
    hero: {
      headline: "Stop Overpaying for Cable TV...",
      subheadline: "Enjoy 10,000+ Channels...",
      cta: "Check Availability & Price"
    },
    comparison: {
      title: "Why Make the Switch?",
      oldCable: ["Expensive monthly bills", ...],
      iptvExpress: ["Affordable pricing", ...]
    },
    features: { ... },
    reviews: { ... },
    faq: { ... }
  },
  
  // Main Site
  main: {
    hero: { ... },
    features: { ... },
    pricing: { ... },
    testimonials: { ... },
    faq: { ... },
    contact: { ... },
    activation: { ... },
    footer: { ... }
  }
}
```

## Implementation Details

### Language Persistence Flow

1. User visits `/prelanding` → defaults to English
2. User clicks language switcher → updates context & localStorage
3. User clicks CTA → navigates to `/#pricing`
4. Main site reads language from context (which loaded from localStorage)
5. All components render in selected language

### Default Language Logic

```typescript
const getInitialLanguage = (): 'en' | 'fr' => {
  // Check localStorage first
  const saved = localStorage.getItem('language');
  if (saved === 'en' || saved === 'fr') return saved;
  
  // Default to English for prelanding
  return 'en';
};
```

### Translation Function Usage

```typescript
// In components:
const { t } = useLanguage();

// Usage:
<h1>{t('prelanding.hero.headline')}</h1>
<Button>{t('common.getStarted')}</Button>
```

## File Summary

| Action | File Path |
|--------|-----------|
| Create | `src/i18n/translations/en.ts` |
| Create | `src/i18n/translations/fr.ts` |
| Create | `src/i18n/index.ts` |
| Create | `src/contexts/LanguageContext.tsx` |
| Create | `src/components/LanguageSwitcher.tsx` |
| Create | `src/hooks/useLanguage.ts` |
| Modify | `src/App.tsx` |
| Modify | `src/components/prelanding/StickyNavbar.tsx` |
| Modify | `src/components/prelanding/PrelandingHero.tsx` |
| Modify | `src/components/prelanding/ComparisonSection.tsx` |
| Modify | `src/components/prelanding/FeaturesGrid.tsx` |
| Modify | `src/components/prelanding/DeviceBanner.tsx` |
| Modify | `src/components/prelanding/ReviewsSection.tsx` |
| Modify | `src/components/prelanding/PrelandingFAQ.tsx` |
| Modify | `src/components/prelanding/FinalCTA.tsx` |
| Modify | `src/components/prelanding/PrelandingFooter.tsx` |
| Modify | `src/components/HeroSection.tsx` |
| Modify | `src/components/FeaturesSection.tsx` |
| Modify | `src/components/PricingSection.tsx` |
| Modify | `src/components/TestimonialsSection.tsx` |
| Modify | `src/components/FAQSection.tsx` |
| Modify | `src/components/ContactSection.tsx` |
| Modify | `src/components/ActivationForm.tsx` |
| Modify | `src/components/Footer.tsx` |

## Technical Notes

- **No external dependencies** required (no react-i18next or similar)
- Uses React Context for state management
- localStorage for persistence across sessions
- TypeScript types ensure type-safe translations
- Fallback to key if translation missing (development safety)
- Mobile-friendly language switcher with touch targets

