---
name: ui-ux-pro-max
description: Premium Design-System mit Modern/Clean/Glassmorphism
---

# UI/UX Pro Max Design System

## Kern-Prinzipien

### 1. Visual Hierarchy
- **Primäre Aktionen**: Leuchtende Farben, große Touch-Targets (min. 44x44px)
- **Sekundäre Elemente**: Subtile Kontraste, muted colors
- **Tertiäre Inhalte**: Dezente Grautöne, kleine Schrift

### 2. Glassmorphism
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

### 3. Farb-Schema (Eisenbund-Thema)
- **Primary**: `#8b0000` (Dark Red)
- **Accent**: `#ea580c` (Orange/Rust)
- **Background**: `#0c0a09` (Stone 950)
- **Text Primary**: `#d6d3d1` (Stone 200)
- **Text Secondary**: `#78716c` (Stone 500)

### 4. Micro-Animations
- Hover-Transitions: 200-300ms ease-out
- Page-Transitions: 300-500ms
- Loading-States: Infinite pulse oder spin
- Kein Bounce-Effekt (zu verspielt)

### 5. Spacing System (8px Grid)
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### 6. Typography
- **Industrial Font**: Teko (Headlines)
- **Mono Font**: Share Tech Mono (Body, Code)
- Letter-Spacing: 0.1em - 0.2em für Headlines

## Checkliste für neue Komponenten

- [ ] Glasmorphism-Effekt wo passend
- [ ] Konsistente Farbverwendung
- [ ] Micro-Animations für Interaktionen
- [ ] 8px Grid einhalten
- [ ] Dark-Mode-optimiert (ist Default)
