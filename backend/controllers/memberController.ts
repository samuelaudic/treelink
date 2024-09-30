const memberService = require("../services/memberService");

// Récupérer tous les membres
exports.getAllMembers = async (req, res) => {
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
exports.getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await memberService.getMemberById(id);
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
exports.createMember = async (req, res) => {
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
exports.updateMember = async (req, res) => {
  const { id } = req.params;
  const memberData = req.body;
  try {
    const updatedMember = await memberService.updateMember(id, memberData);
    res.json(updatedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du membre" });
  }
};

// Supprimer un membre
exports.deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    await memberService.deleteMember(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du membre" });
  }
};
