// SummaryBanner.jsx — pure derived state. Nothing here is stored with useState:
// the counts and the bar width are recalculated from `habits` on every render,
// which is why they can never drift out of sync with the list.
export default function SummaryBanner({ habits }) {
  const total = habits.length;
  const completed = habits.filter((habit) => habit.doneToday).length;

  // Guard against 0/0 when the list is empty.
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const allDone = total > 0 && completed === total;

  return (
    <section className={`banner ${allDone ? "banner--complete" : ""}`}>
      <div className="banner__head">
        <p className="banner__count">
          {completed} of {total} done
        </p>
        <p className="banner__percent">{percent}%</p>
      </div>

      <div
        className="banner__track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Habits completed today"
      >
        <div className="banner__fill" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}
