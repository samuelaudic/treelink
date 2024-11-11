import Container from "@/components/layout/Container/Container";
import { LayoutContent } from "@/components/layout/LayoutContent/LayoutContent";
import { Member } from "@/interfaces/Member";
import { getMembers } from "@/services/MemberService";
import { useEffect, useState } from "react";
import { AddMember } from "./AddMember/AddMember";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

export const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const loadMembers = async () => {
    try {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Erreur lors du chargement des membres:", error);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <LayoutContent>
      <Container>
        <h1 className="text-3xl font-bold text-foreground py-4">Membres</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <DataTable columns={columns} data={members} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground pb-4">
              Ajouter un membre
            </h2>
            <AddMember />
          </div>
        </div>
      </Container>
    </LayoutContent>
  );
};
