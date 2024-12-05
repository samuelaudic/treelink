import Container from "@/components/layout/Container/Container";
import { LayoutContent } from "@/components/layout/LayoutContent/LayoutContent";
import { TitleLabel } from "@/components/text/TitleLabel";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Member } from "@/interfaces/Member";
import { getMembers } from "@/services/MemberService";
import { PersonStandingIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const Tree = () => {
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
      <LayoutContent>
        <Container>
          <div className="pt-6">
            {members.map((member) => (
              <Sheet key={member.id}>
                <SheetTrigger
                  asChild
                  style={{ cursor: "pointer", width: "200px" }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <div className="flex justify-left items-center gap-1">
                          <PersonStandingIcon
                            style={
                              member.gender == "M"
                                ? { color: "cyan" }
                                : { color: "pink" }
                            }
                          />
                          {member.firstName} {member.lastName}
                        </div>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </SheetTrigger>
                <SheetContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <p className="text-xl font-semibold tracking-tight text-foreground">
                          {member.firstName} {member.lastName}
                        </p>
                      </CardTitle>
                    </CardHeader>
                    <CardDescription>
                      <Container>
                        <div className="flex flex-col gap-2 mb-6">
                          <TitleLabel
                            title="Prénom"
                            titleSize="lg"
                            description={member.firstName}
                          />
                          <TitleLabel
                            title="Nom"
                            titleSize="lg"
                            description={member.lastName}
                          />
                          <TitleLabel
                            title="Genre"
                            titleSize="lg"
                            description={member.gender}
                          />
                          <TitleLabel
                            title="Date de naissance"
                            titleSize="lg"
                            description={
                              member.birthDate?.toLocaleDateString() || "N/A"
                            }
                          />
                          {member.deathDate && (
                            <TitleLabel
                              title="Date de décès"
                              titleSize="lg"
                              description={
                                member.deathDate?.toLocaleDateString() || "N/A"
                              }
                            />
                          )}
                          <TitleLabel
                            title="Père"
                            titleSize="lg"
                            description={
                              member.father
                                ? `${member.father.firstName} ${member.father.lastName}`
                                : "N/A"
                            }
                          />
                          <TitleLabel
                            title="Mère"
                            titleSize="lg"
                            description={
                              member.mother
                                ? `${member.mother.firstName} ${member.mother.lastName}`
                                : "N/A"
                            }
                          />
                          <TitleLabel
                            title="Conjoint"
                            titleSize="lg"
                            description={
                              member.spouse
                                ? `${member.spouse.firstName} ${member.spouse.lastName}`
                                : "N/A"
                            }
                          />
                        </div>
                      </Container>
                    </CardDescription>
                  </Card>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </Container>
      </LayoutContent>
    </>
  );
};
