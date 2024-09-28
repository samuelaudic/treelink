import { useEffect, useState } from "react";
import { MemberType } from "../../../../../types/MemberType";

interface MemberFormProps {
  member: MemberType | null;
  onSave: (member: MemberType) => void;
  onClose: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState<MemberType>({
    id: 0,
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: new Date(),
    fatherId: null,
    motherId: null,
    spouseId: null,
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
        fatherId: null,
        motherId: null,
        spouseId: null,
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
      <button type="submit">Enregistrer</button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
};

export default MemberForm;
