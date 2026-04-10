import { test, expect } from '@fixtures/base.fixture';
import { generateUser, BOUNDARY_AGES, BOUNDARY_PASSWORDS, BOUNDARY_NAMES } from '@utils/test-data-factory';

test.describe('Registro — Equivalencia de particiones y valores límite', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  test('@smoke TC-REG-01 — registration page displays all required fields', async ({ registerPage }) => {
    await expect(registerPage.nameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.ageInput).toBeVisible();
    await expect(registerPage.submitButton).toBeVisible();
  });

  test('@smoke TC-REG-02 — successful registration clears all form fields', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, user.email, user.password, user.age);
    await expect(registerPage.successMessage).toBeVisible();
    expect(await registerPage.isFormEmpty()).toBe(true);
  });

  test('@regression TC-REG-03 — age below minimum (15) is rejected', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, user.email, user.password, BOUNDARY_AGES.tooYoung);
    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('@regression TC-REG-04 — minimum valid age (16) is accepted', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, user.email, user.password, BOUNDARY_AGES.minimumValid);
    await expect(registerPage.errorMessage).not.toBeVisible();
  });

  test('@regression TC-REG-05 — maximum valid age (99) is accepted', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, user.email, user.password, BOUNDARY_AGES.maximumValid);
    await expect(registerPage.errorMessage).not.toBeVisible();
  });

  test('@regression TC-REG-06 — age above maximum (100) is rejected', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, user.email, user.password, BOUNDARY_AGES.tooOld);
    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('@regression TC-REG-07 — password below minimum length (7 chars) is rejected', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, user.email, BOUNDARY_PASSWORDS.tooShort, user.age);
    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('@regression TC-REG-08 — minimum valid password (8 chars) is accepted', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, user.email, BOUNDARY_PASSWORDS.minimumValid, user.age);
    await expect(registerPage.errorMessage).not.toBeVisible();
  });

  test('@regression TC-REG-09 — password above maximum length (65 chars) is rejected', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, user.email, BOUNDARY_PASSWORDS.tooLong, user.age);
    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('@regression TC-REG-10 — invalid email format is rejected', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, 'correo-invalido', user.password, user.age);
    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('@regression TC-REG-11 — duplicate email is rejected', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(user.name, user.email, user.password, user.age);
    await registerPage.goto();
    await registerPage.register(user.name, user.email, user.password, user.age);
    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('@regression TC-REG-12 — name below minimum length (1 char) is rejected', async ({ registerPage }) => {
    const user = generateUser();
    await registerPage.register(BOUNDARY_NAMES.tooShort, user.email, user.password, user.age);
    await expect(registerPage.errorMessage).toBeVisible();
  });
});
