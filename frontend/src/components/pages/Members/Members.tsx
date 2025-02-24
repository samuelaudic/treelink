import Container from "@/components/layout/Container/Container";
import { Member } from "@/interfaces/Member";
import { useMembers, useDeleteMember } from "@/hooks/useMembers";
import { FormMember } from "./FormMember/FormMember";
import { getColumns } from "./columns";
import { DataTable } from "./dataTable";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Members() {
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const { toast } = useToast();

  const { data: members = [], isLoading, refetch } = useMembers();

  const deleteMemberMutation = useDeleteMember();

  const handleEditMember = (id: number) => {
    const member = members.find((m) => m.id === id) || null;
    setMemberToEdit(member);
  };

  const refreshMembers = () => {
    refetch();
  };

  const handleDeleteMember = (id: number) => {
    deleteMemberMutation.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Membre supprimé avec succès !",
          type: "foreground",
        });
      },
      onError: () => {
        toast({
          title: "Erreur lors de la suppression du membre.",
          type: "foreground",
          variant: "destructive",
        });
      },
    });
  };

  const columns = getColumns(handleDeleteMember, handleEditMember);

  return (
    <Container>
      <h1 className="text-3xl font-bold text-foreground py-4">Membres</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {isLoading ? (
            <Spinner />
          ) : (
            <DataTable columns={columns} data={members} />
          )}
        </div>
        <div className="col-span-1">
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
  );
}
