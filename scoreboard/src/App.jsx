import Scoreboard from './Scoreboard.jsx';

// Root component. It owns no state; it only decides *which* teams play
// and hands their names down to <Scoreboard> via props (R-2).
function App() {
  return (
    <main className="app">
      <h1>Live Scoreboard</h1>
      <Scoreboard redName="Team Red" blueName="Team Blue" />
    </main>
  );
}

export default App;
