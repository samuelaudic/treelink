import Container from "@/components/layout/Container/Container";
import FamilyTree from "./FamilyTree/FamilyTree";
import { useMembers } from "@/hooks/useMembers";

export default function Tree() {
  const { data: members, isLoading, error } = useMembers();

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Une erreur est survenue lors du chargement des membres.</p>;
  }

  if (!members) {
    return <p>Aucun membre trouvé.</p>;
  }

  return (
    <>
      <Container>
        <FamilyTree members={members} />
      </Container>
    </>
  );
}
