import { Member } from "@/interfaces/Member";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./datatable";

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  const members: Member[] = [];
  for (let i = 0; i < 50; i++) {
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={members} />
    </div>
  );
};
