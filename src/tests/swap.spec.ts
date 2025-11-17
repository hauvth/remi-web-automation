import { test } from '../fixtures/custom-fixture';
import * as CONTANSTS from '../constants/appContants'; 

test.use({ storageState:'storageState.json'});
test.describe('Remitano Swap At Market Price Tab', async() => {

    test('TC-01 Logged-in users visit Market price form', async ({loginPage,swapPage, dashboardPage}) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.verifySwapPageVisibleInMarketPriceForm();
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.clickChartIcon();
        await swapPage.verifyChartIsVisibleWithSelectedCoinPair();
        await swapPage.verifySourceCoinLogoIsDisplayedCorrectly();
        await swapPage.verifyDestinationCoinLogoIsDisplayedCorrectly();
        await swapPage.verifySourceAmountInitially();
        await swapPage.clickMaxButton();
        await swapPage.verifySourceAmountIsMaxBalance();
        await swapPage.clickSwitchButton();
        await swapPage.verifySourceAndDestinationCoinsAreSwitched();
        await swapPage.verifySourceCoinLogoIsDisplayedCorrectly();
        await swapPage.clickSourceCoinSelect();
        await swapPage.verifyPreviewOrderButtonIsDisabled();
    });

    test('TC-02 Users fill invalid amount', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.verifySwapPageVisibleInMarketPriceForm();
        await swapPage.enterSourceAmount('0.01');
        await swapPage.verifyErrorMessageIsDisplayed(CONTANSTS.WARNING_AMOUNT);
        await swapPage.verifyAmountCaculatedAutomatically();
        await swapPage.selectSourceCoinFromSelect('ETH');
        await swapPage.selectDestinationCoinFromSelect('USDT');
        await swapPage.enterSourceAmount('0.00001');
        await swapPage.verifyErrorMessageIsDisplayedWhenSourceCoinIsNotUSDT(CONTANSTS.WARNING_AMOUNT);
    });

    test('TC-03 User Input Special Characters in Amount Field', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.verifySwapPageVisibleInMarketPriceForm();
        await swapPage.enterSourceAmount('@');
        await swapPage.verifyAmountAutoTrimmed();
    });

    test('TC-04 Users fill valid min amount', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.verifySwapPageVisibleInMarketPriceForm();
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.enterSourceAmount('0.1');
        await swapPage.verifyAmountCaculatedAutomatically();
        await swapPage.verifyRateWillIncreaseWhenIncreaseSourceAmount();
    });

    test('TC-05 Users fill valid max amount', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.verifySwapPageVisibleInMarketPriceForm();
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.clickMaxButton();
        await swapPage.verifyAmountCaculatedAutomatically();
        await swapPage.verifyRateWillIncreaseWhenIncreaseSourceAmount();
    });

    test('TC-06 Users fill valid range amount', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.verifySwapPageVisibleInMarketPriceForm();
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.enterSourceAmount('1');
        await swapPage.verifyAmountCaculatedAutomatically();
        await swapPage.verifyRateWillIncreaseWhenIncreaseSourceAmount();
    });

    test('TC-07 Users try to swap with insufficient balance', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.verifySwapPageVisibleInMarketPriceForm();
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.enterSourceAmount('100000');
        await swapPage.clickPreviewOrderButton();
        await swapPage.verifyOrderInfoIsDisplayedCorrectly();
        await swapPage.clickDepositButton();
        await swapPage.verifySelectNetworkWorksheetIsVisible();
    });
});

test.describe('Remitano Swap At Your Price Tab - Logged-out users', async() => {
    test.only('TC-08 Logged-out users visit At Your Price form', async ({loginPage,swapPage, dashboardPage}) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.clickYourPriceTab();
        await dashboardPage.verifyYourPriceFormIsSelected();
        await swapPage.verifyWithPriceAutomaticallyDependingOnMarketPrice();
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.clickChartIcon();
        await swapPage.verifyChartIsVisibleWithSelectedCoinPair();
        await swapPage.verifySourceCoinLogoIsDisplayedCorrectly();
        await swapPage.verifyDestinationCoinLogoIsDisplayedCorrectly();
        await swapPage.verifySourceAmountInitially();
        await swapPage.clickMaxButton();
        await swapPage.verifySourceAmountIsMaxBalance();
        await swapPage.clickSwitchButton();
        await swapPage.verifySourceAndDestinationCoinsAreSwitched();
        await swapPage.verifySourceCoinLogoIsDisplayedCorrectly();
        await swapPage.clickSourceCoinSelect();
        await swapPage.verifyPreviewOrderButtonIsDisabled();
    });

    test('TC-09 Users fill invalid amount - Your Price', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.clickYourPriceTab();
        await dashboardPage.verifyYourPriceFormIsSelected();
        await swapPage.enterSourceAmount('0.01');
        await swapPage.verifyErrorMessageIsDisplayed(CONTANSTS.WARNING_AMOUNT);
        await swapPage.verifyAmountCaculatedAutomatically();
        await swapPage.selectSourceCoinFromSelect('ETH');
        await swapPage.selectDestinationCoinFromSelect('USDT');
        await swapPage.enterSourceAmount('0.00001');
        await swapPage.verifyErrorMessageIsDisplayedWhenSourceCoinIsNotUSDT(CONTANSTS.WARNING_AMOUNT);
        
    });

    test('TC-10 User Input Special Characters in Amount Field - Your Price', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.clickYourPriceTab();
        await dashboardPage.verifyYourPriceFormIsSelected();;
        await swapPage.enterSourceAmount('@');
        await swapPage.verifyAmountAutoTrimmed();
    });

    test('TC-11 Users fill valid min amount - Your Price', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.clickYourPriceTab();
        await dashboardPage.verifyYourPriceFormIsSelected();;
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.enterSourceAmount('0.1');
        await swapPage.verifyAmountCaculatedAutomatically();
        await swapPage.verifyRateWillIncreaseWhenIncreaseSourceAmount();
    });

    test('TC-12 Users fill valid max amount - Your Price', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.clickYourPriceTab();
        await dashboardPage.verifyYourPriceFormIsSelected();
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.clickMaxButton();
        await swapPage.verifyAmountCaculatedAutomatically();
        await swapPage.verifyRateWillIncreaseWhenIncreaseSourceAmount();
    });

    test('TC-13 Users fill valid range amount', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.clickYourPriceTab();
        await dashboardPage.verifyYourPriceFormIsSelected();
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.enterSourceAmount('1');
        await swapPage.verifyAmountCaculatedAutomatically();
        await swapPage.verifyRateWillIncreaseWhenIncreaseSourceAmount();
    });

    test('TC-14 Users try to swap with insufficient balance - Your Price', async ({loginPage,swapPage, dashboardPage }) => {
        await loginPage.openHome();
        await dashboardPage.handleWelcomePopup();
        await dashboardPage.clickSwapMenu();
        await dashboardPage.clickYourPriceTab();
        await dashboardPage.verifyYourPriceFormIsSelected();
        await swapPage.selectDestinationCoinFromSelect('BTC');
        await swapPage.enterSourceAmount('100000');
        await swapPage.clickPreviewOrderButton();
        await swapPage.verifyOrderInfoIsDisplayedCorrectly();
        await swapPage.clickDepositButton();
        await swapPage.verifySelectNetworkWorksheetIsVisible();
    });
});