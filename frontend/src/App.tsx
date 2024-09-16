import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember = { firstName, lastName, gender };

    fetch("http://localhost:3000/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers([...members, data]);
        setFirstName("");
        setLastName("");
        setGender("");
      })
      .catch((error) => console.error("Erreur:", error));
  };

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
      <h2>Ajouter un membre</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default App;
