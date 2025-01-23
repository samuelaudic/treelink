import Container from "@/components/layout/Container/Container";
import { LayoutContent } from "@/components/layout/LayoutContent/LayoutContent";
import { Member } from "@/interfaces/Member";
import { deleteMember, getMembers } from "@/services/MemberService";
import { useEffect, useState } from "react";
import { FormMember } from "./FormMember/FormMember";
import { getColumns } from "./columns";
import { DataTable } from "./dataTable";
import { useToast } from "@/hooks/use-toast";

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const { toast } = useToast();

  const handleEditMember = async (id: number) => {
    const member = members.find((m) => m.id === id) || null;
    setMemberToEdit(member);
  };

  const loadMembers = async () => {
    setIsLoading(true);
    try {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Erreur lors du chargement des membres:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const refreshMembers = async () => {
    try {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des membres:", error);
    }
  };

  const handleDeleteMember = async (id: number) => {
    try {
      await deleteMember(id);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
      toast({
        title: "Membre enregistré avec succès !",
        type: "foreground",
      });
    } catch (error) {
      toast({
        title: "Erreur lors de l'enregistrement du membre.",
        type: "foreground",
        variant: "destructive",
      });
    }
  };

  const columns = getColumns(handleDeleteMember, handleEditMember);

  return (
    <LayoutContent>
      <Container>
        <h1 className="text-3xl font-bold text-foreground py-4">Membres</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {isLoading ? (
              <Spinner />
            ) : (
              <DataTable columns={columns} data={members} />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground pb-4">
              Ajouter un membre
            </h2>
            <FormMember
              refreshMembers={refreshMembers}
              memberToEdit={memberToEdit}
              onEditComplete={() => setMemberToEdit(null)}
            />
          </div>
        </div>
      </Container>
    </LayoutContent>
  );
};
