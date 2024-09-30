import { useEffect, useState } from "react";
import { Member } from "../../../../../interfaces/Member";

interface MemberFormProps {
  member: Member | null;
  onClose: () => void;
  onSave: (member: Member) => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onClose, onSave }) => {
  const [formData, setFormData] = useState<Member>({
    id: 0,
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: new Date(),
    deathDate: new Date(),
    father: null,
    fatherId: 0,
    mother: null,
    motherId: 0,
    spouse: null,
    spouseId: 0,
    createdAt: new Date(),
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
      setFormData({
        id: 0,
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: new Date(),
        deathDate: new Date(),
        father: null,
        fatherId: 0,
        mother: null,
        motherId: 0,
        spouse: null,
        spouseId: 0,
        createdAt: new Date(),
      });
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Prénom"
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Nom"
      />
      <input
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        placeholder="Genre"
      />
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate.toISOString().split("T")[0]}
        onChange={handleChange}
        placeholder="Date de naissance"
      />
      <input
        type="date"
        name="deathDate"
        value={
          formData.deathDate
            ? formData.deathDate.toISOString().split("T")[0]
            : ""
        }
        onChange={handleChange}
        placeholder="Date de décès"
      />
      <button type="submit">Enregistrer</button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
};

export default MemberForm;
