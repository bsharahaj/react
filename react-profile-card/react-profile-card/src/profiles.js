// R2 — The data source for the whole app.
//
// Why this file exists: keeping data separate from components means
// ProfileCard never needs to know where a profile came from. Swap this array
// for an API response later and not a single component has to change.
//
// Note the last entry deliberately has no `bio` — that exercises the
// conditional rendering in ProfileCard (stretch goal 2).

const profiles = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/300?img=47",
    fullName: "Dana Levi",
    jobTitle: "Front-End Developer",
    bio: "Builds design systems that survive contact with real product teams.",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/300?img=12",
    fullName: "Omar Haddad",
    jobTitle: "Back-End Developer",
    bio: "Spends most of his day making database queries stop being slow.",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/300?img=32",
    fullName: "Maya Fischer",
    jobTitle: "UX Designer",
    bio: "Runs the usability tests nobody wants to watch and everybody needs.",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/300?img=68",
    fullName: "Tomer Barak",
    jobTitle: "QA Engineer",
    // no bio — on purpose, see ProfileCard
  },
];

export default profiles;
