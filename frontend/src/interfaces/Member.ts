export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date | null;
  deathDate: Date | null;
  father: Member | null;
  fatherId: number | null;
  mother: Member | null;
  motherId: number | null;
  spouse: Member | null;
  spouseId: number | null;
  createdAt: Date;
}
