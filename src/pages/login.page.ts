import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly lockoutTimer: Locator;
  readonly registerLink: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Contraseña');
    this.loginButton = page.getByRole('button', { name: 'Iniciar sesión' });
    this.errorMessage = page.getByRole('alert');
    this.lockoutTimer = page.locator('[data-testid="lockout-timer"], .lockout-timer, [class*="timer"]');
    this.registerLink = page.getByRole('link', { name: /regístrate/i });
    this.welcomeMessage = page.getByText(/bienvenid/i);
  }

  async goto() {
    await this.navigate('/login');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async attemptLoginMultipleTimes(email: string, password: string, times: number) {
    for (let i = 0; i < times; i++) {
      await this.login(email, password);
    }
  }
}
