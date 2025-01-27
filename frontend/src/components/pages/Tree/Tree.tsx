import Container from "@/components/layout/Container/Container";
import FamilyTree from "./FamilyTree/FamilyTree";
import { getMembers } from "@/services/MemberService";
import { useEffect, useState } from "react";
import { Member } from "@/interfaces/Member";

export default function Tree() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    };

    fetchMembers();
  }, []);

  return (
    <>
      <Container>
        <FamilyTree members={members} />
      </Container>
    </>
  );
}
