# StayManager Pro

Professional hospitality management dashboard — reservations, schedule, check-in/out, reports, guest history, and optional Google Sheets sync.

## Project structure

```
staymanager/
├── index.html          ← Page shell (loads everything below)
├── css/
│   └── styles.css      ← All styling (light + dark theme)
├── js/
│   └── app.js          ← All application logic (React/JSX)
├── assets/
│   └── login-bg.jpg    ← Login page background photo (see note below)
└── README.md
```

No build step. React, ReactDOM, and Babel are loaded from CDN and the JSX is compiled in the browser.

## Running it

⚠️ Because `app.js` is loaded as an external Babel script, opening `index.html` directly from disk (`file://`) **won't work** — browsers block it for security (CORS). You must serve it over HTTP. Any of these works:

```bash
# Python (built into most systems)
python -m http.server 8000

# Node
npx serve
```

Then open `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → branch `main`, folder `/ (root)`.
3. Your app is live at `https://<username>.github.io/<repo>/` — GitHub serves `index.html` automatically and it loads the CSS/JS files alongside it.

## Login background image

The original single-file version embedded the login photo as base64 inside the HTML. In this structure it's a proper image file at `assets/login-bg.jpg`. If the file is missing, a navy/gold gradient fallback is shown instead — the app still works.

To extract the photo from your old single-file `staymanager.html`, run this once:

```python
import re, base64
html = open('staymanager.html', encoding='utf-8').read()
m = re.search(r'data:image/jpeg;base64,([^"]+)', html)
open('assets/login-bg.jpg', 'wb').write(base64.b64decode(m.group(1)))
```

Or simply drop any photo of your property at `assets/login-bg.jpg`.

## Default logins

| Role  | Email                      | Password          |
|-------|----------------------------|-------------------|
| Admin | miguel@staymanager.com     | `D0022b0c0cf53@$` |
| Staff | desk@staymanager.com       | `desk123`         |

> ⚠️ **Security note:** passwords are stored in plain text in the browser (and in the JS source). This is fine for a demo, but do not use this auth scheme for anything handling real guest data.

## Data persistence

- **Local Mode (default):** everything is saved in the browser's `localStorage`.
- **Database Mode:** connect a Google Apps Script Web App URL in *Settings → Database* to sync reservations, rooms, and users to Google Sheets.
