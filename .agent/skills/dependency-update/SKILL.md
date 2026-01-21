---
name: dependency-update
description: Sichere Dependency-Updates
---

# Dependency Update

## Update-Strategie

### 1. Vor dem Update

```bash
# Aktuelle Versionen prüfen
npm outdated

# Sicherheits-Audit
npm audit
```

### 2. Update-Typen verstehen

| Version | Beispiel | Bedeutung | Risiko |
|---------|----------|-----------|--------|
| Patch   | 1.0.0 → 1.0.1 | Bug Fixes | 🟢 Low |
| Minor   | 1.0.0 → 1.1.0 | Neue Features | 🟡 Medium |
| Major   | 1.0.0 → 2.0.0 | Breaking Changes | 🔴 High |

### 3. Sichere Updates

```bash
# Nur Patch-Updates (sicher)
npm update

# Spezifische Dependency updaten
npm install package@latest

# Mit Vorsicht: Major Updates
npm install package@^2.0.0
```

## Kritische Dependencies

### Niemals blind updaten:
- **react** / **react-dom** - Breaking Changes möglich
- **next** - Major Versions haben Migrations-Guides
- **firebase** - API-Änderungen möglich
- **tailwindcss** - Config-Änderungen bei Major

### Immer Changelog lesen:
1. GitHub Releases prüfen
2. CHANGELOG.md lesen
3. Migration Guide befolgen

## Nach dem Update

```bash
# 1. Clean Install
rm -rf node_modules package-lock.json
npm install

# 2. Build testen
npm run build

# 3. Dev-Server starten
npm run dev

# 4. Kritische Flows testen
# - Login/Logout
# - Hauptfunktionen
# - Responsive Design
```

## Lock-File

**IMMER `package-lock.json` committen!**

```bash
git add package.json package-lock.json
git commit -m "chore: update dependencies"
```

## Checkliste

- [ ] `npm audit` zeigt keine kritischen Vulnerabilities
- [ ] Nur eine Dependency gleichzeitig updaten
- [ ] Changelog gelesen
- [ ] Build erfolgreich
- [ ] Manuelle Tests durchgeführt
- [ ] package-lock.json committed
