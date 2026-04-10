import { test as base } from '@playwright/test';
import { HomePage } from '@pages/home.page';
import { LoginPage } from '@pages/login.page';
import { RegisterPage } from '@pages/register.page';
import { CoursesPage } from '@pages/courses.page';
import { ProgressPage } from '@pages/progress.page';

type Pages = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  coursesPage: CoursesPage;
  progressPage: ProgressPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  coursesPage: async ({ page }, use) => {
    await use(new CoursesPage(page));
  },
  progressPage: async ({ page }, use) => {
    await use(new ProgressPage(page));
  },
});

export { expect } from '@playwright/test';
