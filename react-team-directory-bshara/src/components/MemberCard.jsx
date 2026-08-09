import Badge from "./Badge";

export default function MemberCard({ name, role, avatar, bio = "No bio yet.", isLead }) {
  return (
    <>
      <img className="avatar" src={avatar} alt={name} />
      <h3>
        {name}
       {  isLead  &&  <Badge label="Team Lead" /> }
      </h3>
      <p className="role">{role}</p>
      <p className="bio">{bio}</p>
    </>
  );
}