const express = require("express");
const memberController = require("../controllers/memberController");
const router = express.Router();

// Routes pour les membres
router.get("/", memberController.getAllMembers);
router.get("/:id", memberController.getMemberById);
router.post("/", memberController.createMember);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

module.exports = router;
