import express from "express";
import cors from "cors";
import "./db/database";
import "./db/seed";
import clientsRoutes from "./routes/clients";
import invoicesRoutes from "./routes/invoices";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientsRoutes);
app.use("/api/invoices", invoicesRoutes);

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});