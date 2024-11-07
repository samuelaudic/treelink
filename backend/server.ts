const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

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
