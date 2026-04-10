import { test, expect } from '@fixtures/base.fixture';
import { TEST_USER, generateUser } from '@utils/test-data-factory';

test.describe('Login — Academia sin Humo', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('@smoke TC-LOGIN-01 — login page displays all required elements', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible();
  });

  test('@smoke TC-LOGIN-02 — login with valid credentials shows welcome message', async ({ loginPage }) => {
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await expect(loginPage.welcomeMessage).toBeVisible();
  });

  test('@regression TC-LOGIN-03 — login with invalid password shows error', async ({ loginPage }) => {
    await loginPage.login(TEST_USER.email, 'wrongpassword');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('@regression TC-LOGIN-04 — login with unregistered email shows error', async ({ loginPage }) => {
    await loginPage.login('noexiste@ejemplo.com', 'Segura2026!');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('@regression TC-LOGIN-05 — login with empty fields shows validation', async ({ loginPage }) => {
    await loginPage.loginButton.click();
    const emailRequired = await loginPage.emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(emailRequired).toBe(true);
  });

  test('@regression TC-LOGIN-06 — after 5 failed attempts account locks for 30 seconds', async ({ loginPage }) => {
    await loginPage.attemptLoginMultipleTimes(TEST_USER.email, 'wrongpassword', 5);
    await expect(loginPage.loginButton).toBeDisabled();
    await expect(loginPage.lockoutTimer).toBeVisible();
  });

  test('@regression TC-LOGIN-07 — register link navigates to registration page', async ({ loginPage }) => {
    await loginPage.registerLink.click();
    await expect(loginPage.page).toHaveURL(/registro/);
  });
});
