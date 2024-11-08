import { LayoutContent } from "@/components/layout/LayoutContent/LayoutContent";
import { Button } from "@/components/ui/button";
import { Member } from "@/interfaces/Member";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  const members: Member[] = [];
  for (let i = 0; i < 15; i++) {
    members.push({
      id: i,
      firstName: `First Name ${i}`,
      lastName: `Last Name ${i}`,
      gender: "M",
      birthDate: new Date("2001-11-02"),
      deathDate: null,
      father: null,
      fatherId: null,
      mother: null,
      motherId: null,
      spouse: null,
      spouseId: null,
      createdAt: new Date("2021-08-17T00:00:00.000Z"),
    });
  }
  return members;
}

export const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    getData().then((fetchedMembers) => {
      setMembers(fetchedMembers);
    });
  }, []);

  return (
    <>
      <LayoutContent>
        <div className="container w-full">
          <h1 className="text-3xl font-bold text-foreground py-4">Members</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <DataTable columns={columns} data={members} />
            </div>
            <div>
              <Button variant="default" className="mb-4">
                Add Member
              </Button>
            </div>
          </div>
        </div>
      </LayoutContent>
    </>
  );
};
