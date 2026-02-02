
# Plan: Fix Mobile Scroll Lock & Enlarge Mobile Logo

## Overview
This plan addresses two critical issues:
1. **Scroll gets locked** on all 4 product pages after the first scroll on mobile devices
2. **Logo too small** in the mobile navigation bar

---

## Root Cause Analysis

### Scroll Lock Issue
After thorough investigation, I identified several potential causes:

1. **`touch-action` conflicts**: The `touch-pan-y` class on ProductPage containers may conflict with browser default touch handling
2. **iOS Safari quirks**: The combination of `overflow-x: hidden` on both `html` and `body` can cause scroll issues on iOS
3. **Nested overflow containers**: Multiple elements with `overflow-hidden` may create scroll traps
4. **Framer Motion touch capture**: `whileTap` and animation handlers on buttons/elements might be capturing touch events

### Logo Size Issue
Current logo classes: `h-14 sm:h-16 md:h-20` - the `h-14` (56px) is too small on mobile screens.

---

## Implementation Plan

### Task 1: Fix Global Mobile Scroll Handling

**File: `src/index.css`**

Update the base styles to ensure proper mobile scrolling:

- Remove `overflow-x: hidden` from `html` (keep only on `body`)
- Add `overscroll-behavior: none` to prevent scroll chaining issues
- Add `-webkit-overflow-scrolling: touch` for iOS momentum scrolling
- Add `touch-action: manipulation` to the body to allow scrolling while preventing double-tap zoom

Changes:
```css
html {
  /* Remove overflow-x: hidden from html - keep only on body */
}

body {
  @apply bg-background text-foreground;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: none;
  touch-action: manipulation;
}
```

---

### Task 2: Remove Conflicting Touch Classes from ProductPage

**File: `src/pages/ProductPage.tsx`**

Remove the `touch-pan-y` classes that may be conflicting with natural scrolling:

- Remove `touch-pan-y` from the `<main>` element
- Remove `touch-pan-y` from the container `<div>`
- These were added in a previous fix attempt but may be causing the issue

Changes:
```tsx
// Before:
<main className="min-h-screen pt-32 pb-16 touch-pan-y">
  <div className="container mx-auto px-4 md:px-8 touch-pan-y">

// After:
<main className="min-h-screen pt-32 pb-16">
  <div className="container mx-auto px-4 md:px-8">
```

---

### Task 3: Ensure GLSLHills Doesn't Block Touch

**File: `src/components/ui/glsl-hills.tsx`**

Already has `pointer-events-none` (verified), but add explicit `touch-action: none` for extra safety:

```tsx
<div 
  className="absolute inset-0 overflow-hidden pointer-events-none"
  style={{ width, height, touchAction: 'none' }}
>
```

---

### Task 4: Add Scroll Reset Safety on Route Change

**File: `src/App.tsx`**

Enhance the `ScrollToTop` component to also reset any stuck touch states:

```tsx
useEffect(() => {
  // Reset scroll position
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  } catch {
    window.scrollTo(0, 0);
  }

  // Clear any stuck scroll-lock styles
  const root = document.documentElement;
  const body = document.body;

  root.style.overflow = "";
  root.style.position = "";
  root.style.touchAction = "";

  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.width = "";
  body.style.touchAction = "";
}, [pathname]);
```

---

### Task 5: Enlarge Mobile Logo

**File: `src/components/Header.tsx`**

Increase the logo size on mobile from `h-14` to `h-16` or `h-18`:

```tsx
// Before:
<motion.img 
  alt="Ma7alkom" 
  className="h-14 sm:h-16 md:h-20 w-auto drop-shadow-lg" 
  src="/logo.png" 
/>

// After:
<motion.img 
  alt="Ma7alkom" 
  className="h-16 sm:h-18 md:h-20 lg:h-24 w-auto drop-shadow-lg" 
  src="/logo.png" 
/>
```

Also increase the header height to accommodate the larger logo:

```tsx
// Before:
<div className="flex items-center justify-between h-20 md:h-24">

// After:
<div className="flex items-center justify-between h-20 sm:h-22 md:h-24">
```

---

## Summary of File Changes

| File | Change |
|------|--------|
| `src/index.css` | Fix global scroll styles for mobile |
| `src/pages/ProductPage.tsx` | Remove conflicting `touch-pan-y` classes |
| `src/components/ui/glsl-hills.tsx` | Add explicit `touchAction: 'none'` |
| `src/App.tsx` | Reset touchAction on route changes |
| `src/components/Header.tsx` | Enlarge logo on mobile |

---

## Testing Checklist

After implementation, verify:
- [ ] All 4 product pages scroll smoothly on mobile (iOS Safari, Android Chrome)
- [ ] Scrolling works immediately after page load
- [ ] Scrolling works after navigating from another page
- [ ] Scrolling works after opening/closing the mobile menu
- [ ] Logo is prominently visible on mobile devices
- [ ] Header spacing looks clean and not cramped
- [ ] 3D background doesn't interfere with scrolling
- [ ] WhatsApp button doesn't block scrolling
