import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly deleteButtons: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    this.emptyCartMessage = page.locator('#empty_cart');
    this.deleteButtons = page.locator('.cart_delete a');
    this.totalPrice = page.locator('.cart_total_price');
  }

  async goto() {
    await this.navigate('/view_cart');
    await this.waitForPageLoad();
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeFirstItem() {
    await this.deleteButtons.first().click();
    await this.page.waitForResponse(r => r.url().includes('cart') && r.status() === 200);
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}
