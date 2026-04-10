import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly navbar: Locator;
  readonly signupLoginLink: Locator;
  readonly cartLink: Locator;
  readonly productsLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly sliderSection: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = page.locator('#header .navbar');
    this.signupLoginLink = page.getByRole('link', { name: /signup.*login/i });
    this.cartLink = page.getByRole('link', { name: /cart/i });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.sliderSection = page.locator('#slider');
  }

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async searchProduct(term: string) {
    await this.productsLink.click();
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goToProducts() {
    await this.productsLink.click();
  }
}
