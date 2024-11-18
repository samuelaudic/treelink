import { Request, Response } from "express";
import { z } from "zod";
import * as memberService from "../services/memberService";

const memberSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(["M", "F"]),
  birthDate: z.date().optional(),
  deathDate: z.date().optional(),
  fatherId: z.number().optional(),
  motherId: z.number().optional(),
  spouseId: z.number().optional(),
});

// Récupérer tous les membres
export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await memberService.getAllMembers();
    res.json(members);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des membres" });
  }
};

// Récupérer un membre par son id
export const getMemberById = async (req: Request, res: Response) => {
  try {
    const id = z.string().regex(/^\d+$/).transform(Number).parse(req.params.id);
    const member = await memberService.getMemberById(id);
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ error: "Membre non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: "ID invalide", details: error });
  }
};

// Créer un nouveau membre
export const createMember = async (req: Request, res: Response) => {
  try {
    const memberData = memberSchema.parse(req.body);
    const newMember = await memberService.createMember(memberData);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error: "Données invalides", details: error });
  }
};

// Mettre à jour un membre
export const updateMember = async (req: Request, res: Response) => {
  try {
    const id = z.string().regex(/^\d+$/).transform(Number).parse(req.params.id);
    const memberData = memberSchema.partial().parse(req.body);
    const updatedMember = await memberService.updateMember(id, memberData);
    res.json(updatedMember);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Données invalides ou ID incorrect", details: error });
  }
};

// Supprimer un membre
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const id = z.string().regex(/^\d+$/).transform(Number).parse(req.params.id);
    await memberService.deleteMember(id);
    res.status(204).send();
  } catch (error) {
    res
      .status(400)
      .json({ error: "ID invalide ou suppression impossible", details: error });
  }
};
