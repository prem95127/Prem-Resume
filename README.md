# portfolio-app

Prem Kumar's portfolio built with React (Vite).

## Pages
Home (`/`), Resume (`/resume`), Projects (`/projects`, two projects) and Certificates (`/certificates`). The home page links to each.

## Themes and icons
The round palette button (bottom right) switches the colour theme (Classic, Midnight, Forest, Ocean, Rose, Ember) and the icon style (Line, Duotone, Badge, Ring) instantly. The choice is remembered in the browser. Theme colours are the blocks at the top of `src/styles.css`; add a new block plus an entry in `THEMES` in `src/theme.jsx` to create your own. Icons are in `src/icons.jsx`.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Images
Copy your old `assets/img/*` files into `public/img/` using the same file names
(`me.png`, `me 2.png`, `1.png`–`4.png`, and the certificate .jpg files).

## Edit content
Everything is in `src/data.js` (including the `projects` list, where you can edit or add projects).

## Contact form
Without a backend, the form opens the visitor's email app addressed to you.

## Optional: MongoDB backend
```
cd server
cp .env.example .env     # set MONGODB_URI
npm install && npm run seed && npm run dev   # http://localhost:5000
```
Then create `.env` in the app root with `VITE_API_URL=http://localhost:5000`.
Content then loads from MongoDB and contact messages are saved to it.
