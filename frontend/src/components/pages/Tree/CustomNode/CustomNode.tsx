import { TitleLabel } from "@/components/text/TitleLabel";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "lucide-react";
import { Handle, Position } from "reactflow";

interface CustomNodeData {
  label: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  deathDate: Date | null;
  gender: string;
  father?: {
    firstName: string;
    lastName: string;
  };
  mother?: {
    firstName: string;
    lastName: string;
  };
  spouse?: {
    firstName: string;
    lastName: string;
  };
}

interface CustomNodeProps {
  data: CustomNodeData;
}

export const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  console.log(data);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          style={{
            padding: "10px",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#000",
            textAlign: "center",
            width: "150px",
          }}
        >
          <Handle
            type="source"
            position={Position.Top}
            style={{ background: "#fff" }}
          />
          <div>
            <strong>{data.label}</strong>
          </div>
          <Handle
            type="source"
            position={Position.Bottom}
            style={{ background: "#fff" }}
          />
        </div>
      </SheetTrigger>
      <SheetContent>
        <Card>
          <CardHeader>
            <CardTitle>
              <p className="text-xl font-semibold tracking-tight text-foreground">
                {data.firstName} {data.lastName}
              </p>
            </CardTitle>
          </CardHeader>
          <CardDescription>
            <Container>
              <div className="flex flex-col gap-2 mb-6">
                <TitleLabel
                  title="Prénom"
                  titleSize="lg"
                  description={data.firstName}
                />
                <TitleLabel
                  title="Nom"
                  titleSize="lg"
                  description={data.lastName}
                />
                <TitleLabel
                  title="Genre"
                  titleSize="lg"
                  description={data.gender}
                />
                <TitleLabel
                  title="Date de naissance"
                  titleSize="lg"
                  description={
                    data.birthDate
                      ? new Date(data.birthDate).toLocaleDateString()
                      : "N/A"
                  }
                />
                {data.deathDate && (
                  <TitleLabel
                    title="Date de décès"
                    titleSize="lg"
                    description={
                      data.deathDate
                        ? new Date(data.deathDate).toLocaleDateString()
                        : "N/A"
                    }
                  />
                )}
                <TitleLabel
                  title="Père"
                  titleSize="lg"
                  description={
                    data.father
                      ? `${data.father.firstName} ${data.father.lastName}`
                      : "N/A"
                  }
                />
                <TitleLabel
                  title="Mère"
                  titleSize="lg"
                  description={
                    data.mother
                      ? `${data.mother.firstName} ${data.mother.lastName}`
                      : "N/A"
                  }
                />
                <TitleLabel
                  title="Conjoint"
                  titleSize="lg"
                  description={
                    data.spouse
                      ? `${data.spouse.firstName} ${data.spouse.lastName}`
                      : "N/A"
                  }
                />
              </div>
            </Container>
          </CardDescription>
        </Card>
      </SheetContent>
    </Sheet>
  );
};
