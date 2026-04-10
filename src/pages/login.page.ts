import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly loggedInAsLabel: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginErrorMessage = page.getByText('Your email or password is incorrect!');
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.loggedInAsLabel = page.getByText(/logged in as/i);
    this.logoutLink = page.getByRole('link', { name: /logout/i });
    this.deleteAccountLink = page.getByRole('link', { name: /delete account/i });
  }

  async goto() {
    await this.navigate('/login');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async fillSignupForm(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
