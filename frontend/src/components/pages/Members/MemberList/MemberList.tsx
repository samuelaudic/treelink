import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Member } from "../../../../interfaces/Member";
import styles from "./MembersList.module.scss";

interface MemberListProps {
  members: Member[];
  onEdit: (member: Member) => void;
}

const MemberList: React.FC<MemberListProps> = ({ members, onEdit }) => {
  const formatDate = (date: Date | null | undefined): string =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "N/A";

  return (
    <div className={styles.containerTable}>
      <Table aria-label="Tableau des membres" className={styles.table}>
        <TableHeader>
          <TableColumn>Prénom</TableColumn>
          <TableColumn>Nom</TableColumn>
          <TableColumn>Genre</TableColumn>
          <TableColumn>Date de naissance</TableColumn>
          <TableColumn>Date de décès</TableColumn>
          <TableColumn>Père</TableColumn>
          <TableColumn>Mère</TableColumn>
          <TableColumn>Conjoint</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.isArray(members) && members.length > 0 ? (
            members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.firstName}</TableCell>
                <TableCell>{member.lastName}</TableCell>
                <TableCell>{member.gender}</TableCell>
                <TableCell>{formatDate(member.birthDate)}</TableCell>
                <TableCell>{formatDate(member.deathDate)}</TableCell>
                <TableCell>
                  {member.father
                    ? `${member.father.firstName} ${member.father.lastName}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {member.mother
                    ? `${member.mother.firstName} ${member.mother.lastName}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {member.spouse
                    ? `${member.spouse.firstName} ${member.spouse.lastName}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <button onClick={() => onEdit(member)} disabled={!member.id}>
                    Modifier
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9}>Aucun membre trouvé</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberList;
