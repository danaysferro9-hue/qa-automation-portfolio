import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility — Home Page', () => {
  test('@smoke TC-A11Y-01 — home page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('#cookienotice')
      .analyze();

    const critical = results.violations.filter(v => v.impact === 'critical');
    expect(critical, `Critical violations: ${JSON.stringify(critical.map(v => v.description), null, 2)}`).toHaveLength(0);
  });

  test('@regression TC-A11Y-02 — products page has no critical violations', async ({ page }) => {
    await page.goto('/products');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(v => v.impact === 'critical');
    expect(critical, `Critical violations: ${JSON.stringify(critical.map(v => v.description), null, 2)}`).toHaveLength(0);
  });

  test('@regression TC-A11Y-03 — login page has no critical violations', async ({ page }) => {
    await page.goto('/login');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(v => v.impact === 'critical');
    expect(critical, `Critical violations: ${JSON.stringify(critical.map(v => v.description), null, 2)}`).toHaveLength(0);
  });

  test('@regression TC-A11Y-04 — all images have alt text', async ({ page }) => {
    await page.goto('/');
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0);
  });
});
