import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly startPracticingButton: Locator;
  readonly loginLink: Locator;
  readonly docsLink: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.startPracticingButton = page.getByRole('link', { name: /empezar a practicar/i });
    this.loginLink = page.getByRole('link', { name: /iniciar sesión|login/i });
    this.docsLink = page.getByRole('link', { name: /documentación|docs/i });
    this.pageTitle = page.getByRole('heading', { level: 1 });
  }

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async goToRegister() {
    await this.startPracticingButton.click();
  }

  async goToDocs() {
    await this.docsLink.click();
  }
}
