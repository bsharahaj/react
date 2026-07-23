# React Profile Card

A small React app that renders a grid of team profile cards. Built for
Lecture 17: JSX, functional components, and props.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To check it compiles cleanly:

```bash
npm run build
npm run lint
```

## Screenshots

<!-- Replace this line with your own screenshot.
     Put the image file in the repo, then use:  ![Profile grid](screenshot.png) -->

## How it's structured

```
src/
  index.jsx        entry point - mounts React into index.html
  App.jsx          owns the data, passes it down
  ProfileGrid.jsx  maps the array into cards
  ProfileCard.jsx  renders one profile
  profiles.js      the data array
  styles.css       layout and styling
```

Data flows in one direction only: `profiles.js` -> `App` -> `ProfileGrid` ->
`ProfileCard`. No component below `App` imports the data directly, which is
what makes `ProfileCard` reusable - it renders whatever profile it's handed.

## Requirements coverage

| ID | Where |
|---|---|
| R1 | `App.jsx`, `ProfileCard.jsx`, `profiles.js`, `index.jsx` all present |
| R2 | 4 profile objects in `profiles.js` |
| R3 | `ProfileCard` takes one `profile` object via props |
| R4 | `ProfileGrid` maps the array into cards |
| R5 | `<article>`, `<img>`, `<h2>`, `<section>`, `<header>`, `<main>` |
| R6 | External CSS: responsive grid, 1px borders, circular avatars |
| R7 | No class components, no hooks, no state |
| R8 | `npm run build` and `npm run lint` both pass with 0 errors |

## Stretch goals

All three are implemented:

1. **Hover interaction** - cards lift 4px with a shadow, avatar scales to 1.06
   and its ring picks up the accent colour.
2. **Conditional rendering** - the fourth profile has no `bio`, so the card
   shows "No bio provided" in a quieter italic style.
3. **PropTypes** - `ProfileCard` and `ProfileGrid` both declare runtime
   type-checking. `bio` is marked optional on purpose.

## Notes

- Avatars come from `pravatar.cc`, a placeholder service, so they need an
  internet connection to load.
- The grid uses `auto-fill` with `minmax()` rather than media queries, so the
  column count adapts on its own from phone to desktop.
