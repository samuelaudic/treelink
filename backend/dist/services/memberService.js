"use strict";
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"],
});
// Récupérer tous les membres
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.findMany({
        orderBy: { createdAt: "desc" },
    });
});
exports.getAllMembers = getAllMembers;
// Récupérer un membre par ID
const getMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.findUnique({
        where: { id },
    });
});
exports.getMemberById = getMemberById;
// Créer un nouveau membre
const createMember = (memberData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.create({
        data: memberData,
    });
});
exports.createMember = createMember;
// Mettre à jour un membre existant
const updateMember = (id, memberData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.update({
        where: { id },
        data: memberData,
    });
});
exports.updateMember = updateMember;
// Supprimer un membre
const deleteMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.delete({
        where: { id },
    });
});
exports.deleteMember = deleteMember;
