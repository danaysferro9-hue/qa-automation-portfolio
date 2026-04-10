import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CoursesPage extends BasePage {
  readonly courseCards: Locator;
  readonly enrollButtons: Locator;
  readonly waitlistBadge: Locator;
  readonly enrolledBadge: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.courseCards = page.locator('[data-testid="course-card"], .course-card, [class*="course"]');
    this.enrollButtons = page.getByRole('button', { name: /inscribir|enroll/i });
    this.waitlistBadge = page.getByText('Lista de espera');
    this.enrolledBadge = page.getByText('Inscrito');
    this.errorMessage = page.getByRole('alert');
    this.successMessage = page.getByText(/inscrit|enrolled/i);
  }

  async goto() {
    await this.navigate('/cursos');
    await this.waitForPageLoad();
  }

  async enrollInCourse(courseTitle: string) {
    const card = this.page.locator(`text=${courseTitle}`).locator('..').locator('..');
    await card.getByRole('button', { name: /inscribir/i }).click();
  }

  async getCourseCount(): Promise<number> {
    return this.courseCards.count();
  }
}
