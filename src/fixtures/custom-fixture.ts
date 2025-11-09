import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { SwapPage } from '../pages/swap.page';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  swapPage : SwapPage
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  swapPage: async ({ page }, use) => {
    await use(new SwapPage(page));
  }
});

export { expect } from '@playwright/test';
