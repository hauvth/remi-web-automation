import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';
import { TEST_EMAIL } from '../config/constant';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly buySellMenu = this.page.getByTestId('menu-coin');
  private readonly swapMenu = this.page.getByTestId('menu-swap');
  private readonly welcomePopup = this.page.locator('text=Chào mừng');
  private readonly popupText = this.page.locator('text=Mua VNF là bước đầu để giao dịch Crypto');
  private readonly understandButton = this.page.getByTestId('got-it');
  private readonly dontShowAgainCheckbox = this.page.getByTestId('dont-show-again');
  private readonly avtIcon = this.page.getByTestId('icon-profile-circle');
  private readonly userEmail = this.page.locator(`text=${TEST_EMAIL}`);
  private readonly toastCloseBtn = this.page.getByTestId('inform-item-close-button-1');
  private readonly swapBtn = this.page.getByTestId('menu-swap');
  private readonly pageTitle = "//h5[text()='%s']";
  private readonly marketPriceForm = this.page.locator("//button[contains(@data-testid,'order_type_market')]");
  private readonly yourPriceForm = this.page.locator("//button[contains(@data-testid,'order_type_limit')]");

  async verifyDashboardVisible() {
    await expect(this.buySellMenu).toBeVisible({ timeout: 15000 });
    await expect(this.swapMenu).toBeVisible();
    await expect(this.page).toHaveURL(/remitano\.com\/vn/);
  }
  
  async clickYourPriceTab() {
    logger.info('➡️ Click on Your Price tab');
    await this.yourPriceForm.click();
  }

  async clickSwapMenu() {
    logger.info('➡️ Click on Swap menu');
    await this.swapBtn.click();
  }

  async verifyMarketPriceFormIsSelected() {
    logger.info('🔎 Verify Market Price form is selected by default');
    const attribute = await this.marketPriceForm.getAttribute('data-testid');
    expect(attribute).toContain('active');
  }

  async verifyYourPriceFormIsSelected() {
    logger.info('🔎 Verify Market Price form is selected by default');
    const attribute = await this.yourPriceForm.getAttribute('data-testid');
    expect(attribute).toContain('active');
  }

  async verifySwapPageVisibleInMarketPriceForm() {
    const pageTitleLocator = this.page.locator(this.pageTitle.replace('%s', 'Swap'));
    await expect(pageTitleLocator).toBeVisible({ timeout: 10000 });
    this.verifyMarketPriceFormIsSelected;
  }

  async handleWelcomePopup() {
    if (await this.welcomePopup.isVisible({ timeout: 10000 }).catch(() => false)) {
      await expect(this.popupText).toBeVisible();
      logger.info('ℹ️ Popup displayed');
      await this.understandButton.click();
    } else {
      logger.info('ℹ️ No display popup.');
    }
  }

  async verifyUserEmail() {
    logger.info('🔎 Verify user email is correct.');
    await this.avtIcon.click();
    await expect(this.userEmail).toBeVisible({ timeout: 10000 });
    await expect(this.userEmail).toHaveText(TEST_EMAIL);
  }

  async closeToastIfVisible() {
    const isToastVisible = await this.toastCloseBtn.isVisible({ timeout: 2000 }).catch(() => false);
    if (isToastVisible) {
      logger.info('🔔 Toast detected → closing it...');
      await this.toastCloseBtn.click();
      await expect(this.toastCloseBtn).toBeHidden({ timeout: 5000 });
      logger.info('✅ Toast closed successfully');
    } else {
      logger.info('ℹ️ No toast visible');
    }
  }
}
