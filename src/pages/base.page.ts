import { expect, Page } from '@playwright/test';
import { logger } from '../utils/logger';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async verifyUrlContains(path: string) {
    logger.info(`🔎 Verify URL contains: ${path}`);
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  async verifyTextVisible(text: string) {
    logger.info(`🔎 Verify text is visible: ${text}`);
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async close() {
    await this.page.close();
  }
}
