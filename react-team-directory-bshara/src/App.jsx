import { members } from "./data/members";
import TeamList from "./components/TeamList";
import "./index.css";

export default function App() {
  return (
    <main>
      <h1>Team Directory</h1>
      <TeamList members={members} />
    </main>
  );
}