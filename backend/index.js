const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/api/members", async (req, res) => {
  const members = await prisma.member.findMany();
  res.json(members);
});

app.post("/api/members", async (req, res) => {
  const { firstName, lastName, gender } = req.body;
  const newMember = await prisma.member.create({
    data: { firstName, lastName, gender },
  });
  res.status(201).json(newMember);
});

app.listen(3000, () => {
  console.log("Serveur backend en écoute sur http://localhost:3000");
});
