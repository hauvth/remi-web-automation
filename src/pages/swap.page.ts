import { BasePage } from './base.page';
import { Page, expect } from '@playwright/test';
import * as CONTANSTS from '../constants/appContants';  
import { extractNumber } from '../utils/stringUtils';

export class SwapPage extends BasePage {
    private sourceCoin !: string;
    private destinationCoin !: string;
    private sourceAmount!:string;
    private desAmount!:string;
    constructor(page: Page) {
        super(page);
    }

    private readonly soureAmount = this.page.getByTestId('sourceAmount');
    private readonly destinationAmount = this.page.getByTestId('destinationAmount');
    private readonly switchBtn = this.page.getByTestId('btn-swap-coins');
    private readonly notificationBtn = this.page.getByTestId('notification-menu');
    private readonly chartIcon = this.page.getByTestId('icon-candle-outline');
    private readonly sourceCoinSelect = this.page.getByTestId('select-source-coin');
    private readonly destinationCoinSelect = this.page.getByTestId('select-destination-coin');
    private readonly sourceCoinLogo = "//button[@data-testid='select-source-coin']//div[contains(@data-testid,'icon-%s')]";
    private readonly destinationCoinLogo = "//button[@data-testid='select-destination-coin']//div[contains(@data-testid,'icon-%s')]";
    private readonly sourceCoinName = this.page.locator("//button[@data-testid='select-source-coin']//div[(@dir = 'auto')]");
    private readonly destinationCoinName = this.page.locator("//button[@data-testid='select-destination-coin']//div[(@dir = 'auto')]");  
    private readonly previewOrderBtn = this.page.getByTestId('btn-submit-swap');
    private readonly moreDeatailsBtn = this.page.getByTestId('swap-more-info');
    private readonly limitPriceInput = this.page.getByTestId('limitPrice');
    // private readonly depositBtn = this.page.getByTestId('amm-order-deposit');
    private readonly errorMessage = this.page.getByTestId('error-message');
    private readonly maxBtn = this.page.locator("//div[text()='MAX']//ancestor::button");
    private readonly closeBtnOnModal = this.page.getByTestId("icon-close-clear-outline");
    private readonly depositBtn = this.page.locator("//div[text()='Nạp tiền']//ancestor::button");
    private readonly selecNetWorkSheet = this.page.getByTestId("network-type-selection-dialog-title");
    private readonly balanceAmount = this.page.getByTestId("coin-amount");
    private readonly sourceCoinSelectTitle = this.page.getByTestId("source-coin-select-titlee");
    private readonly destinationCoinSelectTitle = this.page.getByTestId("destination-coin-select-title");
    private readonly searchCoinInput = this.page.getByTestId("search-coin");
    private readonly coinOption = "//div[@data-testid='icon-%s']//ancestor::div[@data-testid='coin-item']";
    private readonly swapRateText = this.page.getByTestId("swap_rate_text");

    async clickChartIcon() {
        await this.chartIcon.click();
    }

    async searchCoin(coinName: string) {
        await this.searchCoinInput.fill(coinName);
    }

    async selectCoinFromSelect(coinName: string) {
        const coinLocator = this.page.locator(this.coinOption.replace('%s', coinName.toLowerCase()));
        await coinLocator.click();
    }

    async selectDestinationCoinFromSelect(coinName: string) {
        await this.destinationCoinSelect.click();
        await this.searchCoin(coinName);
        await this.selectCoinFromSelect(coinName.toLowerCase());
    }

    async verifyChartIsVisibleWithSelectedCoinPair() {
        const sourceCoin = await this.sourceCoinName.textContent();
        const destinationCoin = await this.destinationCoinName.textContent();
        const frameChart = this.page.frameLocator("iframe[id*='tradingview']");
        const chartHeader = frameChart.locator("//div[contains(@class,'mainTitle') and contains(text(),'REMITANO')]");
        const chartElement = frameChart.locator("//div[contains(@class,'valueValue')]").nth(0);
        const chartTitle = await chartHeader.textContent();
        const expectedTitle = `REMITANO:${sourceCoin?.toUpperCase()}/${destinationCoin?.toUpperCase()}`;
        expect(chartTitle).toBe(expectedTitle);
        expect(chartElement).toBeAttached();
    }

    async clickSourceCoinSelect() {
        await this.sourceCoinSelect.click();
    }

    async enterSourceAmount(amount: string) {
        await this.soureAmount.fill(amount);
    }

    async verifySourceAmountInitially() {
        const amount = await this.soureAmount.getAttribute("placeholder");
        expect(amount).toBe('0.00');
    }

    async verifySourceCoinLogoIsDisplayedCorrectly() {
        const sourceCoinName = await this.sourceCoinName.textContent();
        const coinLogoLocator = this.page.locator(this.sourceCoinLogo.replace('%s', sourceCoinName!.toLowerCase()));
        expect(coinLogoLocator).toBeVisible();
    }

    async verifyDestinationCoinLogoIsDisplayedCorrectly() {
        const destinationCoinName = await this.destinationCoinName.textContent();
        const coinLogoLocator = this.page.locator(this.destinationCoinLogo.replace('%s', destinationCoinName!.toLowerCase()));
        expect(coinLogoLocator).toBeVisible();
    }

    async clickSwitchButton() {
        await this.page.waitForTimeout(2000);
        this.sourceCoin = await this.getSourceCoinName();
        this.destinationCoin = await this.getDestinationCoinName();
        await this.switchBtn.click();
    }   

    async verifySourceAndDestinationCoinsAreSwitched() {
        const currentSourceCoin = await this.sourceCoinName.textContent();
        const currentDestinationCoin = await this.destinationCoinName.textContent();
        expect(currentSourceCoin).toBe(this.destinationCoin);
        expect(currentDestinationCoin).toBe(this.sourceCoin);
    }

    async verifySourceCoinIsDisplayedDifferentlyToDestinationCoin() {
        const sourceCoin = await this.sourceCoinName.textContent();
        const destinationCoin = await this.destinationCoinName.textContent();
        expect(sourceCoin).not.toBe(destinationCoin);
    }

    async getSourceCoinName() : Promise<string> {
        return await this.sourceCoinName.textContent() || '';
    }

    async getDestinationCoinName() : Promise<string> {
        return await this.destinationCoinName.textContent() || '';
    }
    async getSourceAmount() : Promise<string> {
        return await this.soureAmount.inputValue() || '';
    }
    async getDestinationAmount() : Promise<string> {
        return await this.destinationAmount.textContent() || '';
    }   

    async clickPreviewOrderButton() {
        await this.page.waitForTimeout(3000);
        this.sourceCoin = await this.getSourceCoinName();
        this.destinationCoin = await this.getDestinationCoinName();
        this.sourceAmount = await this.getSourceAmount();
        this.desAmount = await this.getDestinationAmount();
        await this.previewOrderBtn.click();
    }
    
    async clickMoreDetailsButton() {
        await this.moreDeatailsBtn.click();
    }   

    async clickMaxButton() {
        await this.maxBtn.click();
    }

    async verifyPreviewOrderButtonIsDisabled() {
        expect(this.previewOrderBtn).toBeDisabled();
    }

    async verifyErrorMessageIsDisplayed(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
        const actualMessage = await this.errorMessage.textContent();
        expect(actualMessage).toBe(expectedMessage);
    }

    async verifyAmountCaculatedAutomatically(){
        await this.page.waitForTimeout(3000);
        const amount = await this.destinationAmount.textContent();
        expect(amount).not.toBe('0.00');
    }

    async verifyAmountAutoTrimmed(){
        const amount = await this.soureAmount.inputValue();
        const specialCharacter : RegExp = /[@£$%^&*()_+~\.,]/
        expect(amount).not.toMatch(specialCharacter);
    }

    async verifyRateWillIncreaseWhenIncreaseSourceAmount(){
        await this.page.waitForTimeout(2000);
        const rateBefore = await this.swapRateText.textContent();
        const rateNumberBefore = extractNumber(rateBefore!);
        await this.soureAmount.fill('1000');
        await this.page.waitForTimeout(3000);
        const rateAfter = await this.swapRateText.textContent();
        const rateNumberAfter = extractNumber(rateAfter!);
        expect(rateNumberAfter!).toBeGreaterThanOrEqual(rateNumberBefore!);
    }

    async verifyOrderInfoIsDisplayedCorrectly() {
        const sourceInfo = this.page.locator("//div[@data-testid='icon-arrow-long-right-outline']//preceding-sibling::div[@dir='auto']//span");
        const destinationInfo = this.page.locator("//div[@data-testid='icon-arrow-long-right-outline']//following-sibling::div[@dir='auto']//span");
        const actualSourceAmount = await sourceInfo.nth(0).textContent();
        const actualSourceCoin = await sourceInfo.nth(1).textContent();
        const actualDestinationAmount = await destinationInfo.nth(0).textContent();
        const actualDestinationCoin = await destinationInfo.nth(1).textContent();
        expect(actualSourceAmount).toBe(this.sourceAmount);
        expect(actualSourceCoin).toBe(this.sourceCoin);
        expect(actualDestinationCoin).toBe(this.destinationCoin);
    }

    async closeModal() {
        await this.closeBtnOnModal.click();
    }

    async clickDepositButton() {
        await this.depositBtn.click();
    }

    async verifySelectNetworkWorksheetIsVisible() {
        await expect(this.selecNetWorkSheet).toBeVisible({ timeout: 10000 });
    }

    async getBalanceAmount() : Promise<string> {
        return await this.balanceAmount.textContent() || '';
    }

    async verifySourceAmountIsMaxBalance() {
        const sourceAmount = await this.getSourceAmount();
        const balanceAmount = await this.getBalanceAmount();
        expect(sourceAmount).toBe(balanceAmount);
    }

    async verifySourceCoinSelectTitleIsCorrect() {
        const actualTitle = await this.sourceCoinSelectTitle.textContent();
        expect(actualTitle).toBe(CONTANSTS.SOURCE_COIN_SELECT_TITLE);
    }

    async verifyDestinationCoinSelectTitleIsCorrect() {
        const actualTitle = await this.destinationCoinSelectTitle.textContent();
        expect(actualTitle).toBe(CONTANSTS.SOURCE_COIN_SELECT_TITLE);
    }

}   