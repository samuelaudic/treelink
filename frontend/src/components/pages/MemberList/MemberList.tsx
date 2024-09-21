// src/components/MemberList.tsx
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MemberType } from "../../../types/MemberType";
import MemberForm from "./MemberForm/MemberForm";

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMember, setEditMember] = useState<MemberType | null>(null);

  useEffect(() => {
    // Charger les membres depuis l'API backend
    fetch("http://localhost:3000/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  // Ouvrir la modale pour ajouter/modifier un membre
  const openModal = (member: MemberType | null = null) => {
    setEditMember(member);
    setIsModalOpen(true);
  };

  // Fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
    setEditMember(null);
  };

  // Soumettre le formulaire d'ajout/modification
  const handleSubmit = (memberData: Partial<MemberType>) => {
    if (editMember) {
      // Mettre à jour le membre existant
      fetch(`http://localhost:3000/api/members/${editMember.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      })
        .then((res) => res.json())
        .then((updatedMember) => {
          setMembers(
            members.map((member) =>
              member.id === editMember.id ? updatedMember : member
            )
          );
        })
        .catch((error) => console.error("Erreur:", error));
    } else {
      // Ajouter un nouveau membre
      fetch("http://localhost:3000/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      })
        .then((res) => res.json())
        .then((newMember) => {
          setMembers([...members, newMember]);
        })
        .catch((error) => console.error("Erreur:", error));
    }
    closeModal(); // Fermer la modale après soumission
  };

  // Supprimer un membre
  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/api/members/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMembers(members.filter((member) => member.id !== id));
      })
      .catch((error) => console.error("Erreur:", error));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => openModal()}
        style={{ display: "flex", gap: "8px", alignItems: "center" }}
      >
        <FontAwesomeIcon icon={faPlus} size="1x" />
        Ajouter un membre
      </Button>

      {/* MODALE */}
      <MemberForm
        open={isModalOpen}
        handleClose={closeModal}
        handleSubmit={handleSubmit}
        initialMemberData={editMember}
        members={members}
      />

      {/* Tableau des membres */}
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prénom</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Date de naissance</TableCell>
              <TableCell>Père</TableCell>
              <TableCell>Mère</TableCell>
              <TableCell>Conjoint</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.firstName}</TableCell>
                <TableCell>{member.lastName}</TableCell>
                <TableCell>{member.gender}</TableCell>
                <TableCell>{member.birthDate}</TableCell>
                <TableCell>
                  {member.fatherId
                    ? members.find((m) => m.id === member.fatherId)?.firstName
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {member.motherId
                    ? members.find((m) => m.id === member.motherId)?.firstName
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {member.spouseId
                    ? members.find((m) => m.id === member.spouseId)?.firstName
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Button onClick={() => openModal(member)}>Modifier</Button>
                  <Button color="error" onClick={() => handleDelete(member.id)}>
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MemberList;
