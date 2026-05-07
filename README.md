# Mini Tax & Invoice Dashboard

## Tech Stack
- Node.js
- Express
- TypeScript
- SQLite
- Vanilla JS

## Features
- View invoice summaries
- Create invoices
- Dynamic tax calculation
- Mark invoice as paid
- Automatic SQLite seeding

---

# API Endpoints

## Get All Clients

```http
GET /api/clients
```

---

## Create Invoice

```http
POST /api/invoices
```

### Request Body

```json
{
  "client_id": 1,
  "amount": 5000,
  "tax_rate": 7.5
}
```

---

## Get Invoice Summary

```http
GET /api/invoices/summary
```

Returns:

* Client name
* Invoice amount
* Tax owed
* Status

---

## Mark Invoice as Paid

```http
PUT /api/invoices/:id/pay
```

---

# Tax Calculation Logic

Tax owed is dynamically calculated using:

```sql
amount * (tax_rate / 100)
```

Example:

```txt
5000 * (7.5 / 100) = 375
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/Viktohblake/Oakwood-Benchmark-Test
```

---

## 2. Navigate To Backend

```bash
cd Oakwood-Benchmark-Test/backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start Backend Server

```bash
npm run dev
```

The server will run on:

```txt
http://localhost:8000
```

---

## 5. Run Frontend

Open frontend/index.html using VS Code Live Server.

Frontend runs on:
http://127.0.0.1:5500

---

# Automatic Database Seeding

The application automatically seeds the SQLite database with 2 dummy clients when the backend server starts.

A dedicated seed script is also available:

```bash
npm run seed
```

---

# Screenshots

## Dashboard UI

```txt
/screenshots/dashboard.png
```

---

# Bonus Features Implemented

* Backend validation
* Mark invoice as paid
* Automatic database seeding
