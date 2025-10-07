# Pokedex (React + Vite)

A simple Pokedex built with React and Vite. Browse Pokémon with images stored locally under `public/pokemon`. Styled with Tailwind CSS.

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- ESLint (React Hooks + Refresh)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview the production build:
   ```bash
   npm run preview
   ```

## Available Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint

## Project Structure

```
public/
  pokemon/               # Pokémon images (001.png … 151.png)
src/
  App.jsx                # App root
  main.jsx               # Entry point
  index.css              # Global styles
  fanta.css              # Extra styles
  utils/
    index.js             # Helper utilities
  components/
    Header.jsx
    SideNav.jsx
    PokeCard.jsx
    TypeCard.jsx
    Modal.jsx
    Spinner.jsx
```

## Styling

Tailwind is configured via the Vite plugin `@tailwindcss/vite`. See `vite.config.js`.

## Notes

- Images are loaded from `public/pokemon`. Ensure file names match expected IDs (e.g., `001.png`).
- This project targets modern browsers supported by Vite.
