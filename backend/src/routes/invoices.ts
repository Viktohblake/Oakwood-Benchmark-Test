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

/*
  GET INVOICE SUMMARY
*/
router.get("/summary", (req, res) => {
  const query = `
    SELECT
      invoices.id,
      clients.name AS client_name,
      invoices.amount,
      invoices.tax_rate,
      ROUND(invoices.amount * (invoices.tax_rate / 100), 2) AS tax_owed,
      invoices.status,
      invoices.created_at
    FROM invoices
    INNER JOIN clients ON invoices.client_id = clients.id
    ORDER BY invoices.created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    res.json(rows);
  });
});

/*
 MARK AS PAID
*/
router.post("/:id/pay", (req, res) => {
  const invoiceId = req.params.id;

  const query = `
    UPDATE invoices
    SET status = 'Paid'
    WHERE id = ?
  `;

  db.run(query, [invoiceId], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        error: "Invoice not found",
      });
    }

    res.json({
        message: "Invoice marked as paid successfully"
    });
  });
});


export default router;
