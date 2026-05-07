import { db } from "./database";

const seedClients = () => {
  db.get("SELECT COUNT(*) as count FROM clients", (err, row: any) => {
    if (err) {
      console.error(err.message);
      return;
    }

    if (row.count === 0) {
      const insertQuery = `
        INSERT INTO clients (name, email)
        VALUES
        ('David Adeyemi', 'david@example.com'),
        ('Sarah Balogun', 'sarah@example.com')
      `;

      db.run(insertQuery, (err) => {
        if (err) {
          console.error("Seed error:", err.message);
        } else {
          console.log("Dummy clients seeded.");
        }
      });
    } else {
      console.log("Clients already seeded.");
    }
  });
};

seedClients();