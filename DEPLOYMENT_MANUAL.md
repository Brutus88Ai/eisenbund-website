# EISENBUND DEPLOYMENT MANUAL

## PHASE 1: SYSTEM INITIALIZATION (Local)
Since the automatic installation was restricted, you must execute the build locally.

1.  **Run Setup Script:**
    -   Double-click `setup_eisenbund.bat` in this folder.
    -   Wait for "SYSTEM ONLINE" message.
    -   This installs dependencies and builds the site.

## PHASE 2: VERCEL DEPLOYMENT (Hosting)
We will use Vercel for high-performance hosting.

1.  **Install Vercel CLI (Optional but recommended):**
    -   Open a terminal/cmd in this folder.
    -   Run: `npm i -g vercel`
    -   Run: `vercel login`
    -   Run: `vercel` to deploy.
    
    *OR*

2.  **Manual Upload (Web Interface):**
    -   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    -   Click **"Add New..."** -> **"Project"**.
    -   Import your GitHub repository (if you pushed this code) OR upload the folder manually if supported.
    -   **Framework Preset:** Vite
    -   **Build Command:** `npm run build`
    -   **Output Directory:** `dist`
    -   Click **Deploy**.

## PHASE 3: HOSTINGER REDIRECTION (DNS)
To route `eisenbund.com` (or your domain) to Vercel:

1.  **In Vercel:**
    -   Go to your project -> **Settings** -> **Domains**.
    -   Add your domain (e.g., `eisenbund.com`).
    -   Vercel will show you an **A Record** (e.g., `76.76.21.21`) and a **CNAME** (e.g., `cname.vercel-dns.com`).

2.  **In Hostinger:**
    -   Log in to Hostinger -> **Domains** -> **DNS / Name Servers**.
    -   **Delete** existing A records for `@` and CNAME for `www`.
    -   **Add A Record:**
        -   Type: A
        -   Name: @
        -   Target: `76.76.21.21` (Copy exact IP from Vercel)
        -   TTL: 3600
    -   **Add CNAME Record:**
        -   Type: CNAME
        -   Name: www
        -   Target: `cname.vercel-dns.com`
        -   TTL: 3600
    -   Save changes.

**Propagation:** It may take 1-24 hours for the domain to update globally.
