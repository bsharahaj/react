// HabitCard.jsx — displays one habit and reports clicks back up by id.
// It holds no state of its own: what it shows is entirely a function of its props.
export default function HabitCard({ habit, onToggleDone, onRemove }) {
  const { id, title, doneToday, streak } = habit;

  return (
    <article className={`card ${doneToday ? "card--done" : ""}`}>
      <div className="card__text">
        <h2 className="card__title">{title}</h2>
        <p className="card__streak">
          <span className="card__streak-number">{streak}</span>
          <span className="card__streak-label">
            {streak === 1 ? "day streak" : "days streak"}
          </span>
        </p>
      </div>

      <div className="card__actions">
        {/* Each handler passes the habit's id, so App knows exactly which habit
            to change without caring where it sits in the array. */}
        <button
          type="button"
          className={`btn btn--toggle ${doneToday ? "is-done" : "is-todo"}`}
          onClick={() => onToggleDone(id)}
          aria-pressed={doneToday}
        >
          {doneToday ? "Done today" : "Mark done"}
        </button>

        <button
          type="button"
          className="btn btn--remove"
          onClick={() => onRemove(id)}
          aria-label={`Remove ${title}`}
        >
          Remove
        </button>
      </div>
    </article>
  );
}
