const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

const LOGIN_URL =
  'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorAlert = page
      .getByRole('alert')
      .filter({ hasText: 'Invalid credentials' });
  }

  async open() {
    await this.goto(LOGIN_URL);
    await expect(this.loginButton).toBeVisible();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectInvalidCredentialsError() {
    await expect(this.errorAlert).toBeVisible();
    await expect(this.errorAlert).toHaveText('Invalid credentials');
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/\/auth\/login/);
    await expect(this.loginButton).toBeVisible();
  }
}

module.exports = { LoginPage };
