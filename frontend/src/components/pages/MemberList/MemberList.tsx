import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

  useEffect(() => {
    fetch("http://localhost:3000/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  return (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemberList;
