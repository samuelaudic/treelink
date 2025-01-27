import Container from "@/components/layout/Container/Container";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Search, TreeDeciduousIcon, Users } from "lucide-react";

export default function Home() {
  const tiles = [
    {
      title: "Membres",
      description: "Voir tous les membres de votre famille.",
      icon: <Users size={24} />,
      url: "/members",
      disabled: false,
    },
    {
      title: "Arbre généalogique",
      description: "Explorez votre arbre familial.",
      icon: <TreeDeciduousIcon size={24} />,
      url: "/tree",
      disabled: false,
    },
    {
      title: "Statistiques",
      description: "Découvrez des statistiques familiales.",
      icon: <BarChart size={24} />,
      url: "/stats",
      disabled: true,
    },
    {
      title: "Rechercher",
      description: "Trouvez un membre rapidement.",
      icon: <Search size={24} />,
      url: "/search",
      disabled: true,
    },
  ];

  return (
    <>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {tiles.map((tile, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              style={{
                opacity: tile.disabled ? 0.5 : 1,
                cursor: tile.disabled ? "not-allowed" : "pointer",
              }}
            >
              <a href={tile.url}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {tile.icon}
                    <CardTitle>{tile.title}</CardTitle>
                  </div>
                  <CardDescription>{tile.description}</CardDescription>
                </CardHeader>
              </a>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
