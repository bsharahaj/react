import profiles from "./profiles";
import ProfileGrid from "./ProfileGrid";
import "./styles.css";

// The top of the component tree.
//
// Why this component exists: it owns the data and hands it downward. Nothing
// below it ever imports profiles.js directly, so data flows in exactly one
// direction — App -> ProfileGrid -> ProfileCard. That is the whole point of
// this exercise.

function App() {
  return (
    <main className="page">
      <header className="page__header">
        <p className="page__eyebrow">Team directory</p>
        <h1 className="page__title">Who you&rsquo;ll be working with</h1>
      </header>

      <ProfileGrid profiles={profiles} />
    </main>
  );
}

export default App;
