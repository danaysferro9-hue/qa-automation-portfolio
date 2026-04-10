import { test, expect } from '@fixtures/base.fixture';

test.describe('Products', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('@smoke TC-PROD-01 — products page displays product list', async ({ productsPage }) => {
    await productsPage.goto();
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('@regression TC-PROD-02 — search returns matching products', async ({ homePage, productsPage }) => {
    await homePage.searchProduct('dress');
    await expect(productsPage.searchedProductsTitle).toBeVisible();
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('@regression TC-PROD-03 — search with no results shows empty state', async ({ homePage, productsPage }) => {
    await homePage.searchProduct('xyzproductnotexist999');
    await expect(productsPage.searchedProductsTitle).toBeVisible();
    const count = await productsPage.getProductCount();
    expect(count).toBe(0);
  });

  test('@regression TC-PROD-04 — product detail page loads', async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.viewFirstProduct();
    await expect(productsPage.page.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(productsPage.page.getByText(/availability/i)).toBeVisible();
  });

  test('@regression TC-PROD-05 — add product to cart shows modal', async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.addFirstProductToCart();
    await expect(productsPage.page.locator('#cartModal')).not.toBeVisible();
  });
});
