---
name: nextjs-best-practices
description: Next.js Optimierungen für Bilder, Fonts und Routing
---

# Next.js Best Practices

> **Hinweis**: Dieses Projekt nutzt aktuell Vite. Diese Regeln gelten für zukünftige Next.js-Migration.

## Image Optimization

### next/image (IMMER nutzen)
```jsx
import Image from 'next/image';

// ✅ RICHTIG
<Image
  src="/hero.jpg"
  alt="Hero Banner"
  width={1200}
  height={600}
  priority  // Für Above-the-fold Bilder
  placeholder="blur"
  blurDataURL="data:image/..."
/>

// ❌ FALSCH
<img src="/hero.jpg" alt="Hero" />
```

### Responsive Images
```jsx
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
```

## Font Optimization

### next/font (IMMER nutzen)
```jsx
// app/layout.tsx
import { Inter, Teko } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const teko = Teko({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-teko'
});

export default function Layout({ children }) {
  return (
    <html className={`${inter.variable} ${teko.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Im CSS nutzen
```css
body { font-family: var(--font-inter); }
h1 { font-family: var(--font-teko); }
```

## Routing

### App Router Struktur
```
app/
├── layout.tsx        # Root Layout
├── page.tsx          # Home (/)
├── shop/
│   ├── page.tsx      # Shop (/shop)
│   └── [id]/
│       └── page.tsx  # Product (/shop/123)
└── api/
    └── route.ts      # API Route (/api)
```

### Navigation
```jsx
import Link from 'next/link';

// ✅ RICHTIG
<Link href="/shop" prefetch={true}>Shop</Link>

// ❌ FALSCH
<a href="/shop">Shop</a>
```

### Dynamic Routes
```jsx
// app/shop/[id]/page.tsx
export default function Product({ params }: { params: { id: string } }) {
  return <div>Product: {params.id}</div>;
}

// Generate static paths
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}
```

## Metadata

```jsx
// app/layout.tsx
export const metadata = {
  title: {
    default: 'Eisenbund',
    template: '%s | Eisenbund'
  },
  description: 'Industrial gear for warriors',
  openGraph: { ... }
};

// app/shop/page.tsx
export const metadata = {
  title: 'Shop',  // → "Shop | Eisenbund"
};
```

## Checkliste

- [ ] Alle Bilder via next/image
- [ ] Fonts via next/font (kein Google Fonts CDN)
- [ ] Link statt <a> für interne Navigation
- [ ] Metadata auf allen Seiten
- [ ] API Routes in app/api/
