import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

type MemberType = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  deathDate: string;
  fatherId: number;
  motherId: number;
  spouseId: number;
};

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMemberId, setEditMemberId] = useState<number | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [fatherId, setFatherId] = useState<number | null>(null);
  const [motherId, setMotherId] = useState<number | null>(null);
  const [spouseId, setSpouseId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  const handleEdit = (member: MemberType) => {
    setIsEditing(true);
    setEditMemberId(member.id);
    setFirstName(member.firstName);
    setLastName(member.lastName);
    setGender(member.gender);
    setBirthDate(member.birthDate || "");
    setDeathDate(member.deathDate || "");
    setFatherId(member.fatherId || null);
    setMotherId(member.motherId || null);
    setSpouseId(member.spouseId || null);
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/api/members/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMembers(members.filter((member) => member.id !== id));
      })
      .catch((error) => console.error("Erreur:", error));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const memberData = {
      firstName,
      lastName,
      gender,
      birthDate,
      deathDate,
      fatherId,
      motherId,
      spouseId,
    };

    if (isEditing && editMemberId) {
      // Update an existing member
      fetch(`http://localhost:3000/api/members/${editMemberId}`, {
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
              member.id === editMemberId ? updatedMember : member
            )
          );
          resetForm();
        })
        .catch((error) => console.error("Erreur:", error));
    } else {
      // Create a new member
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
          resetForm();
        })
        .catch((error) => console.error("Erreur:", error));
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditMemberId(null);
    setFirstName("");
    setLastName("");
    setGender("");
    setBirthDate("");
    setDeathDate("");
    setFatherId(null);
    setMotherId(null);
    setSpouseId(null);
  };

  return (
    <div style={{ padding: "0 4%" }}>
      <h2>{isEditing ? "Modifier un membre" : "Ajouter un membre"}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Prénom"
          value={firstName}
          style={{ color: "black", backgroundColor: "white" }}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Nom"
          value={lastName}
          style={{ color: "black", backgroundColor: "white" }}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Genre"
          value={gender}
          style={{ color: "black", backgroundColor: "white" }}
          onChange={(e) => setGender(e.target.value)}
          required
        />
        <TextField
          label="Date de naissance"
          type="date"
          value={birthDate}
          style={{ color: "black", backgroundColor: "white" }}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <TextField
          label="Date de décès"
          type="date"
          value={deathDate}
          style={{ color: "black", backgroundColor: "white" }}
          onChange={(e) => setDeathDate(e.target.value)}
        />
        <TextField
          label="ID Père"
          type="number"
          value={fatherId || ""}
          style={{ color: "black", backgroundColor: "white" }}
          onChange={(e) => setFatherId(Number(e.target.value))}
        />
        <TextField
          label="ID Mère"
          type="number"
          value={motherId || ""}
          style={{ color: "black", backgroundColor: "white" }}
          onChange={(e) => setMotherId(Number(e.target.value))}
        />
        <TextField
          label="ID Conjoint"
          type="number"
          value={spouseId || ""}
          style={{ color: "black", backgroundColor: "white" }}
          onChange={(e) => setSpouseId(Number(e.target.value))}
        />
        <Button type="submit">{isEditing ? "Modifier" : "Ajouter"}</Button>
      </form>

      <h2>Liste des membres</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prénom</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Date de naissance</TableCell>
              <TableCell>Date de décès</TableCell>
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
                <TableCell>{member.deathDate}</TableCell>
                <TableCell>{member.fatherId}</TableCell>
                <TableCell>{member.motherId}</TableCell>
                <TableCell>{member.spouseId}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(member)}>Modifier</Button>
                  <Button onClick={() => handleDelete(member.id)}>
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
