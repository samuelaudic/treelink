import { Member, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Récupérer tous les membres
export const getAllMembers = async (): Promise<Member[]> => {
  try {
    return await prisma.member.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        deathDate: true,
        fatherId: true,
        motherId: true,
        spouseId: true,
        gender: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
    throw new Error("Erreur lors de la récupération des membres");
  }
};

// Récupérer un membre par ID
export const getMemberById = async (id: number): Promise<Member | null> => {
  try {
    return await prisma.member.findUnique({
      where: { id: id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        deathDate: true,
        fatherId: true,
        motherId: true,
        spouseId: true,
        gender: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du membre avec l'ID ${id}:`,
      error
    );
    throw new Error(`Erreur lors de la récupération du membre avec l'ID ${id}`);
  }
};

// Créer un nouveau membre
export const createMember = async (
  memberData: Prisma.MemberCreateInput
): Promise<Member> => {
  return await prisma.member.create({
    data: {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      gender: memberData.gender,
      birthDate: memberData.birthDate,
      deathDate: memberData.deathDate,
      father: memberData.father,
      mother: memberData.mother,
      spouse: memberData.spouse,
      createdAt: memberData.createdAt,
    },
  });
};

// Mettre à jour un membre existant
export const updateMember = async (
  id: number,
  memberData: Prisma.MemberUpdateInput
): Promise<Member> => {
  try {
    console.log(memberData);
    return await prisma.member.update({
      where: { id: id },
      data: {
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        gender: memberData.gender,
        birthDate: memberData.birthDate,
        deathDate: memberData.deathDate,
        father: memberData.father,
        mother: memberData.mother,
        spouse: memberData.spouse,
        createdAt: memberData.createdAt,
      },
    });
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour du membre avec l'ID ${id}:`,
      error
    );
    throw new Error(`Erreur lors de la mise à jour du membre avec l'ID ${id}`);
  }
};

// Supprimer un membre
export const deleteMember = async (id: number): Promise<Member> => {
  try {
    return await prisma.member.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error(
      `Erreur lors de la suppression du membre avec l'ID ${id}:`,
      error
    );
    throw new Error(`Erreur lors de la suppression du membre avec l'ID ${id}`);
  }
};
