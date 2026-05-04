# Oakwood-Benchmark-Test
# Challenge: Mini Tax & Invoice Dashboard

Welcome to our engineering challenge! We are excited to see how you approach building practical, data-driven applications.

## 🎯 Objective
Build a lightweight full-stack application that manages clients and calculates tax on their invoices. You will set up a SQLite database, build a RESTful API using Node.js and TypeScript, and create a simple frontend to display the data.

## 🛠️ Tech Stack
* **Backend:** Node.js, Express, TypeScript
* **Database:** SQLite (using `sqlite3` or an ORM/query builder like TypeORM or Knex, your choice)
* **Frontend:** Vanilla HTML/CSS/JavaScript OR Angular (whichever you feel allows you to execute the fastest and cleanest)

## 📋 Requirements

### 1. Database Setup (SQLite)
Design and implement two tables:
* **Clients:** `id`, `name`, `email`, `created_at`
* **Invoices:** `id`, `client_id` (foreign key), `amount`, `tax_rate` (percentage), `status` (Paid/Unpaid), `created_at`

### 2. Backend API (TypeScript)
Create the following RESTful endpoints:
* `GET /api/clients` - Returns a list of all clients.
* `POST /api/invoices` - Creates a new invoice for a specific client.
* `GET /api/invoices/summary` - **(The Challenge)** Returns a list of all invoices joined with the client's name. It must also include a dynamically calculated field called `tax_owed` (calculated as `amount * (tax_rate / 100)`).

### 3. Frontend UI
Create a clean, simple, single-page interface that does the following:
* Displays a table or list of the invoice summary (showing Client Name, Invoice Amount, Tax Owed, and Status).
* Contains a simple form to create a new invoice (dropdown for selecting a client, input for amount, input for tax rate).
* Updates the invoice list dynamically when a new invoice is submitted without requiring a full page reload.

## 🚀 Bonus Points (Optional)
If you want to stand out, pick one of the following to implement:
* Add basic data validation on the backend (e.g., ensuring amount cannot be negative).
* Add a "Mark as Paid" button on the frontend that updates the database.
* Include a simple setup script in `package.json` that automatically seeds the SQLite database with 2 dummy clients so the app works out of the box.

## 📦 Submission Guidelines
* Fork this repository or create a new public repo.
* Include a `README.md` with clear instructions on how to install dependencies, initialize the database, and run the application locally.
* Ensure your code is clean, commented where necessary, and properly typed using TypeScript.
* Send us the link to your repository when complete!
