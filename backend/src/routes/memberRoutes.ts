import express from "express";
import * as memberController from "../controllers/memberController";

const router = express.Router();

// Routes pour les membres
router.get("/", memberController.getAllMembers); // GET /api/members
router.get("/:id", memberController.getMemberById); // GET /api/members/:id
router.post("/", memberController.createMember); // POST /api/members
router.put("/:id", memberController.updateMember); // PUT /api/members/:id
router.delete("/:id", memberController.deleteMember); // DELETE /api/members/:id

export default router;
