import { test, expect } from '@playwright/test';

const API_URL = 'https://automationexercise.com/api';

test.describe('Products API', () => {
  test('@smoke TC-API-01 — GET /productsList returns 200 with products', async ({ request }) => {
    const response = await request.get(`${API_URL}/productsList`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeDefined();
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('@regression TC-API-02 — GET /productsList product has required fields', async ({ request }) => {
    const response = await request.get(`${API_URL}/productsList`);
    const body = await response.json();
    const product = body.products[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('category');
  });

  test('@regression TC-API-03 — POST /productsList returns 405 method not allowed', async ({ request }) => {
    const response = await request.post(`${API_URL}/productsList`);
    const body = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('not supported');
  });

  test('@smoke TC-API-04 — GET /brandsList returns brand list', async ({ request }) => {
    const response = await request.get(`${API_URL}/brandsList`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBe(true);
  });

  test('@regression TC-API-05 — POST /searchProduct returns results', async ({ request }) => {
    const response = await request.post(`${API_URL}/searchProduct`, {
      form: { search_product: 'top' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('@regression TC-API-06 — POST /searchProduct without param returns 400', async ({ request }) => {
    const response = await request.post(`${API_URL}/searchProduct`);
    const body = await response.json();
    expect(body.responseCode).toBe(400);
  });
});
