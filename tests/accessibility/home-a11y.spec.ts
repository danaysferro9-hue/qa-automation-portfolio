import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accesibilidad WCAG 2.1 AA — Academia sin Humo', () => {
  test('@smoke TC-A11Y-01 — home page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(v => v.impact === 'critical');
    expect(
      critical,
      `Violaciones críticas: ${JSON.stringify(critical.map(v => v.description), null, 2)}`
    ).toHaveLength(0);
  });

  test('@regression TC-A11Y-02 — login page has no critical violations', async ({ page }) => {
    await page.goto('/login');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(v => v.impact === 'critical');
    expect(
      critical,
      `Violaciones críticas: ${JSON.stringify(critical.map(v => v.description), null, 2)}`
    ).toHaveLength(0);
  });

  test('@regression TC-A11Y-03 — registration page has no critical violations', async ({ page }) => {
    await page.goto('/registro');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(v => v.impact === 'critical');
    expect(
      critical,
      `Violaciones críticas: ${JSON.stringify(critical.map(v => v.description), null, 2)}`
    ).toHaveLength(0);
  });

  test('@regression TC-A11Y-04 — all images have alt text', async ({ page }) => {
    await page.goto('/');
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test('@regression TC-A11Y-05 — all form inputs have associated labels', async ({ page }) => {
    await page.goto('/login');
    const inputsWithoutLabel = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input:not([type="hidden"])');
      return Array.from(inputs).filter(input => {
        const id = input.getAttribute('id');
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledBy = input.getAttribute('aria-labelledby');
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;
        return !label && !ariaLabel && !ariaLabelledBy;
      }).length;
    });
    expect(inputsWithoutLabel).toBe(0);
  });
});
