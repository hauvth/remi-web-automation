# 🧭 README.md — Playwright UI Automation Setup from Scratch

## 🚀 Overview

This project is an **end-to-end UI automation framework** built with:

- 🎭 **Playwright** – modern cross-browser testing framework
- 🧠 **TypeScript** – strong typing and clean OOP structure
- 🧱 **Page Object Model (POM)** – scalable and maintainable test design
- 📊 **Allure Report** – powerful and interactive reporting
- ⚙️ **dotenv + cross-env** – easy environment configuration
- 🧩 **Prettier + ESLint** – consistent code formatting and linting

It automates complex UI flows such as login with email verification, popup handling, and dashboard validation on web applications like **Remitano**.

---

## 🧰 Prerequisites

| Tool               | Version | Description            |
| ------------------ | ------- | ---------------------- |
| Node.js            | ≥ 18.x  | Required runtime       |
| npm                | latest  | Package manager        |
| Git                | latest  | Clone repository       |
| Allure Commandline | latest  | View HTML test reports |

Install Allure globally (once):

```bash
npm install -g allure-commandline --save-dev
```

---

## 📦 1. Clone the Repository

```bash
git clone https://github.com/<your-org>/<your-repo>.git
cd <your-repo>
```

---

## ⚙️ 2. Install Dependencies

```bash
npm install
```

---

## 🌍 3. Environment Setup

Create a `.env` file in the root directory or copy from `.env.example`:

```bash
cp .env.example .env
```

These values are loaded automatically using **dotenv** in your `config/constant.ts`.

---

## 🧩 4. Project Structure

```
📦 project-root
├── src
│   ├── config/
│   │   └── constant.ts           # Load env variables
│   ├── data/                     # Test data (if have)
│   ├── pages/
│   │   ├── base.page.ts          # Base class (common helpers)
│   │   ├── login.page.ts         # Login flow & actions
│   │   └── dashboard.page.ts     # Dashboard elements & actions
│   ├── tests/
│   │   ├── login.spec.ts         # Main login test case
│   │   └── helpers/              # Optional test helpers
│   ├── utils/
│   │   └── mail.helper.ts        # Get verification link from inbox API
│   └── types/                    # Shared TypeScript types
├── .env / .env.example
├── package.json
├── tsconfig.json
├── .prettierrc
├── README.md
└──playwright.config.ts           # Playwright test configuration
```

---

## 🧪 5. Run Tests

### ▶️ Run all tests

```bash
npx run test
```

### ▶️ Run a specific file

```bash
npx playwright test src/tests/login.spec.ts
```

### ▶️ Run with UI mode

```bash
npx run test-ui
```

---

## 📊 6. Generate and Open Allure Report

### Generate report

```bash
npx allure generate ./allure-results --clean -o ./allure-report
```

### Open report

```bash
npx allure open ./allure-report
```

---

## 🧱 7. Useful npm Scripts

```json
"scripts": {
    "test": "cross-env NODE_TLS_REJECT_UNAUTHORIZED=0 npx playwright test",
    "test-ui": "cross-env NODE_TLS_REJECT_UNAUTHORIZED=0 npx playwright test --ui",
    "gen-report": "allure generate allure-results --clean",
    "show-report": "allure open allure-report",
    "report": "playwright show-report",
    "clean": "rimraf test-results playwright-report allure-results allure-report",
    "lint": "eslint src --ext .ts"
}
```
