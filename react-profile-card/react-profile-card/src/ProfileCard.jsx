import PropTypes from "prop-types";

// R3 — One card, one profile.
//
// Why this component exists: it is the reusable unit. It knows how to render
// *a* profile, not *these* profiles. It never reaches into the profiles array
// and never decides which profile to show — the parent passes one down through
// props. That is one-way data flow, and it's what makes this card droppable
// into any other screen later.
//
// R7 — no state, no hooks, no class. Props in, JSX out.

function ProfileCard({ profile }) {
  // Destructuring here rather than in the parameter list keeps the prop name
  // `profile` available for the PropTypes definition below.
  const { avatar, fullName, jobTitle, bio } = profile;

  return (
    // R5 — <article> because a card is a self-contained piece of content that
    // would still make sense pulled out of the page on its own.
    <article className="card">
      <img
        className="card__avatar"
        src={avatar}
        // Alt text describes the person, not the file. A screen reader user
        // hears "Dana Levi", which is the useful part.
        alt={fullName}
        width="88"
        height="88"
      />

      <h2 className="card__name">{fullName}</h2>

      <p className="card__title">{jobTitle}</p>

      {/* Stretch goal 2 — conditional rendering.
          A ternary, not `bio && ...`, because we want a fallback string when
          the bio is missing rather than rendering nothing at all. */}
      <p className={bio ? "card__bio" : "card__bio card__bio--empty"}>
        {bio ? bio : "No bio provided"}
      </p>
    </article>
  );
}

// Stretch goal 3 — runtime type checking.
// This does nothing in production, but in development React logs a console
// warning the moment someone passes a profile missing a required field.
// Cheap insurance against a typo in profiles.js.
ProfileCard.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    bio: PropTypes.string, // optional on purpose — see the conditional above
  }).isRequired,
};

export default ProfileCard;
