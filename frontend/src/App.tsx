import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [members, setMembers] = useState<MemberType[]>([]);

  type MemberType = {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  return (
    <div>
      <h1>Liste des membres</h1>
      <ul>
        {members.map((member: MemberType) => (
          <li key={member.id}>
            {member.firstName} {member.lastName} ({member.gender})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
