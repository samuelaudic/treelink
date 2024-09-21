const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Récupérer tous les membres
app.get("/api/members", async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      include: {
        father: true,
        mother: true,
        spouse: true,
        children: true,
        childrenMother: true,
      },
    });
    res.json(members);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des membres" });
  }
});

// Récupérer un membre par son id avec ses relations
app.get("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const member = await prisma.member.findUnique({
      where: { id: parseInt(id) },
      include: {
        father: true,
        mother: true,
        spouse: true,
        children: true,
        childrenMother: true,
      },
    });
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ error: "Member not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération du membre" });
  }
});

// Créer un membre avec des relations
app.post("/api/members", async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    birthDate,
    deathDate,
    fatherId,
    motherId,
    spouseId,
  } = req.body;
  try {
    const newMember = await prisma.member.create({
      data: {
        firstName,
        lastName,
        gender,
        birthDate,
        deathDate,
        fatherId,
        motherId,
        spouseId,
      },
    });
    res.status(201).json(newMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du membre" });
  }
});

// Mettre à jour un membre
app.put("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    gender,
    birthDate,
    deathDate,
    fatherId,
    motherId,
    spouseId,
  } = req.body;
  try {
    const updatedMember = await prisma.member.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        gender,
        birthDate,
        deathDate,
        fatherId,
        motherId,
        spouseId,
      },
    });
    res.json(updatedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du membre" });
  }
});

// Supprimer un membre
app.delete("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.member.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du membre" });
  }
});

app.listen(3000, () => {
  console.log("Serveur backend en écoute sur http://localhost:3000");
});
