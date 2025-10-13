# 🧭 README.md — Playwright UI Automation Setup from Scratch

## 🚀 Overview

This project is an **end-to-end UI automation framework** built with:

* 🎭 **Playwright** – modern cross-browser testing framework
* 🧠 **TypeScript** – strong typing and clean OOP structure
* 🧱 **Page Object Model (POM)** – scalable and maintainable test design
* 📊 **Allure Report** – powerful and interactive reporting
* ⚙️ **dotenv + cross-env** – easy environment configuration
* 🧩 **Prettier + ESLint** – consistent code formatting and linting

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
git clone https://github.com/hauvth/remi-web-automation
cd remi-web-automation
```

---

## ⚙️ 2. Install Dependencies

```bash
npm install
```

Install Playwright and browsers:

```bash
npm install -D @playwright/test
npx playwright install
```

---

## 🌍 3. Environment Setup

Create a `.env` file in the root directory or copy from `.env.example`:

```bash
cp .env.example .env
```

These values are loaded automatically using **dotenv** in your `config/constant.ts`.

Or create manually with the following variables:

```env
TEST_EMAIL=youremail@gmail.com
TEST_PASSWORD=your_app_password_here
```

### 3.1 Google IMAP & App Password (for automated email verification)

> Follow these steps to enable IMAP access and create an App Password for the automation script. **Recommended:** use an account dedicated to testing.

**Step-by-step:**

1. **Enable 2-Step Verification** for the Google account you will use for tests:

   * Go to `https://myaccount.google.com/security` -> "Signing in to Google" -> "2-Step Verification" and follow the instructions to turn it on.

2. **Create an App Password** (required for IMAP access from scripts when using 2-Step Verification):

   * After enabling 2-Step Verification, go to `https://myaccount.google.com/security` -> "Signing in to Google" -> "App passwords".
   * Choose **Mail** as the app, and **Other (Custom name)** or the device you prefer (e.g., `playwright-tests`).
   * Click **Generate** and copy the 16-character app password. This is the value you will use as `TEST_PASSWORD` in your `.env` file (or as a dedicated `IMAP_PASSWORD` variable).

3. **Enable IMAP in Gmail settings** (web UI):

   * Open Gmail in a browser -> Settings (gear) -> See all settings -> Forwarding and POP/IMAP -> In "IMAP access" choose **Enable IMAP** -> Save changes.

4. **Troubleshooting**

   * If you get authentication failures, ensure 2-Step Verification is **enabled** and you are using the **generated app password**, not your normal password.
   * Make sure IMAP is enabled in Gmail settings and that your IMAP client connects to `imap.gmail.com:993` using SSL/TLS.
   * If Google blocks sign-in attempts, check the account security email and the Google Account activity page to allow access.

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
npm run test
```

### ▶️ Run a specific file

```bash
npx playwright test src/tests/login.spec.ts
```

### ▶️ Run with UI mode

```bash
npm run test-ui
```

---

## 📊 6. Generate and Open Allure Report

### Generate report

```bash
npx allure generate ./allure-results --clean -o ./allure-report
```

or

```bash
npm run gen-report
```

### Open report

```bash
npx allure open ./allure-report
```

or

```bash
npm run show-report
```

### Clean all reports

```bash
npm run clean-report
```

---
