<div align="center">

# 💰 FinTrack Pro

**A sleek, client-side personal finance tracker — no backend, no sign-up, just you and your money.**

[![HTML](https://img.shields.io/badge/HTML5-33.4%25-e34c26?logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS3-37.1%25-1572b6?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-30.5%25-f7df1e?logo=javascript&logoColor=black)](#)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)

[Features](#-features) • [Demo](#-screenshots) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Roadmap](#-roadmap)

</div>

---

## ✨ Overview

**FinTrack Pro** is a lightweight, elegant web app for tracking your income and expenses — built entirely with vanilla **HTML, CSS, and JavaScript**. There's no server, no database, and no account creation. Your data lives in your browser, and your dashboard updates in real time as you add transactions.

Think of it as your personal finance command center: clean cards, a live cash-flow chart, and a searchable transaction table, all wrapped in a dark-mode-ready interface.

---

## 🚀 Features

- **👋 Personalized Welcome** — Enter your name once and get greeted every time you open the dashboard.
- **📊 Real-Time Summary Cards** — Instantly see your current balance, total income, total expenses, and transaction count.
- **📈 Cash Flow Chart** — A live income-vs-expense visualization powered by Chart.js.
- **➕ Add Transactions** — A clean modal form to log description, amount, type (income/expense), category, and date.
- **🔍 Search & Filter** — Quickly find transactions by keyword or filter by type.
- **🌙 Dark Mode** — Toggle between light and dark themes with a single switch.
- **🗑️ Reset Data** — Wipe all stored data and start fresh whenever you like.
- **📭 Empty States** — Friendly prompts when there's nothing to show yet.
- **⚙️ Settings Page** — A dedicated page for managing your preferences.
- **💾 Persistent Storage** — Your transactions and preferences are saved locally in the browser, so they're there when you come back.

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom, with `reset.css` + `responsive.css`) |
| Interactivity | Vanilla JavaScript |
| Charts | [Chart.js](https://www.chartjs.org/) |
| Icons | [Remix Icon](https://remixicon.com/) |
| Storage | Browser `localStorage` |

No frameworks, no build step, no dependencies to install — just open it and go.

---

## 📦 Getting Started

Since FinTrack Pro is a static site, running it locally takes seconds.

### 1. Clone the repo

```bash
git clone https://github.com/prynshu19/FinTrack-Pro-Personal-Finance-Tracker.git
cd FinTrack-Pro-Personal-Finance-Tracker
```

### 2. Open it in your browser

Just double-click `index.html`, or serve it locally for the best experience:

```bash
# Using Python
python3 -m http.server 8000

# Or using Node's http-server
npx http-server .
```

Then visit **http://localhost:8000** in your browser.

### 3. Start tracking

Enter your name on the welcome screen, hit **Add Transaction**, and watch your dashboard come to life.

---

## 📁 Project Structure

```
FinTrack-Pro-Personal-Finance-Tracker/
├── css/
│   ├── reset.css        # Baseline style reset
│   ├── style.css        # Core styling & layout
│   └── responsive.css   # Mobile/tablet responsiveness
├── index.html           # Main dashboard
├── settings.html        # Settings page
└── script.js            # App logic (transactions, chart, storage)
```

---

## 🗺️ Roadmap

Some ideas for where this project could go next:

- [ ] Export transactions to CSV/PDF
- [ ] Monthly/yearly budget goals
- [ ] Category-based spending breakdown (pie/donut chart)
- [ ] Multi-currency support
- [ ] Cloud sync (optional backend)

Contributions and suggestions are welcome — feel free to open an issue!

---

## 🤝 Contributing

Contributions make the open-source community amazing. Any contributions are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information (add one if you haven't yet!).

---

<div align="center">

Made with ❤️ by [prynshu19](https://github.com/prynshu19)

</div>
