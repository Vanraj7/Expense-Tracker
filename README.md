<div align="center">

<img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

<br/><br/>

# 💰 Vault — Personal Finance Tracker

**A beautifully crafted personal finance tracker built with React + Vite.**
Track expenses, set budgets, visualize spending patterns, and manage savings goals — all in one elegant dashboard.

<br/>

<img width="1909" height="946" alt="image" src="https://github.com/user-attachments/assets/020e5c92-bb06-4230-adb2-e17342e7ae2c" />


</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🧠 About the Project

**Vault** is a full-featured personal finance tracker that lets you take complete control of your money. It was built as a portfolio project to demonstrate real-world React development skills including component architecture, custom hooks, persistent state management, Canvas-based data visualization, and responsive UI design.

All data is stored locally in your browser using `localStorage` — no backend, no accounts, no data leaving your device.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💳 **Add Transactions** | Log income and expenses with category, date, amount, and an optional note |
| 📆 **Month Navigation** | Browse and review any past month with ← → arrows |
| 📊 **Live Balance Hero** | Instant net balance display with income/expense breakdown pills |
| ⚡ **Quick Stats** | Average daily spend, biggest single expense, total transaction count |
| 🔍 **Smart Search** | Real-time search across description and category |
| 🏷️ **Category Filters** | Filter chips to instantly narrow down by category |
| 📅 **Date Grouping** | Transactions grouped by date with weekday labels |
| 🍩 **Donut Chart** | Animated canvas breakdown of spending by category with legend |
| 📈 **Daily Sparkline** | Area chart showing your spending curve across the entire month |
| 🎯 **Category Budgets** | Set monthly spending limits per category with live progress bars (turns red when over!) |
| 🏆 **Savings Goals** | Create financial goals with gold progress bars, tracking saved vs. remaining |
| ⬇️ **CSV Export** | Download any month's transactions as a spreadsheet |
| 🔔 **Toast Notifications** | Elegant feedback toasts for every action |
| 💾 **Persistent Storage** | Everything saved to `localStorage`, data survives browser refresh |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile |
| ⌨️ **Keyboard Shortcut** | Press `Enter` inside the form to quickly submit a transaction |

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.x | UI components and state management |
| **Vite** | 5.x | Blazing fast build tool and dev server |
| **Canvas API** | Native | Donut chart and daily sparkline rendering |
| **CSS Variables** | Native | Design system, theming, and responsive tokens |
| **localStorage** | Native | Client-side data persistence |

> No UI libraries. No chart libraries. Everything built from scratch.

---

## 📁 Project Structure

```
vault-expense-tracker/
│
├── public/
│   └── favicon.svg                 # Custom gold vault SVG icon
│
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Sticky top bar with month navigation & export
│   │   ├── HeroBalance.jsx         # Large net balance display with income/expense pills
│   │   ├── QuickStats.jsx          # 3-card row: avg/day, biggest expense, tx count
│   │   ├── TransactionList.jsx     # Search bar, filter chips, date-grouped list
│   │   ├── TransactionItem.jsx     # Single transaction row with delete on hover
│   │   ├── AddTransactionForm.jsx  # Income/expense form with validation
│   │   ├── DonutChart.jsx          # Canvas-based animated donut chart
│   │   ├── SparklineChart.jsx      # Canvas daily spending area chart
│   │   ├── BudgetTracker.jsx       # Per-category budget progress bars
│   │   ├── SavingsGoals.jsx        # Goal cards with modal form to add new goals
│   │   └── Toast.jsx               # Toast notification system (hook + component)
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js      # Custom hook for persistent React state
│   │
│   ├── utils/
│   │   ├── categories.js           # Category config: icon and color per category
│   │   ├── formatters.js           # INR formatting, date formatting, helper functions
│   │   └── exportCSV.js            # CSV export utility function
│   │
│   ├── styles/
│   │   └── globals.css             # All CSS variables, base styles, component styles
│   │
│   ├── App.jsx                     # Root component — all state, data flow, events
│   └── main.jsx                    # React entry point — mounts App to #root
│
├── index.html                      # Vite HTML shell
├── vite.config.js                  # Vite configuration
├── package.json                    # Project metadata and dependencies
├── .gitignore                      # Git exclusions (node_modules, dist, etc.)
├── LICENSE                         # MIT License
└── README.md                       # You are here
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v18 or higher**
- **npm** (comes bundled with Node.js)

Check your versions:
```bash
node --version   # should be v18+
npm --version    # should be v9+
```

### Installation

**Step 1 — Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/vault-expense-tracker.git
```

**Step 2 — Navigate into the project folder**
```bash
cd vault-expense-tracker
```

**Step 3 — Install dependencies**
```bash
npm install
```

**Step 4 — Start the development server**
```bash
npm run dev
```

**Step 5 — Open in your browser**

Visit [http://localhost:5173](http://localhost:5173) 🎉

---

## 📖 Usage

### Adding a Transaction
1. Select **Expense** or **Income** using the toggle button
2. Enter the amount, date, description, and category
3. Optionally add a note for extra detail
4. Click **"Add to Vault"** or press `Enter`

### Setting a Budget
1. Scroll to the **Category Budgets** section in the sidebar
2. Select a category from the dropdown and enter a monthly limit
3. Click **Set** — the progress bar fills as you spend (turns red when over budget)

### Creating a Savings Goal
1. Click **"+ Add Goal"** in the Savings Goals section
2. Enter a goal name, target amount, and how much you've already saved
3. Track your progress with the gold animated progress bar

### Exporting Data
Click **"↓ Export CSV"** in the header to download the current month's transactions as a `.csv` file — ready to open in Excel or Google Sheets.

### Navigating Between Months
Use the **← →** arrows next to the month name in the header to switch between months and review your full financial history.

---

## 🌐 Deployment

### ▲ Vercel (Recommended — Free)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"** → import this repository
4. Vercel auto-detects Vite — just click **Deploy**
5. Your app is live at `https://vault-expense-tracker.vercel.app`

### Netlify (Free)

```bash
npm run build
```
Then drag and drop the generated `dist/` folder at [netlify.com/drop](https://app.netlify.com/drop).

### GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"homepage": "https://YOUR_USERNAME.github.io/vault-expense-tracker",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Then run:
```bash
npm run deploy
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
# 1. Fork this repository

# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes with a clear message
git commit -m "feat: add amazing feature"

# 4. Push to your branch
git push origin feature/amazing-feature

# 5. Open a Pull Request on GitHub
```

### 💡 Ideas for Future Contributions
- 🌙 Light / Dark mode toggle
- 📊 Month-over-month comparison chart
- 🔁 Recurring transactions support
- 🧾 Receipt photo upload
- ☁️ Cloud sync via Firebase or Supabase
- 📤 PDF report generation
- 🌍 Multi-currency support

---

## 📄 License

Distributed under the **MIT License**.
See [`LICENSE`](./LICENSE) for full details.

---

## 👤 Author

**Vanraj Jhala**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Vanraj7)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vanraj-jhala)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://www.vanrajjhala.in/)

---

<div align="center">

**⭐ If you found this project helpful, please give it a star — it really helps!**


