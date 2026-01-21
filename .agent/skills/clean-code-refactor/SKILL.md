---
name: clean-code-refactor
description: DRY, keine Magic Numbers, Clean Code Prinzipien
---

# Clean Code Refactor

## Kern-Prinzipien

### 1. DRY (Don't Repeat Yourself)

```jsx
// ❌ SCHLECHT - Wiederholung
<button className="px-4 py-2 bg-[#8b0000] text-white rounded">Save</button>
<button className="px-4 py-2 bg-[#8b0000] text-white rounded">Submit</button>
<button className="px-4 py-2 bg-[#8b0000] text-white rounded">Send</button>

// ✅ GUT - Extrahiert
const Button = ({ children }) => (
  <button className="px-4 py-2 bg-[#8b0000] text-white rounded">
    {children}
  </button>
);

<Button>Save</Button>
<Button>Submit</Button>
<Button>Send</Button>
```

### 2. Keine Magic Numbers

```jsx
// ❌ SCHLECHT
if (items.length > 5) { ... }
const timeout = 3000;
<div style={{ maxWidth: 1200 }}>

// ✅ GUT
const MAX_VISIBLE_ITEMS = 5;
const DEBOUNCE_MS = 3000;
const CONTAINER_MAX_WIDTH = 1200;

if (items.length > MAX_VISIBLE_ITEMS) { ... }
const timeout = DEBOUNCE_MS;
<div style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
```

### 3. Aussagekräftige Namen

```jsx
// ❌ SCHLECHT
const d = new Date();
const arr = items.filter(x => x.active);
function handle(e) { ... }

// ✅ GUT
const currentDate = new Date();
const activeItems = items.filter(item => item.isActive);
function handleFormSubmit(event) { ... }
```

### 4. Kleine Funktionen (Single Responsibility)

```jsx
// ❌ SCHLECHT - Macht zu viel
function processOrder(order) {
  // Validierung
  if (!order.email) throw new Error('...');
  // Berechnung
  const total = order.items.reduce(...);
  // API Call
  await fetch('/api/orders', { body: order });
  // Email senden
  await sendEmail(order.email);
}

// ✅ GUT - Aufgeteilt
function validateOrder(order) { ... }
function calculateTotal(items) { ... }
function submitOrder(order) { ... }
function notifyCustomer(email) { ... }

async function processOrder(order) {
  validateOrder(order);
  const total = calculateTotal(order.items);
  await submitOrder({ ...order, total });
  await notifyCustomer(order.email);
}
```

### 5. Frühe Returns (Guard Clauses)

```jsx
// ❌ SCHLECHT - Tiefe Verschachtelung
function getDiscount(user) {
  if (user) {
    if (user.isPremium) {
      if (user.orders > 10) {
        return 0.2;
      }
    }
  }
  return 0;
}

// ✅ GUT - Frühe Returns
function getDiscount(user) {
  if (!user) return 0;
  if (!user.isPremium) return 0;
  if (user.orders <= 10) return 0;
  return 0.2;
}
```

## Refactoring-Checkliste

- [ ] Duplizierter Code extrahiert
- [ ] Magic Numbers durch Konstanten ersetzt
- [ ] Variablen/Funktionen aussagekräftig benannt
- [ ] Funktionen machen nur EINE Sache
- [ ] Verschachtelung durch Guard Clauses reduziert
- [ ] Kommentare nur für "Warum", nicht "Was"
