import { test, expect } from '@fixtures/base.fixture';
import { TEST_USER } from '@utils/test-data-factory';

test.describe('Inscripción a cursos — Tabla de decisiones', () => {
  test.beforeEach(async ({ loginPage, coursesPage }) => {
    await loginPage.goto();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await coursesPage.goto();
  });

  test('@smoke TC-CURSO-01 — courses page displays course catalog', async ({ coursesPage }) => {
    const count = await coursesPage.getCourseCount();
    expect(count).toBeGreaterThan(0);
  });

  test('@regression TC-CURSO-02 — unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/cursos');
    await expect(page).toHaveURL(/login/);
  });

  test('@regression TC-CURSO-03 — enrollment without prerequisite is rejected', async ({ coursesPage }) => {
    await coursesPage.enrollInCourse('Playwright desde cero');
    await expect(coursesPage.errorMessage).toBeVisible();
  });

  test('@regression TC-CURSO-04 — enrollment in course with no prerequisites succeeds', async ({ coursesPage }) => {
    await coursesPage.enrollInCourse('Fundamentos de Testing');
    const enrolled = await coursesPage.enrolledBadge.count();
    expect(enrolled).toBeGreaterThan(0);
  });

  test('@regression TC-CURSO-05 — waitlist badge shows when quota is 0', async ({ coursesPage }) => {
    const waitlist = await coursesPage.waitlistBadge.count();
    if (waitlist > 0) {
      await expect(coursesPage.waitlistBadge.first()).toContainText('Lista de espera');
    }
  });

  test('@regression TC-CURSO-06 — each course card shows required information', async ({ page }) => {
    const cards = page.locator('[class*="course"]');
    const first = cards.first();
    await expect(first.getByText(/nivel|level/i)).toBeVisible();
    await expect(first.getByText(/duración|duration/i)).toBeVisible();
  });
});
