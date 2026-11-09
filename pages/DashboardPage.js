const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dashboard', exact: true });
    // The user name in the header is dynamic and the dropdown has no
    // accessible role, so a CSS locator is the stable choice here.
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
  }

  async expectDashboardLoaded() {
    await expect(this.page).toHaveURL(/\/dashboard\/index/);
    await expect(this.heading).toBeVisible();
  }

  async expectDashboardNotLoaded() {
    await expect(this.heading).toBeHidden();
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutMenuItem.click();
  }
}

module.exports = { DashboardPage };
