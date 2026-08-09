// App.jsx — owns the habits array (the single source of truth) and every handler
// that changes it. Children receive data and callbacks as props; they never own habits.
import { useState } from "react";
import HabitForm from "./HabitForm.jsx";
import SummaryBanner from "./SummaryBanner.jsx";
import HabitCard from "./HabitCard.jsx";

// A stable, unique id per habit. crypto.randomUUID() exists in every modern browser;
// the fallback keeps this working in older/insecure contexts. Never use the array
// index — positions shift when habits are removed, and identity must not.
function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `habit-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function App() {
  const [habits, setHabits] = useState([]);

  // Append a new habit. Only the title comes from the user (R3); the rest is fixed.
  // The updater form (prev => ...) is used everywhere so we always build from the
  // latest state rather than a value captured when the handler was created.
  function handleAddHabit(title) {
    setHabits((prev) => [
      ...prev,
      { id: makeId(), title, doneToday: false, streak: 0 },
    ]);
  }

  // Flip doneToday for one habit and move its streak with it (R5).
  // map() returns a NEW array, and the matching habit is replaced by a NEW object —
  // untouched habits keep their original references, so React can skip re-rendering them.
  function handleToggleDone(id) {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const nowDone = !habit.doneToday;
        return {
          ...habit,
          doneToday: nowDone,
          // Marking done adds a day; un-marking takes it back, clamped at zero
          // so an un-tick can never produce a negative streak.
          streak: nowDone ? habit.streak + 1 : Math.max(0, habit.streak - 1),
        };
      })
    );
  }

  // Remove by id with filter() — splice() would mutate the array in place.
  function handleRemoveHabit(id) {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">Today</p>
        <h1 className="app__title">Habit tracker</h1>
        <p className="app__subtitle">
          Add the habits you want to keep. Tick each one off as you do it.
        </p>
      </header>

      <HabitForm onAdd={handleAddHabit} />

      {/* SummaryBanner gets the whole array and derives its numbers from it —
          nothing about progress is stored in state (R6). */}
      <SummaryBanner habits={habits} />

      {habits.length === 0 ? (
        <p className="empty">
          No habits yet. Add your first one above to start a streak.
        </p>
      ) : (
        <ul className="habit-list">
          {habits.map((habit) => (
            // key is the habit's own id, never the index.
            <li key={habit.id}>
              <HabitCard
                habit={habit}
                onToggleDone={handleToggleDone}
                onRemove={handleRemoveHabit}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
