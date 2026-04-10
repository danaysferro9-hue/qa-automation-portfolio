import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly productsList: Locator;
  readonly searchResultsSection: Locator;
  readonly searchedProductsTitle: Locator;
  readonly addToCartButtons: Locator;
  readonly viewProductLinks: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productsList = page.locator('.productinfo');
    this.searchResultsSection = page.locator('#cart_items');
    this.searchedProductsTitle = page.getByText('Searched Products');
    this.addToCartButtons = page.locator('[data-product-id]').filter({ hasText: 'Add to cart' });
    this.viewProductLinks = page.getByRole('link', { name: 'View Product' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartButton = page.getByRole('link', { name: 'View Cart' });
  }

  async goto() {
    await this.navigate('/products');
    await this.waitForPageLoad();
  }

  async addFirstProductToCart() {
    await this.productsList.first().hover();
    await this.page.locator('.product-overlay a[data-product-id]').first().click();
    await this.continueShoppingButton.click();
  }

  async viewFirstProduct() {
    await this.viewProductLinks.first().click();
  }

  async getProductCount(): Promise<number> {
    return this.productsList.count();
  }
}
