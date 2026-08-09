// HabitForm.jsx — controlled form for creating a habit.
// It owns only its own draft text; the finished habit is handed up via onAdd.
import { useState } from "react";

export default function HabitForm({ onAdd }) {
  const [title, setTitle] = useState("");

  // Derived, not stored: whether the draft is submittable follows from `title`.
  const trimmedTitle = title.trim();
  const canAdd = trimmedTitle.length > 0;

  function handleSubmit(event) {
    // The form element is used so Enter submits too — preventDefault stops the page reload.
    event.preventDefault();
    if (!canAdd) return;

    onAdd(trimmedTitle);
    setTitle(""); // clearing the state clears the input, because the input is controlled
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <label className="habit-form__label" htmlFor="habit-title">
        New habit
      </label>

      <div className="habit-form__row">
        {/* Controlled input: value comes from state, and every keystroke writes back
            to state. There is no other copy of the text anywhere. */}
        <input
          id="habit-title"
          className="habit-form__input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Drink 2 L water"
          autoComplete="off"
        />

        <button className="btn btn--add" type="submit" disabled={!canAdd}>
          Add habit
        </button>
      </div>
    </form>
  );
}
