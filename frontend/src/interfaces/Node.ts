interface Node {
  id: string;
  label: string;
  type: string;
  data: {
    label: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string | null;
    deathDate: string | null;
    father: {
      firstName: string;
      lastName: string;
    };
    mother: {
      firstName: string;
      lastName: string;
    };
    spouse: {
      firstName: string;
      lastName: string;
    };
  };
  position: { x: number; y: number };
}

export type { Node };
