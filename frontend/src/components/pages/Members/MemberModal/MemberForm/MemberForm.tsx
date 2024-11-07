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
    gender: "M",
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

  // Fonction utilitaire pour formater la date en 'YYYY-MM-DD'
  const formatDateForInput = (date: Date | null | undefined): string => {
    return date instanceof Date && !isNaN(date.getTime())
      ? date.toISOString().split("T")[0]
      : "";
  };

  useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
      setFormData({
        id: 0,
        firstName: "",
        lastName: "",
        gender: "M",
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "birthDate" || name === "deathDate") {
      // Gestion des dates
      setFormData({
        ...formData,
        [name]: new Date(value),
      });
    } else {
      // Pour les autres champs
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
      <input
        type="date"
        name="birthDate"
        value={formatDateForInput(formData.birthDate)}
        onChange={handleChange}
        placeholder="Date de naissance"
      />
      <input
        type="date"
        name="deathDate"
        value={formatDateForInput(formData.deathDate)}
        onChange={handleChange}
        placeholder="Date de décès"
        defaultValue={formatDateForInput(new Date())}
      />
      <button type="submit">Enregistrer</button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
};

export default MemberForm;
