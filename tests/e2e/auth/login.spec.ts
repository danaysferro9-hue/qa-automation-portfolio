import { test, expect } from '@fixtures/base.fixture';
import { generateUser } from '@utils/test-data-factory';

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('@smoke TC-AUTH-01 — login page loads correctly', async ({ loginPage }) => {
    await expect(loginPage.loginEmailInput).toBeVisible();
    await expect(loginPage.loginPasswordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('@regression TC-AUTH-02 — login with invalid credentials shows error', async ({ loginPage }) => {
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await expect(loginPage.loginErrorMessage).toBeVisible();
  });

  test('@regression TC-AUTH-03 — login with empty email shows validation', async ({ page, loginPage }) => {
    await loginPage.loginPasswordInput.fill('somepassword');
    await loginPage.loginButton.click();
    const emailValidity = await page.locator('[data-qa="login-email"]').evaluate(
      (el: HTMLInputElement) => el.validity.valid
    );
    expect(emailValidity).toBe(false);
  });

  test('@regression TC-AUTH-04 — signup form is visible', async ({ loginPage }) => {
    await expect(loginPage.signupNameInput).toBeVisible();
    await expect(loginPage.signupEmailInput).toBeVisible();
    await expect(loginPage.signupButton).toBeVisible();
  });

  test('@regression TC-AUTH-05 — register with existing email shows error', async ({ loginPage }) => {
    const existingEmail = 'test@example.com';
    await loginPage.fillSignupForm('Existing User', existingEmail);
    await expect(
      loginPage.page.getByText('Email Address already exist!')
    ).toBeVisible();
  });
});
