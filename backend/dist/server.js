"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Routes
const memberRoutes_1 = __importDefault(require("./routes/memberRoutes"));
app.use("/api/members", memberRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur backend en écoute sur http://localhost:${PORT}`);
});
