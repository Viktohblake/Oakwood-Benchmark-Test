import express from "express";
import { db } from "../db/database";

const router = express.Router();

// Get all clients
router.get("/", (req, res) => {
  const query = `SELECT * FROM clients`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    res.json(rows);
  });
});

export default router;
