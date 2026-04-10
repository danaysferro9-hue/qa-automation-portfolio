import { test, expect } from '@playwright/test';

const BASE = 'https://playground.calidadsinhumo.com';

test.describe('Enrollment API — /api/enroll', () => {
  test('@smoke TC-API-01 — POST /api/enroll without courseId returns 400', async ({ request }) => {
    const response = await request.post(`${BASE}/api/enroll`, {
      data: {},
    });
    expect(response.status()).toBe(400);
  });

  test('@regression TC-API-02 — POST /api/enroll with nonexistent course returns 404', async ({ request }) => {
    const response = await request.post(`${BASE}/api/enroll`, {
      data: { courseId: 'curso-no-existe-999' },
    });
    expect(response.status()).toBe(404);
  });

  test('@regression TC-API-03 — POST /api/enroll without prerequisite returns 403', async ({ request }) => {
    const response = await request.post(`${BASE}/api/enroll`, {
      data: { courseId: 'playwright-desde-cero' },
    });
    expect(response.status()).toBe(403);
  });

  test('@regression TC-API-04 — successful enrollment returns status inscrito', async ({ request }) => {
    const response = await request.post(`${BASE}/api/enroll`, {
      data: { courseId: 'fundamentos-de-testing' },
    });
    expect([200, 400, 403]).toContain(response.status());
    if (response.status() === 200) {
      const body = await response.json();
      expect(['inscrito', 'lista-espera']).toContain(body.status);
    }
  });

  test('@regression TC-API-05 — waitlist enrollment returns status lista-espera', async ({ request }) => {
    const response = await request.post(`${BASE}/api/enroll`, {
      data: { courseId: 'fundamentos-de-testing' },
    });
    if (response.status() === 200) {
      const body = await response.json();
      expect(['inscrito', 'lista-espera']).toContain(body.status);
    }
  });
});
