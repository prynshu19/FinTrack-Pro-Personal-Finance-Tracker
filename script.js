const doc = document;
const body = doc.body;
let userName = localStorage.getItem("userName") || null;
let transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
let currency = localStorage.getItem("currency") || "USD";
let theme = localStorage.getItem("theme") || "light";
const startDiv = doc.querySelector("#start-div");
const userInp = doc.querySelector("#user-name");
const startBtn = doc.querySelector("#start-btn");
const userNameDisplay = doc.querySelector("#user-name-display");
const openModalBtn = doc.querySelector("#open-modal-btn");
const closeModalBtn = doc.querySelector("#close-modal-btn");
const transactionModal = doc.querySelector("#transaction-modal");
const transactionForm = doc.querySelector("#transaction-form");
const settingsNameInput = doc.querySelector("#settings-name");

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
};

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCurrency(amount) {
  const symbol = CURRENCY_SYMBOLS[currency] || "$";
  return `${symbol}${Number(amount).toFixed(2)}`;
}

function applyTheme() {
  body.setAttribute("data-theme", theme);
  const themeToggle = doc.querySelector("#theme-toggle");
  if (themeToggle) themeToggle.checked = theme === "dark";
}
applyTheme();

const themeToggle = doc.querySelector("#theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    theme = themeToggle.checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    applyTheme();
  });
}

function refreshUserNameDisplay() {
  if (userNameDisplay) userNameDisplay.innerText = userName || "";
}

function showGateIfNeeded() {
  if (!startDiv) return;
  if (!userName) {
    startDiv.style.display = "flex";
    if (userInp) userInp.focus();
  } else {
    startDiv.style.display = "none";
  }
}
showGateIfNeeded();
refreshUserNameDisplay();

if (startBtn && userInp) {
  startBtn.addEventListener("click", () => {
    const value = userInp.value?.trim();
    if (!value) {
      alert("Name is required to continue.");
      return;
    }
    userName = value;
    localStorage.setItem("userName", userName);
    showGateIfNeeded();
    refreshUserNameDisplay();
  });

  userInp.addEventListener("keypress", (e) => {
    if (e.key === "Enter") startBtn.click();
  });
}

function closeModal() {
  if (!transactionModal || !transactionForm) return;
  transactionModal.classList.remove("open");
  transactionForm.reset();
}

if (openModalBtn && transactionModal) {
  openModalBtn.addEventListener("click", () => {
    transactionModal.classList.add("open");
    const dateInput = doc.querySelector("#t-date");
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().slice(0, 10);
    }
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

if (transactionModal) {
  transactionModal.addEventListener("click", (e) => {
    if (e.target === transactionModal) closeModal();
  });
}

if (transactionForm) {
  transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = doc.querySelector("#t-description").value.trim();
    const amount = parseFloat(doc.querySelector("#t-amount").value);
    const type = doc.querySelector("#t-type").value;
    const category = doc.querySelector("#t-category").value.trim();
    const date = doc.querySelector("#t-date").value;

    if (!description || !category || !date || isNaN(amount) || amount <= 0) {
      alert("Please fill every field with a valid value.");
      return;
    }

    transactions.push({
      id: Date.now(),
      description,
      amount,
      type,
      category,
      date,
    });
    saveTransactions();
    closeModal();
    renderDashboard();
  });
}

const transactionsBody = doc.querySelector("#transactions-body");

if (transactionsBody) {
  const balanceValue = doc.querySelector("#balance-value");
  const incomeValue = doc.querySelector("#income-value");
  const expenseValue = doc.querySelector("#expense-value");
  const totalCount = doc.querySelector("#total-count");
  const searchInput = doc.querySelector("#search-input");
  const filterType = doc.querySelector("#filter-type");
  const emptyState = doc.querySelector("#empty-state");
  const tableWrapper = doc.querySelector("#table-wrapper");
  const resetDataBtn = doc.querySelector("#reset-data-btn");
  let chartInstance = null;

  function computeTotals() {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
  }

  function renderSummary(totals) {
    balanceValue.innerText = formatCurrency(totals.balance);
    incomeValue.innerText = formatCurrency(totals.income);
    expenseValue.innerText = formatCurrency(totals.expense);
    totalCount.innerText = transactions.length;
  }

  function renderChart(totals) {
    const canvas = doc.querySelector("#cash-flow-chart");
    if (!canvas || typeof Chart === "undefined") return;

    const data = {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [totals.income, totals.expense],
          backgroundColor: ["#1a7a42", "#a71d2a"],
          borderRadius: 8,
          maxBarThickness: 90,
        },
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    };

    if (chartInstance) {
      chartInstance.data = data;
      chartInstance.update();
    } else {
      chartInstance = new Chart(canvas.getContext("2d"), {
        type: "bar",
        data,
        options,
      });
    }
  }

  function transactionRowHTML(t) {
    const sign = t.type === "income" ? "+" : "-";
    const amountClass =
      t.type === "income" ? "amount-income" : "amount-expense";
    return `<tr>
      <td>${escapeHTML(t.date)}</td>
      <td>${escapeHTML(t.description)}</td>
      <td><span class="pill">${escapeHTML(t.category)}</span></td>
      <td class="${amountClass}">${sign}${formatCurrency(t.amount)}</td>
      <td><button class="delete-btn" data-id="${t.id}"><i class="ri-delete-bin-line"></i></button></td>
    </tr>`;
  }

  function getFilteredTransactions() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const type = filterType?.value || "all";

    return transactions
      .filter((t) => type === "all" || t.type === type)
      .filter((t) => !query || t.description.toLowerCase().includes(query))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function renderTable() {
    const list = getFilteredTransactions();

    if (list.length === 0) {
      transactionsBody.innerHTML = "";
      if (tableWrapper) tableWrapper.style.display = "none";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (tableWrapper) tableWrapper.style.display = "block";
    if (emptyState) emptyState.style.display = "none";
    transactionsBody.innerHTML = list.map(transactionRowHTML).join("");
  }

  function renderDashboard() {
    const totals = computeTotals();
    renderSummary(totals);
    renderChart(totals);
    renderTable();
  }

  transactionsBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    transactions = transactions.filter((t) => t.id !== id);
    saveTransactions();
    renderDashboard();
  });

  if (searchInput) {
    searchInput.addEventListener("input", renderTable);
  }
  if (filterType) {
    filterType.addEventListener("change", renderTable);
  }

  if (resetDataBtn) {
    resetDataBtn.addEventListener("click", () => {
      const confirmed = confirm(
        "This clears every transaction, your name, currency, and theme. Continue?",
      );
      if (!confirmed) return;
      localStorage.removeItem("userName");
      localStorage.removeItem("transactions");
      localStorage.removeItem("currency");
      localStorage.removeItem("theme");
      location.reload();
    });
  }

  renderDashboard();
}

if (settingsNameInput) {
  const settingsCurrencySelect = doc.querySelector("#settings-currency");
  const saveSettingsBtn = doc.querySelector("#save-settings-btn");

  settingsNameInput.value = userName || "";
  if (settingsCurrencySelect) settingsCurrencySelect.value = currency;

  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", () => {
      const newName = settingsNameInput.value.trim();
      if (!newName) {
        alert("Name can't be empty.");
        settingsNameInput.value = userName || "";
        return;
      }
      userName = newName;
      localStorage.setItem("userName", userName);
      refreshUserNameDisplay();

      if (settingsCurrencySelect) {
        currency = settingsCurrencySelect.value;
        localStorage.setItem("currency", currency);
      }

      alert("Settings saved.");
    });
  }
}
