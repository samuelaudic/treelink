"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.createMember = exports.getMemberById = exports.getAllMembers = void 0;
const memberService = __importStar(require("../services/memberService"));
// Récupérer tous les membres
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield memberService.getAllMembers();
        res.json(members);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "Erreur lors de la récupération des membres" });
    }
});
exports.getAllMembers = getAllMembers;
// Récupérer un membre par son id
const getMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const member = yield memberService.getMemberById(Number(id));
        if (member) {
            res.json(member);
        }
        else {
            res.status(404).json({ error: "Membre non trouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du membre" });
    }
});
exports.getMemberById = getMemberById;
// Créer un nouveau membre
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberData = req.body;
    try {
        const newMember = yield memberService.createMember(memberData);
        res.status(201).json(newMember);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création du membre" });
    }
});
exports.createMember = createMember;
// Mettre à jour un membre
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const memberData = req.body;
    try {
        const updatedMember = yield memberService.updateMember(Number(id), memberData);
        res.json(updatedMember);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du membre" });
    }
});
exports.updateMember = updateMember;
// Supprimer un membre
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield memberService.deleteMember(Number(id));
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression du membre" });
    }
});
exports.deleteMember = deleteMember;
