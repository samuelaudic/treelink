import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MemberType } from "../../../../types/MemberType";
import MemberModal from "../MemberModal/MemberModal";
import Columns from "./Columns";
import MembersData from "./MembersData";
import styles from "./MembersList.module.scss";

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    // TODOREVIEW SA : Replace with API call
    setMembers(MembersData);
  }, []);

  const handleEdit = (member: MemberType) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleSave = (member: MemberType) => {
    if (member.id) {
      // Edit
      setMembers(members.map((m) => (m.id === member.id ? member : m)));
    } else {
      // Add
      setMembers([...members, { ...member, id: members.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleAdd}>+ Ajouter un membre</button>
      <Table aria-label="Tableau des membres" className={styles.table}>
        <TableHeader columns={Columns}>
          {(column) => (
            <TableColumn key={column.key} className={styles.headerColumn}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={members}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className={styles.cell}>
                  {columnKey === "birthDate" || columnKey === "deathDate"
                    ? formatDate(item[columnKey as keyof MemberType] as Date)
                    : columnKey === "fatherId" ||
                      columnKey === "motherId" ||
                      columnKey === "spouseId"
                    ? members.find(
                        (m) => m.id === item[columnKey as keyof MemberType]
                      )?.firstName || "N/A"
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <MemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default MemberList;
