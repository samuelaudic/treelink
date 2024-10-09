import { Request, Response } from "express"; // Import des types depuis Express
import * as memberService from "../services/memberService";

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
  const { id } = req.params;
  try {
    const member = await memberService.getMemberById(Number(id));
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ error: "Membre non trouvé" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération du membre" });
  }
};

// Créer un nouveau membre
export const createMember = async (req: Request, res: Response) => {
  const memberData = req.body;
  try {
    const newMember = await memberService.createMember(memberData);
    res.status(201).json(newMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du membre" });
  }
};

// Mettre à jour un membre
export const updateMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  const memberData = req.body;
  try {
    const updatedMember = await memberService.updateMember(
      Number(id),
      memberData
    );
    res.json(updatedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du membre" });
  }
};

// Supprimer un membre
export const deleteMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await memberService.deleteMember(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du membre" });
  }
};
