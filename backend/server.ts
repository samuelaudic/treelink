import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
import memberRouter from "./routes/memberRoutes";
app.use("/api/members", memberRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${PORT}`);
});
