const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Récupérer tous les membres
exports.getAllMembers = async () => {
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
exports.getMemberById = async (id) => {
  return await prisma.member.findUnique({
    where: { id: parseInt(id) },
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
exports.createMember = async (memberData) => {
  return await prisma.member.create({
    data: memberData,
  });
};

// Mettre à jour un membre existant
exports.updateMember = async (id, memberData) => {
  return await prisma.member.update({
    where: { id: parseInt(id) },
    data: memberData,
  });
};

// Supprimer un membre
exports.deleteMember = async (id) => {
  return await prisma.member.delete({
    where: { id: parseInt(id) },
  });
};
