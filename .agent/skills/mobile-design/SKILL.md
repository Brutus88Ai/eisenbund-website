---
name: mobile-design
description: Mobile-First Responsive Design Guidelines
---

# Mobile Design

## Kern-Prinzip: Mobile First

Alle Styles zuerst für **320px Viewport** schreiben, dann nach oben erweitern.

## Breakpoints (Tailwind Standard)

| Prefix | Min-Width | Beschreibung |
|--------|-----------|--------------|
| (none) | 0px       | Mobile       |
| `sm:`  | 640px     | Large Phone  |
| `md:`  | 768px     | Tablet       |
| `lg:`  | 1024px    | Desktop      |
| `xl:`  | 1280px    | Large Desktop|
| `2xl:` | 1536px    | Wide Screen  |

## Layout-Patterns

### 1. Stack → Grid
```jsx
<div className="
  flex flex-col gap-4          // Mobile: Stack
  md:grid md:grid-cols-2       // Tablet: 2 Columns
  lg:grid-cols-3               // Desktop: 3 Columns
">
```

### 2. Hidden Elements
```jsx
// Desktop-Only Navigation
<nav className="hidden lg:flex">

// Mobile-Only Hamburger
<button className="lg:hidden">☰</button>
```

### 3. Text Scaling
```jsx
<h1 className="
  text-2xl           // Mobile
  sm:text-3xl        // Phone+
  lg:text-5xl        // Desktop
">
```

## Touch-Optimierung

### 1. Touch Targets (MINIMUM 44x44px)
```jsx
<button className="p-3 min-h-[44px] min-w-[44px]">
```

### 2. Swipe-Areas
```jsx
// Padding für Swipe-Gesten an Screen-Kanten
<div className="px-4 sm:px-6 lg:px-8">
```

### 3. Kein Hover auf Mobile
```jsx
// Hover nur für Maus-Geräte
className="md:hover:bg-white/10"  // Nur ab Tablet
// ODER mit @media (hover: hover)
```

## Performance auf Mobile

1. **Lazy Loading** für Bilder
2. **Reduced Motion** respektieren:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```
3. **Viewport Meta** korrekt:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Checkliste

- [ ] Alle Layouts starten mit Mobile-Style
- [ ] Touch-Targets mindestens 44x44px
- [ ] Responsive Breakpoints getestet (320px, 768px, 1024px)
- [ ] Kein kritischer Content versteckt auf Mobile
- [ ] Font-Size lesbar ohne Zoom (min. 16px Body)
