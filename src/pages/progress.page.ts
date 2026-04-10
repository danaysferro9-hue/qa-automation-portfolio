import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProgressPage extends BasePage {
  readonly courseItems: Locator;
  readonly statusBadges: Locator;
  readonly errorMessage: Locator;
  readonly certificateButton: Locator;

  constructor(page: Page) {
    super(page);
    this.courseItems = page.locator('[data-testid="progress-item"], .progress-item, [class*="progress"]');
    this.statusBadges = page.locator('[data-testid="status-badge"], .status-badge, [class*="status"]');
    this.errorMessage = page.getByRole('alert');
    this.certificateButton = page.getByRole('button', { name: /certificado|certificate/i });
  }

  async goto() {
    await this.navigate('/mi-progreso');
    await this.waitForPageLoad();
  }

  async getStatusOf(courseTitle: string): Promise<string> {
    const item = this.page.locator(`text=${courseTitle}`).locator('..').locator('..');
    return item.locator('[class*="status"], [class*="badge"]').innerText();
  }

  async transitionStatus(courseTitle: string, action: string) {
    const item = this.page.locator(`text=${courseTitle}`).locator('..').locator('..');
    await item.getByRole('button', { name: action }).click();
  }
}
