# react-habit-tracker

A single-page daily habit dashboard built with React + Vite. Add habits, tick them
off for today, and watch the streaks and progress bar update.

## Setup

```bash
npm install
npm run dev
```





## Files

| File | Role |
| --- | --- |
| `src/index.jsx` | Entry point; mounts `<App />` and loads global styles |
| `src/App.jsx` | Owns the `habits` array and every handler that changes it |
| `src/HabitForm.jsx` | Controlled input + Add button; hands new titles up via `onAdd` |
| `src/HabitCard.jsx` | Renders one habit; reports toggle/remove clicks by id |
| `src/SummaryBanner.jsx` | Derives completed/total and the progress bar from `habits` |
| `src/styles.css` | Global styles, hover/focus states, done-state styling |

## How state is handled

- **One source of truth.** `habits` lives only in `App`. Children get data and
  callbacks as props and hold no copy of it.
- **Immutable updates.** Add uses spread into a new array, toggle uses `map` and
  returns a new object for the one habit that changed, remove uses `filter`.
  Nothing is pushed, spliced, or edited in place.
- **Stable ids.** Each habit gets `crypto.randomUUID()` (with a timestamp+random
  fallback). Ids are used for React keys and for identifying which habit a click
  refers to — never the array index, which shifts as habits come and go.
- **Derived state.** `completed`, `total` and the bar width are recalculated from
  `habits` on every render, so they cannot drift out of sync.

## Streak rule

Marking a habit done adds 1 to its streak; un-marking subtracts 1, clamped at 0
via `Math.max(0, streak - 1)` so it can never go negative. Un-ticking is treated
as undoing a mistake, so it exactly reverses the increment.

## Not used

No third-party state libraries — `useState` and event handlers only.
