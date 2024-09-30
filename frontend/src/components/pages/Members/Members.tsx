import { useEffect, useState } from "react";
import { Member } from "../../../interfaces/Member";
import { getMembers, saveMember } from "../../../services/MemberService";
import MemberList from "./MemberList/MemberList";
import MemberModal from "./MemberModal/MemberModal";

export const Members = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    };
    fetchData();
  }, []);

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleSaveMember = async (member: Member) => {
    const savedMember = await saveMember(member);
    if (member.id) {
      setMembers(
        members.map((m) => (m.id === savedMember.id ? savedMember : m))
      );
    } else {
      setMembers([...members, savedMember]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Membres</h1>
      <button onClick={handleAddMember}>+ Ajouter un membre</button>
      <MemberList members={members} onEdit={handleEditMember} />
      <MemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMember}
      />
    </div>
  );
};
