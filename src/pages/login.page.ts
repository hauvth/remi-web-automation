import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { BASE_URL } from '../config/constant';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly emailInput = this.page.locator('#email-input');
  private readonly loginButton = this.page.locator('button:has-text("Đăng Nhập / Đăng Ký")');
  private readonly sentMailNotice = this.page.locator('text=Xác nhận yêu cầu đăng nhập của bạn');

  async openHome() {
    await this.page.goto(BASE_URL || 'http://localhost:3000');
    await expect(this.page).toHaveTitle(/Remitano/);
  }

  async loginWithEmail(email: string) {
    await this.emailInput.fill(email);
    await this.loginButton.click();
  }

  async waitForVerificationNotice() {
    await expect(this.sentMailNotice).toBeVisible({ timeout: 5000 });
  }
}
