import { useState } from 'react';
import PropTypes from 'prop-types';
import TeamPanel from './TeamPanel.jsx';

// Points needed to win (stretch goal 3).
const WINNING_SCORE = 10;
// How many history entries are shown (stretch goal 2).
const HISTORY_LENGTH = 5;

function Scoreboard({ redName, blueName }) {
  // R-3: each team's score is its own independent piece of state, so
  // changing one never re-creates or risks overwriting the other.
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);

  // Stretch 1: how many points a single click adds or removes.
  // Kept as a string so the input can be briefly empty while typing.
  const [stepInput, setStepInput] = useState('1');

  // Stretch 2: list of past actions ("Red +1", "Blue -1"), newest first.
  const [history, setHistory] = useState([]);

  // Stretch 3: which team reached WINNING_SCORE *first*. This has to be
  // state (not derived from the scores) because "first" depends on the
  // order of events, not on the current numbers.
  const [winner, setWinner] = useState(null);

  // Turn the raw input into a safe positive whole number (falls back to 1).
  const parsedStep = Math.floor(Number(stepInput));
  const step = parsedStep >= 1 ? parsedStep : 1;

  // Shared logic for every score change. `setScore` is the setter of the
  // team being changed, `delta` is +step or -step.
  function changeScore(team, currentScore, setScore, delta) {
    // Never drop below 0 (problem statement).
    const nextScore = Math.max(0, currentScore + delta);
    const applied = nextScore - currentScore;
    if (applied === 0) return;

    // Functional updater: compute from the latest state instead of a
    // possibly stale value, and never mutate it directly.
    setScore((prev) => Math.max(0, prev + delta));

    // Record the action using a new array (immutability) and keep
    // only the last HISTORY_LENGTH entries.
    const label = `${team} ${applied > 0 ? '+' : ''}${applied}`;
    setHistory((prev) => [label, ...prev].slice(0, HISTORY_LENGTH));

    // First team to reach the target becomes the winner.
    if (winner === null && nextScore >= WINNING_SCORE) {
      setWinner(team);
    }
  }

  // R-6: "Reset Scores" puts everything back to the starting point.
  // Each setter is called once with a functional updater; React batches
  // these into a single re-render.
  function handleReset() {
    setRedScore(() => 0);
    setBlueScore(() => 0);
    setHistory(() => []);
    setWinner(() => null);
  }

  return (
    <section className="scoreboard">
      <div className="panels">
        <TeamPanel
          name={redName}
          color="red"
          score={redScore}
          step={step}
          isWinner={winner === 'Red'}
          onAdd={() => changeScore('Red', redScore, setRedScore, step)}
          onSubtract={() => changeScore('Red', redScore, setRedScore, -step)}
        />
        <div className="divider" aria-hidden="true">VS</div>
        <TeamPanel
          name={blueName}
          color="blue"
          score={blueScore}
          step={step}
          isWinner={winner === 'Blue'}
          onAdd={() => changeScore('Blue', blueScore, setBlueScore, step)}
          onSubtract={() => changeScore('Blue', blueScore, setBlueScore, -step)}
        />
      </div>

      <div className="controls">
        <label className="step">
          Points per click
          <input
            type="number"
            min="1"
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
          />
        </label>
        <button type="button" className="reset" onClick={handleReset}>
          Reset Scores
        </button>
      </div>

      <div className="history">
        <h2>Last {HISTORY_LENGTH} actions</h2>
        {history.length === 0 ? (
          <p className="empty">No actions yet.</p>
        ) : (
          <ol>
            {history.map((entry, i) => (
              // Entries can repeat ("Red +1" twice), so the position is
              // part of the key; the list is only ever rebuilt, not edited.
              <li key={`${i}-${entry}`}>{entry}</li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

Scoreboard.propTypes = {
  redName: PropTypes.string.isRequired,
  blueName: PropTypes.string.isRequired,
};

export default Scoreboard;
