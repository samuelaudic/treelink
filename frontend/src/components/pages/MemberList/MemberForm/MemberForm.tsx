import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

type MemberType = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate?: string;
  deathDate?: string;
  fatherId?: number;
  motherId?: number;
  spouseId?: number;
};

type MemberFormProps = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (memberData: Omit<MemberType, "id">) => void;
  initialMemberData: MemberType | null;
  members: MemberType[];
};

const MemberForm: React.FC<MemberFormProps> = ({
  open,
  handleClose,
  handleSubmit,
  initialMemberData,
  members,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [fatherId, setFatherId] = useState<number | null>(null);
  const [motherId, setMotherId] = useState<number | null>(null);
  const [spouseId, setSpouseId] = useState<number | null>(null);

  useEffect(() => {
    if (initialMemberData) {
      // Modification
      setFirstName(initialMemberData.firstName);
      setLastName(initialMemberData.lastName);
      setGender(initialMemberData.gender);
      setBirthDate(initialMemberData.birthDate || "");
      setDeathDate(initialMemberData.deathDate || "");
      setFatherId(initialMemberData.fatherId || null);
      setMotherId(initialMemberData.motherId || null);
      setSpouseId(initialMemberData.spouseId || null);
    } else {
      // Ajout
      setFirstName("");
      setLastName("");
      setGender("");
      setBirthDate("");
      setDeathDate("");
      setFatherId(null);
      setMotherId(null);
      setSpouseId(null);
    }
  }, [initialMemberData]);

  const handleFormSubmit = () => {
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
    handleSubmit(memberData);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {initialMemberData ? "Modifier" : "Ajouter"} un membre
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Prénom"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Nom"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Genre"
          fullWidth
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        {/* Champs de date pour la naissance et la mort */}
        <TextField
          margin="dense"
          label="Date de naissance"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true, // S'assurer que le label n'entre pas en conflit avec le placeholder
          }}
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Date de décès"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true, // S'assurer que le label n'entre pas en conflit avec le placeholder
          }}
          value={deathDate}
          onChange={(e) => setDeathDate(e.target.value)}
        />
        {/* Sélection du père, de la mère et du conjoint */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Père</InputLabel>
          <Select
            value={fatherId || ""}
            onChange={(e) => setFatherId(Number(e.target.value))}
          >
            <MenuItem value="">Aucun</MenuItem>
            {members
              .filter((member) => member.id !== initialMemberData?.id)
              .map((member) => (
                <MenuItem key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Mère</InputLabel>
          <Select
            value={motherId || ""}
            onChange={(e) => setMotherId(Number(e.target.value))}
          >
            <MenuItem value="">Aucun</MenuItem>
            {members
              .filter((member) => member.id !== initialMemberData?.id)
              .map((member) => (
                <MenuItem key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Conjoint</InputLabel>
          <Select
            value={spouseId || ""}
            onChange={(e) => setSpouseId(Number(e.target.value))}
          >
            <MenuItem value="">Aucun</MenuItem>
            {members
              .filter((member) => member.id !== initialMemberData?.id)
              .map((member) => (
                <MenuItem key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleFormSubmit} variant="contained" color="success">
          {initialMemberData ? "Mettre à jour" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberForm;
