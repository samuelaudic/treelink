// MembersList.ts

import { MemberType } from "../../../../interfaces/Member";

const MembersData: MemberType[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    birthDate: new Date("1980-01-01"),
    deathDate: null,
    father: null,
    fatherId: null,
    mother: null,
    motherId: null,
    spouse: null, // Sera assigné plus tard
    spouseId: 2,
    createdAt: new Date(),
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    gender: "Female",
    birthDate: new Date("1982-02-02"),
    deathDate: null,
    father: null,
    fatherId: null,
    mother: null,
    motherId: null,
    spouse: null, // Sera assigné plus tard
    spouseId: 1,
    createdAt: new Date(),
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Doe",
    gender: "Male",
    birthDate: new Date("2005-03-03"),
    deathDate: null,
    father: null, // Sera assigné plus tard
    fatherId: 1,
    mother: null, // Sera assigné plus tard
    motherId: 2,
    spouse: null,
    spouseId: null,
    createdAt: new Date(),
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Doe",
    gender: "Female",
    birthDate: new Date("2008-04-04"),
    deathDate: null,
    father: null, // Sera assigné plus tard
    fatherId: 1,
    mother: null, // Sera assigné plus tard
    motherId: 2,
    spouse: null,
    spouseId: null,
    createdAt: new Date(),
  },
];

// Assigner les relations
MembersData.forEach((member) => {
  member.spouse = MembersData.find((m) => m.id === member.spouseId) || null;
  member.father = MembersData.find((m) => m.id === member.fatherId) || null;
  member.mother = MembersData.find((m) => m.id === member.motherId) || null;
});

export default MembersData;
