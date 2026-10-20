import PropTypes from 'prop-types';

// Presentational component (R-4): it holds no state of its own. It shows
// the score it is given and calls back to the parent when a button is
// clicked, so the parent stays the single source of truth.
function TeamPanel({ name, color, score, step = 1, isWinner = false, onAdd, onSubtract }) {
  return (
    <div className={`team-panel ${color}`}>
      <h2>
        {name}
        {isWinner && (
          <span className="confetti" role="img" aria-label="winner">
            {' '}🎉
          </span>
        )}
      </h2>
      <p className="score" aria-live="polite">{score}</p>
      <div className="buttons">
        {/* R-5: -1 is disabled when the score is 0, derived straight from props. */}
        <button type="button" onClick={onSubtract} disabled={score === 0}>
          −{step}
        </button>
        <button type="button" onClick={onAdd}>
          +{step}
        </button>
      </div>
    </div>
  );
}

TeamPanel.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['red', 'blue']).isRequired,
  score: PropTypes.number.isRequired,
  // Points per click, shown on the buttons (stretch goal 1).
  step: PropTypes.number,
  isWinner: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onSubtract: PropTypes.func.isRequired,
};

export default TeamPanel;
