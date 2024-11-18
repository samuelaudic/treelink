import express from "express";
import memberRoutes from "./src/routes/memberRoutes";

const app = express();

app.use(express.json());
app.use("/api/members", memberRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${PORT}`);
});
