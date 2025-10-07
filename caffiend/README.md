# Caffiend

React app built with Vite for tracking coffee consumption and stats, with Firebase Auth/Firestore and Tailwind CSS.

## Tech stack

- React 19
- Vite 6
- Tailwind CSS 4
- Firebase (Auth, Firestore)
- ESLint 9

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` in the project root and add your Firebase config:
   ```bash
   VITE_FIREBASE_APIKEY=your_api_key
   VITE_FIREBASE_AUTHDOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECTID=your_project_id
   VITE_FIREBASE_STORAGEBUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGINGSENDERID=your_sender_id
   VITE_FIREBASE_APPID=your_app_id
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

## Project structure (selected)

```
.env                   # Firebase env vars (VITE_FIREBASE_*)
firebase.js            # Firebase initialization (auth, db)
src/
  App.jsx                 # Routes top-level layout and conditional sections
  main.jsx                # React root with AuthProvider
  index.css               # Base styles
  fanta.css               # Additional styles/theme
  context/
    AuthContext.jsx       # Auth state, Firestore user data fetch
  components/
    Authentication.jsx    # Auth UI (login/signup/reset)
    CoffeeForm.jsx        # Add a coffee/drink entry
    Hero.jsx              # Landing section, CTA
    History.jsx           # User consumption history
    Layout.jsx            # App shell (header/footer/auth-aware)
    Modal.jsx             # Reusable modal
    Stats.jsx             # Caffeine stats and summaries
  utils/
    index.js              # Calculations and mock data
```

## Dependencies (from package.json)

- `react`, `react-dom`
- `firebase`
- `tailwindcss`, `@tailwindcss/vite`
- Dev: `vite`, `@vitejs/plugin-react`, `eslint` and related plugins

## Notes

- Requires Node.js 18+ for React 19 and Vite 6
- Tailwind v4 is enabled; styles live in `src/index.css`/`src/fanta.css` as used by components.
- Ensure your Firebase project has Authentication and Firestore enabled.
