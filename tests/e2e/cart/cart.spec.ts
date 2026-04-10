import { test, expect } from '@fixtures/base.fixture';

test.describe('Shopping Cart', () => {
  test('@smoke TC-CART-01 — cart page loads', async ({ cartPage }) => {
    await cartPage.goto();
    await expect(cartPage.page).toHaveURL(/view_cart/);
  });

  test('@regression TC-CART-02 — empty cart shows message', async ({ cartPage }) => {
    await cartPage.goto();
    const count = await cartPage.getItemCount();
    if (count === 0) {
      await expect(cartPage.emptyCartMessage).toBeVisible();
    }
  });

  test('@regression TC-CART-03 — add item and verify cart count increases', async ({
    productsPage,
    cartPage,
    homePage,
  }) => {
    await productsPage.goto();
    await productsPage.addFirstProductToCart();
    await homePage.goToCart();
    const count = await cartPage.getItemCount();
    expect(count).toBeGreaterThan(0);
  });

  test('@regression TC-CART-04 — remove item from cart', async ({
    productsPage,
    cartPage,
    homePage,
  }) => {
    await productsPage.goto();
    await productsPage.addFirstProductToCart();
    await homePage.goToCart();
    const before = await cartPage.getItemCount();
    await cartPage.removeFirstItem();
    const after = await cartPage.getItemCount();
    expect(after).toBe(before - 1);
  });
});
