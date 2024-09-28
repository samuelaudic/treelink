export type MemberType = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  deathDate: Date | null;
  father: MemberType | null;
  fatherId: number | null;
  mother: MemberType | null;
  motherId: number | null;
  spouse: MemberType | null;
  spouseId: number | null;
  createdAt: Date;
};
