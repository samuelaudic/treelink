export type MemberType = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate?: string;
  deathDate?: string;
  father: MemberType | null;
  fatherId?: number;
  mother: MemberType | null;
  motherId?: number;
  spouse: MemberType | null;
  spouseId?: number;
};
