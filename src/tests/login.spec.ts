import { test } from '../fixtures/custom-fixture';
import { getRemitanoVerificationLink } from '../utils/mailHelper';
import { TEST_EMAIL } from '../config/constant';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('Remitano Login Flow', () => {
  test('Login successfully and reach dashboard', async ({page, loginPage, context }) => {
    // 1️⃣ Mở trang home & login bằng email
    await loginPage.openHome();
    await loginPage.loginWithEmail(TEST_EMAIL);
    await loginPage.waitForVerificationNotice();

    // 2️⃣ Lấy link xác thực email
    const verifyLink = await getRemitanoVerificationLink();

    // 3️⃣ Mở link xác thực trong tab mới
    const verifyPage = await context.newPage();
    await verifyPage.goto(verifyLink);
    await loginPage.close();

    const dashboardPage = new DashboardPage(verifyPage);
    // 4️⃣ Verify Dashboard
    await dashboardPage.handleWelcomePopup();
    await dashboardPage.verifyDashboardVisible();
    await dashboardPage.closeToastIfVisible();
    await dashboardPage.verifyUserEmail();
    await verifyPage.context().storageState({ path: 'storageState.json' });
    console.log('✅ Login successfully and Dashboard loaded.');
  });
});
