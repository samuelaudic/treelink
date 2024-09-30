import { Member } from "../../../../interfaces/Member";
import MemberForm from "./MemberForm/MemberForm";

interface MemberModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Member) => void;
}

const MemberModal: React.FC<MemberModalProps> = ({
  member,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <MemberForm member={member} onClose={onClose} onSave={onSave} />
      </div>
    </div>
  );
};

export default MemberModal;
