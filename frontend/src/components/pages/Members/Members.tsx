import { useState } from "react";
import { MemberType } from "../../../types/MemberType";
import MemberList from "./MemberList/MemberList";
import MemberForm from "./MemberModal/MemberForm/MemberForm";

export const Members = () => {
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsFormOpen(true);
  };

  const handleEditMember = (member: MemberType) => {
    setSelectedMember(member);
    setIsFormOpen(true);
  };

  return (
    <div>
      <h1>Members</h1>
      <p>Here is a list of all members</p>

      {isFormOpen && (
        <MemberForm
          member={selectedMember}
          onClose={() => setIsFormOpen(false)}
          onSave={(member) => {
            console.log(member);
            setIsFormOpen(false);
          }}
        />
      )}

      <MemberList />
    </div>
  );
};
