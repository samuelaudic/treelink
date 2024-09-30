import express from "express";
import * as memberController from "../controllers/memberController";

const router = express.Router();

// Routes pour les membres
router.get("/", memberController.getAllMembers); // Récupérer tous les membres
router.get("/:id", memberController.getMemberById); // Récupérer un membre par ID
router.post("/", memberController.createMember); // Créer un nouveau membre
router.put("/:id", memberController.updateMember); // Mettre à jour un membre existant
router.delete("/:id", memberController.deleteMember); // Supprimer un membre
