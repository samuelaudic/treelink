import React from "react";
import { Member } from "../../../../interfaces/Member";

interface MemberListProps {
  members: Member[];
  onEdit: (member: Member) => void;
}

const MemberList: React.FC<MemberListProps> = ({ members, onEdit }) => {
  const formatDate = (date: Date | null | undefined): string =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "N/A";

  return (
    <table>
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Genre</th>
          <th>Date de naissance</th>
          <th>Date de décès</th>
          <th>Père</th>
          <th>Mère</th>
          <th>Conjoint</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {members.length > 0 ? (
          members.map((member) => (
            <tr key={member.id}>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{member.gender}</td>
              <td>{formatDate(member.birthDate)}</td>
              <td>{formatDate(member.deathDate)}</td>
              <td>
                {member.father
                  ? `${member.father.firstName} ${member.father.lastName}`
                  : "N/A"}
              </td>
              <td>
                {member.mother
                  ? `${member.mother.firstName} ${member.mother.lastName}`
                  : "N/A"}
              </td>
              <td>
                {member.spouse
                  ? `${member.spouse.firstName} ${member.spouse.lastName}`
                  : "N/A"}
              </td>
              <td>
                <button onClick={() => onEdit(member)} disabled={!member.id}>
                  Modifier
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9}>Aucun membre trouvé</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MemberList;
