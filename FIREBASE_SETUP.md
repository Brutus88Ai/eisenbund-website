# Firebase Einrichtung — Kurzanleitung (Deutsch) 🔧

Diese Anleitung führt dich durch die minimalen Schritte, um Firebase Authentication (Google Sign-In) für die App zu konfigurieren.

## 1) Firebase-Projekt erstellen
1. Gehe zu https://console.firebase.google.com/
2. "Projekt hinzufügen" → Name wählen → Projekt erstellen.

## 2) Web-App hinzufügen
1. Projekt öffnen → Zähne-Icon (Einstellungen) → "Projektübersicht" → "App hinzufügen" → Web
2. App registrieren (Name): z. B. `eisenbund-web`
3. Die angezeigten Config-Werte (apiKey, authDomain, projectId, appId, measurementId, ...) kopieren

## 3) Authentication konfigurieren (wichtig)
1. Links: "Authentication" → Tab "Sign-in method"
2. Aktivieren: "Google" → Speichern
3. Bei Bedarf: OAuth Consent (Google Cloud Console) für externe Nutzer konfigurieren (nur nötig bei verifizierten Apps)

## 4) Autorisierte Domains hinzufügen
Unter Authentication → Sign-in method → Authorized domains: füge hinzu
- `localhost:5173` (für lokale Entwicklung)
- deine Produktions-Domain (z. B. `your-site.vercel.app` oder `example.com`)

## 5) Umgebungsvariablen setzen
- Kopiere `.env.example` → `.env` (im Projekt-Root)
- Trage die Werte aus Schritt 2 ein (beginnt mit `VITE_FIREBASE_...`)

Falls du auf Vercel/Dienst hostest:
- Gehe zu Project Settings → Environment Variables
- Lege die gleichen `VITE_FIREBASE_*` Variablen an (Production/Preview/Development nach Bedarf)

## 6) Testen lokal
1. `npm run dev`
2. Öffne http://localhost:5173 → Login → Sign in with Google
3. Wenn Popup blockiert wird, nutzt die App automatisch Redirect-Fallback

## 7) (Optional) Hosting via Firebase
1. `npm i -g firebase-tools`
2. `firebase login`
3. `firebase init` → Hosting auswählen → build-Ordner: `dist` (für Vite `vite build`)
4. `firebase deploy --only hosting`

---
Wenn du möchtest, kann ich:
- eine `firebase.json` + `.firebaserc` vorbereiten (für Hosting)
- oder direkt bei Vercel die Env-Variablen für dich eintragen, wenn du Zugriff gewähren willst

Wenn du willst, mache ich die nächsten Schritte für dich — sag mir, ob du lieber Hosting über Firebase oder Vercel einrichtest. ✨

---

## Automatisches Deployment via GitHub Actions
Ich habe einen Actions-Workflow (`.github/workflows/firebase-hosting.yml`) hinzugefügt, der bei Push auf `main` baut und auf Firebase Hosting deployed.

### Was du noch tun musst (sicher & kurz):
1. **Firebase Service Account erstellen**
   - Console → Projekt auswählen → Einstellungen → Service-Accounts → "Privaten Schlüssel erstellen" (JSON herunterladen)
   - Diese JSON-Datei enthält Felder wie `client_email`, `private_key`, `project_id` etc.
2. **GitHub Secret anlegen**
   - Repository → Settings → Secrets and variables → Actions → New repository secret
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Inhalt der JSON-Datei (komplett, inklusive Zeilenumbrüche)
3. **.firebaserc anpassen**
   - Ersetze `<YOUR_FIREBASE_PROJECT_ID>` mit deinem Firebase `project_id` (aus der JSON oder der Console)
4. Push auf `main` → GitHub Actions wird auslösen und deployen

> Hinweis: Das Secret `FIREBASE_SERVICE_ACCOUNT` enthält sensible Schlüssel. Teile es niemals öffentlich.

Wenn du möchtest, kann ich noch:
- automatisches Extrahieren von `project_id` aus dem Secret hinzufügen, oder
- einen Check einbauen, der vor dem Deploy prüft, ob die `VITE_FIREBASE_*` Variablen gesetzt sind.

Wenn alles eingerichtet ist, pushe einfach einen Commit auf `main` und die Action deployed automatisch.