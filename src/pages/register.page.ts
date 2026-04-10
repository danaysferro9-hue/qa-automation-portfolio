import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly ageInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByLabel('Nombre completo');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Contraseña');
    this.ageInput = page.getByLabel('Edad');
    this.submitButton = page.getByRole('button', { name: 'Crear cuenta' });
    this.errorMessage = page.getByRole('alert');
    this.successMessage = page.getByText(/cuenta creada|registrado|exitoso/i);
    this.loginLink = page.getByRole('link', { name: /inicia sesión/i });
  }

  async goto() {
    await this.navigate('/registro');
    await this.waitForPageLoad();
  }

  async fillForm(name: string, email: string, password: string, age: number) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageInput.fill(String(age));
  }

  async register(name: string, email: string, password: string, age: number) {
    await this.fillForm(name, email, password, age);
    await this.submitButton.click();
  }

  async isFormEmpty(): Promise<boolean> {
    const name = await this.nameInput.inputValue();
    const email = await this.emailInput.inputValue();
    const password = await this.passwordInput.inputValue();
    const age = await this.ageInput.inputValue();
    return name === '' && email === '' && password === '' && age === '';
  }
}
