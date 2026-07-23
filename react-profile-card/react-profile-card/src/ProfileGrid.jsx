import PropTypes from "prop-types";
import ProfileCard from "./ProfileCard";

// R4 — Turns an array of data into a grid of cards.
//
// Why this component exists separately from App: it splits two different jobs.
// App decides *what data the page uses*; ProfileGrid decides *how a list of
// profiles is laid out*. Keeping them apart means you could render a different
// list of people here without touching App at all.

function ProfileGrid({ profiles }) {
  return (
    <section className="grid" aria-label="Team profiles">
      {profiles.map((profile) => (
        // The `key` is React's identity tag for each item in a list. It must be
        // stable and unique — that's why profiles.js gives every object an id.
        // Using the array index instead works until the list reorders, then
        // React reuses the wrong DOM nodes.
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </section>
  );
}

ProfileGrid.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfileGrid;
