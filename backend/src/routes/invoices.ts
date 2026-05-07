import express from "express";
import { db } from "../db/database";

const router = express.Router();

/*
  CREATE INVOICE
*/

router.post("/", (req, res) => {
  const { client_id, amount, tax_rate } = req.body;

  // Basic validation
  if (!client_id || amount == null || tax_rate == null) {
    return res.status(400).json({
      error: "client_id, amount, and tax_rate are required fields`",
    });
  }

  if (amount < 0) {
    return res.status(400).json({
      error: "Amount cannot be negative",
    });
  }

  if (tax_rate < 0 || tax_rate > 100) {
    return res.status(400).json({
      error: "Tax rate cannot be negative or greater than 100",
    });
  }

  const query = `
    INSERT INTO invoices (client_id, amount, tax_rate)
    VALUES (?, ?, ?)
  `;

  db.run(query, [client_id, amount, tax_rate], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.status(201).json({
        message: "Invoice created successfully",
        invoice_id: this.lastID
    });

  });
});

export default router;
