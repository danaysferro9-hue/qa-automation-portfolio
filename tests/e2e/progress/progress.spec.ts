import { test, expect } from '@fixtures/base.fixture';
import { TEST_USER } from '@utils/test-data-factory';

test.describe('Progreso del estudiante — Transiciones de estado', () => {
  test.beforeEach(async ({ loginPage, progressPage }) => {
    await loginPage.goto();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await progressPage.goto();
  });

  test('@smoke TC-PROG-01 — progress page loads for authenticated user', async ({ progressPage }) => {
    await expect(progressPage.page).toHaveURL(/mi-progreso/);
  });

  test('@regression TC-PROG-02 — unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/mi-progreso');
    await expect(page).toHaveURL(/login/);
  });

  test('@regression TC-PROG-03 — invalid transition Inscrito to Completado is rejected', async ({
    progressPage,
    page,
  }) => {
    await progressPage.transitionStatus('Fundamentos de Testing', 'Completado');
    await expect(progressPage.errorMessage).toBeVisible();
  });

  test('@regression TC-PROG-04 — valid transition Inscrito to En progreso is accepted', async ({
    progressPage,
  }) => {
    await progressPage.transitionStatus('Fundamentos de Testing', 'En progreso');
    await expect(progressPage.errorMessage).not.toBeVisible();
  });

  test('@regression TC-PROG-05 — certificate cannot be generated twice', async ({ progressPage }) => {
    await progressPage.certificateButton.first().click();
    await progressPage.certificateButton.first().click();
    const alerts = await progressPage.errorMessage.count();
    expect(alerts).toBeGreaterThan(0);
  });

  test('@regression TC-PROG-06 — logout resets all course progress', async ({
    progressPage,
    loginPage,
    page,
  }) => {
    await page.getByRole('button', { name: /cerrar sesión|logout/i }).click();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await progressPage.goto();
    const items = await progressPage.courseItems.count();
    expect(items).toBe(0);
  });
});
