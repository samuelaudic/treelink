import { Member, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Récupérer tous les membres
export const getAllMembers = async (): Promise<Member[]> => {
  return await prisma.member.findMany({
    include: {
      father: true,
      mother: true,
      spouse: true,
      children: true,
      childrenMother: true,
    },
  });
};

// Récupérer un membre par ID
export const getMemberById = async (id: number): Promise<Member | null> => {
  return await prisma.member.findUnique({
    where: { id: id },
    include: {
      father: true,
      mother: true,
      spouse: true,
      children: true,
      childrenMother: true,
    },
  });
};

// Créer un nouveau membre
export const createMember = async (
  memberData: Prisma.MemberCreateInput
): Promise<Member> => {
  return await prisma.member.create({
    data: memberData,
  });
};

// Mettre à jour un membre existant
export const updateMember = async (
  id: number,
  memberData: Prisma.MemberUpdateInput
): Promise<Member> => {
  return await prisma.member.update({
    where: { id: id },
    data: memberData,
  });
};

// Supprimer un membre
export const deleteMember = async (id: number): Promise<Member> => {
  return await prisma.member.delete({
    where: { id: id },
  });
};
