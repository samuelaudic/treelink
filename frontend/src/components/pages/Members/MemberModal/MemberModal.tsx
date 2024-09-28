import React from "react";
import { MemberType } from "../../../../types/MemberType";
import MemberForm from "./MemberForm/MemberForm";

interface MemberModalProps {
  member: MemberType | null;
  isOpen: boolean;
  onSave: (member: MemberType) => void;
  onClose: () => void;
}

const MemberModal: React.FC<MemberModalProps> = ({
  member,
  isOpen,
  onSave,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="modal-overlay" />
      <div className="modal-content">
        <MemberForm member={member} onSave={onSave} onClose={onClose} />
      </div>
    </div>
  );
};

export default MemberModal;
