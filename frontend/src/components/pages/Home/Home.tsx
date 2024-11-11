import Container from "@/components/layout/Container/Container";
import { LayoutContent } from "@/components/layout/LayoutContent/LayoutContent";

export const Home = () => {
  return (
    <>
      <LayoutContent>
        <Container>
          <h1 className="text-3xl font-bold text-foreground py-4">Accueil</h1>
          <p>Bienvenue sur TreeLink</p>
        </Container>
      </LayoutContent>
    </>
  );
};
