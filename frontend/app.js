const API_BASE_URL = "http://localhost:8000/api";

const clientSelect = document.getElementById("clientSelect");
const invoiceForm = document.getElementById("invoiceForm");
const invoiceTableBody = document.getElementById("invoiceTableBody");

/*
  LOAD CLIENTS
*/
async function loadClients() {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`);
    const clients = await response.json();

    clientSelect.innerHTML =
      '<option value="">Select Client</option>';

    clients.forEach((client) => {
      const option = document.createElement("option");

      option.value = client.id;
      option.textContent = client.name;

      clientSelect.appendChild(option);
    });

  } catch (error) {
    console.error("Error loading clients:", error);
  }
}

/*
  LOAD INVOICES
*/
async function loadInvoices() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/invoices/summary`
    );

    const invoices = await response.json();

    invoiceTableBody.innerHTML = "";

    invoices.forEach((invoice) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${invoice.client_name}</td>
        <td>$${invoice.amount}</td>
        <td>$${invoice.tax_owed}</td>
        <td class="${
          invoice.status === "Paid"
            ? "paid"
            : "unpaid"
        }">
          ${invoice.status}
        </td>
        <td>
          ${
            invoice.status === "Unpaid"
              ? `
              <button onclick="markAsPaid(${invoice.id})">
                Mark as Paid
              </button>
            `
              : "-"
          }
        </td>
      `;

      invoiceTableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Error loading invoices:", error);
  }
}

/*
  CREATE INVOICE
*/
invoiceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const invoiceData = {
    client_id: Number(clientSelect.value),
    amount: Number(document.getElementById("amount").value),
    tax_rate: Number(document.getElementById("taxRate").value),
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/invoices`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    alert("Invoice created successfully!");

    invoiceForm.reset();

    loadInvoices();

  } catch (error) {
    console.error("Error creating invoice:", error);
  }
});

/*
  MARK AS PAID
*/
async function markAsPaid(id) {
  try {
    await fetch(
      `${API_BASE_URL}/invoices/${id}/pay`,
      {
        method: "PUT",
      }
    );

    loadInvoices();

  } catch (error) {
    console.error("Error updating invoice:", error);
  }
}

/*
  INITIAL LOAD
*/
loadClients();
loadInvoices();