# Ethik auf Rädern – Statische Website

Diese Website ist **rein statisch** (HTML/CSS/JS) und kann z. B. über **GitHub Pages**, **Netlify** oder **Vercel** kostenlos veröffentlicht werden.

## Schnellstart (lokal)
- Ordner entpacken
- `index.html` im Browser öffnen

## Online veröffentlichen (empfohlen: GitHub Pages)
1. Bei GitHub ein neues Repository erstellen (z. B. `ethik-auf-raedern`).
2. Alle Dateien aus diesem Ordner ins Repository hochladen (Root-Ebene).
3. GitHub → **Settings** → **Pages**
   - *Source*: `Deploy from a branch`
   - *Branch*: `main` / `(root)`
4. GitHub zeigt dir danach die **öffentliche URL** der Website.

## QR‑Code zum Teilen
Im Ordner `assets/` liegt bereits ein QR‑Code: `assets/qr-share.png`.

⚠️ **Wichtig:** Der QR‑Code ist aktuell ein Platzhalter und muss auf eure echte Website‑URL zeigen, sobald ihr sie veröffentlicht habt.

### QR‑Code neu erzeugen
1. Öffne `make_qr.py`
2. Trage eure Website‑URL ein
3. Ausführen:

```bash
python3 make_qr.py
```

Danach wird `assets/qr-share.png` mit der richtigen URL überschrieben.
