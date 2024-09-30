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
  const formatDate = (date: Date | null | undefined) =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "N/A";

  return (
    <div className={styles.containerTable}>
      <Table aria-label="Tableau des membres" className={styles.table}>
        <TableHeader>
          <TableColumn>Prénom</TableColumn>
          <TableColumn>Nom</TableColumn>
          <TableColumn>Genre</TableColumn>
          <TableColumn>Date de naissance</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.firstName}</TableCell>
              <TableCell>{member.lastName}</TableCell>
              <TableCell>{member.gender}</TableCell>
              <TableCell>{formatDate(member.birthDate)}</TableCell>
              <TableCell>
                <button onClick={() => onEdit(member)}>Modifier</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberList;
