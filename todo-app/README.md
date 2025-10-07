# Todo App (React + Vite)

A simple Todo application built with React 19 and Vite. Tasks persist in `localStorage` under the key `todo-app`.

## Features

- Add, edit, complete, and delete todos
- Filter by tabs: All, Active, Completed
- Persistent storage via `localStorage`

## Quick Start

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

## Scripts

- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run preview`: preview the production build
- `npm run lint`: run ESLint

## Project Structure (high level)

```
src/
  main.jsx               # React root; imports global styles
  App.jsx                # App state, handlers, and composition
  index.css              # Global styles
  fanta.css              # Additional/theme styles
  components/
    Header.jsx          # Header showing open task count
    Tabs.jsx            # All / Active / Completed tabs
    TodoInput.jsx       # Input and add/save interactions
    TodoList.jsx        # Renders filtered list of todos
    TodoCard.jsx        # Single todo actions (done/edit/delete)
```

## Data Shape

Each todo is stored as:

```json
{ "input": "Task title", "complete": false }
```

## Notes

- Editing a todo loads its text into the input; saving replaces the original.
- Completed todos cannot be marked done again and are visually disabled for that action.
