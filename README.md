# StayManager Pro

Professional hospitality management dashboard — reservations, schedule, check-in/out, reports, guest history, and optional Google Sheets sync.

## Project structure

```
staymanager/
├── index.html          ← Page shell (loads everything below)
├── css/
│   └── styles.css      ← All styling (light + dark theme)
├── js/
│   └── app.js          ← App logic, precompiled to plain JS (what the browser runs)
├── src/
│   └── app.jsx         ← Readable JSX source (edit this, then recompile)
├── assets/
│   └── login-bg.jpg    ← Login page background photo (see note below)
└── README.md
```

The JSX in `src/app.jsx` is precompiled into plain JavaScript at `js/app.js`, so the browser needs **no Babel and no build tools** to run the app.

## Running it

Just open `index.html` — double-clicking it works. An internet connection is needed only for the React CDN scripts and Google Fonts.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → branch `main`, folder `/ (root)`.
3. Your app is live at `https://<username>.github.io/<repo>/`.

## Making changes

- **CSS:** edit `css/styles.css` directly.
- **Logic/UI:** edit `src/app.jsx` (readable JSX), then recompile it to `js/app.js`. Any JSX compiler works; the simplest options:

```bash
# Option A — esbuild (fastest)
npx esbuild src/app.jsx --jsx=transform --target=es2017 --outfile=js/app.js

# Option B — TypeScript compiler
npx tsc src/app.jsx --jsx react --target es2017 --lib es2017,dom --allowJs --outFile js/app.js
```

(You can also edit `js/app.js` directly — it's valid plain JS — but keeping changes in `src/app.jsx` is cleaner.)

## Login background image

The original single-file version embedded the login photo as base64 inside the HTML. In this structure it's a proper image file at `assets/login-bg.jpg`. If the file is missing, a navy/gold gradient fallback shows instead — the app still works.

To extract the photo from your old single-file HTML, run this once:

```python
import re, base64
html = open('staymanager.html', encoding='utf-8').read()
m = re.search(r'data:image/jpeg;base64,([^"]+)', html)
open('assets/login-bg.jpg', 'wb').write(base64.b64decode(m.group(1)))
```

Or simply drop any photo of your property at `assets/login-bg.jpg`.

## Default logins

| Role  | Email                  | Password          |
|-------|------------------------|-------------------|
| Admin | miguel@staymanager.com | `D0022b0c0cf53@$` |
| Staff | desk@staymanager.com   | `desk123`         |

> ⚠️ **Security note:** passwords are stored in plain text in the browser and in the JS source. Fine for a demo — do not use this auth scheme for real guest data.

## Data persistence

- **Local Mode (default):** everything is saved in the browser's `localStorage`.
- **Database Mode:** connect a Google Apps Script Web App URL in *Settings → Database* to sync reservations, rooms, and users to Google Sheets.
