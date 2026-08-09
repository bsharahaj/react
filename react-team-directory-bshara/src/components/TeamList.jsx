import Card from "./Card";
import MemberCard from "./MemberCard";

export default function TeamList({ members }) {
  return (
    <div className="grid">
      {members.map((member) => (
        <Card key={member.id}>
          <MemberCard
            name={member.name}
            role={member.role}
            avatar={member.avatar}
            bio={member.bio}
            isLead={member.isLead}
          />
        </Card>
      ))}
    </div>
  );
}