const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { validUser, invalidUser } = require('../utils/testData');

test.describe('OrangeHRM login', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.open();
  });

  test('valid login shows the dashboard', { tag: '@smoke' }, async () => {
    await loginPage.login(validUser.username, validUser.password);
    await dashboardPage.expectDashboardLoaded();
  });

  test(
    'invalid credentials show an error and keep user on login page',
    { tag: '@sanity' },
    async () => {
      await loginPage.login(invalidUser.username, invalidUser.password);
      await loginPage.expectInvalidCredentialsError();
      await loginPage.expectOnLoginPage();
      await dashboardPage.expectDashboardNotLoaded();
    }
  );

  test(
    'valid login, logout, then invalid login shows an error',
    { tag: '@regression' },
    async () => {
      await loginPage.login(validUser.username, validUser.password);
      await dashboardPage.expectDashboardLoaded();

      await dashboardPage.logout();
      await loginPage.expectOnLoginPage();

      await loginPage.login(invalidUser.username, invalidUser.password);
      await loginPage.expectInvalidCredentialsError();
      await dashboardPage.expectDashboardNotLoaded();
    }
  );
});
