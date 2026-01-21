---
name: react-patterns
description: React Best Practices, Server Components, Anti-Waterfall
---

# React Patterns

## Komponenten-Hierarchie

### 1. Server Components (Default in Next.js App Router)
```jsx
// page.tsx - Server Component (kein "use client")
async function Page() {
  const data = await fetchData(); // Server-side fetch
  return <ClientComponent data={data} />;
}
```

### 2. Client Components (nur wenn nötig)
Nur `"use client"` wenn du brauchst:
- **useState**, **useEffect**, **useContext**
- Event-Handler (onClick, onChange)
- Browser APIs (window, document)

```jsx
"use client";
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Anti-Waterfall Patterns

### ❌ WATERFALL (SCHLECHT)
```jsx
async function Page() {
  const user = await fetchUser();       // 200ms ⏳
  const posts = await fetchPosts(user); // 300ms ⏳
  const comments = await fetchComments(posts); // 200ms ⏳
  // TOTAL: 700ms sequential
}
```

### ✅ PARALLEL (GUT)
```jsx
async function Page() {
  const [user, posts, settings] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchSettings()
  ]);
  // TOTAL: ~300ms (longest request)
}
```

### ✅ SUSPENSE STREAMING (BESSER)
```jsx
import { Suspense } from 'react';

function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments />
      </Suspense>
    </>
  );
}
```

## State Management

### 1. Lokaler State (useState)
Nur für UI-State innerhalb einer Komponente.

### 2. Kontext (useContext)
Für globalen State (Auth, Theme, Cart).

```jsx
// context/AuthContext.jsx
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
```

### 3. URL State (searchParams)
Für filterbaren/teilbaren State:
```jsx
// ?filter=active&sort=date
const searchParams = useSearchParams();
```

## Lazy Loading

```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Checkliste

- [ ] Client Components nur wenn nötig
- [ ] Parallele Daten-Fetching (Promise.all)
- [ ] Suspense für Streaming
- [ ] Lazy Loading für schwere Komponenten
- [ ] Kein State-Prop-Drilling (Context nutzen)
