---
name: tailwind-patterns
description: Tailwind CSS Sortierung und Barrierefreiheits-Regeln
---

# Tailwind Patterns

## Klassen-Sortierung (STRIKT)

```
1. LAYOUT     → display, position, grid, flex, float
2. BOX MODEL  → width, height, margin, padding
3. TYPOGRAPHY → font, text, leading
4. VISUAL     → background, border, shadow, opacity
5. MISC       → cursor, transition, animation
```

### Beispiel
```jsx
// ✅ RICHTIG
<div className="
  flex items-center justify-between    // Layout
  w-full max-w-md p-4 mt-6             // Box Model
  text-sm font-medium tracking-wide    // Typography
  bg-black/50 border border-white/20 rounded-lg shadow-lg  // Visual
  transition-all hover:bg-black/70     // Misc
">

// ❌ FALSCH (unsortiert)
<div className="hover:bg-black/70 p-4 flex text-sm bg-black/50 w-full">
```

## Responsive Prefixes

Mobile-First! Basis-Klassen sind für Mobile, Prefixes für größere Screens:

```jsx
// ✅ Mobile-First
<div className="
  flex flex-col      // Mobile: Column
  md:flex-row        // Tablet+: Row
  lg:gap-8           // Desktop+: Larger gap
">
```

## Barrierefreiheit (A11y) - PFLICHT

### 1. Fokus-States
```jsx
// Jedes interaktive Element MUSS haben:
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b0000] focus-visible:ring-offset-2"
```

### 2. ARIA-Attribute
```jsx
// Buttons
<button aria-label="Menü öffnen" aria-expanded={isOpen}>

// Icons (nicht dekorativ)
<Icon aria-hidden="true" />  // Nur wenn Text daneben

// Formulare
<input id="email" aria-describedby="email-error" />
<span id="email-error" role="alert">Fehler-Text</span>
```

### 3. Kontrast-Regeln
- Text auf Background: mindestens 4.5:1 Ratio
- Large Text (18px+): mindestens 3:1 Ratio
- Interaktive Elemente: klar erkennbar

### 4. Touch-Targets
```jsx
// Minimum 44x44px für Touch
className="min-w-[44px] min-h-[44px]"
```

## Checkliste

- [ ] Klassen sortiert (Layout → Box → Typo → Visual → Misc)
- [ ] Mobile-First responsive
- [ ] focus-visible:ring auf allen interaktiven Elementen
- [ ] aria-label/aria-labelledby auf Icon-Buttons
- [ ] role="alert" für Fehlermeldungen
