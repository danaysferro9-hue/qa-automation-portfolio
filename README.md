# QA Automation Portfolio — Playwright + TypeScript

[![Playwright Tests](https://github.com/YOUR_USERNAME/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/YOUR_USERNAME/qa-automation-portfolio/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.50-green)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

End-to-end, API, and accessibility test suite built with **Playwright + TypeScript** targeting [Automation Exercise](https://automationexercise.com) — a public e-commerce demo application.

This project demonstrates production-ready QA automation practices including Page Object Model, fixture-based composition, CI/CD integration, and WCAG 2.1 AA accessibility coverage.

---

## What's covered

| Layer | Tests | Tags |
|-------|-------|------|
| E2E — Authentication | 5 | `@smoke` `@regression` |
| E2E — Products | 5 | `@smoke` `@regression` |
| E2E — Shopping Cart | 4 | `@smoke` `@regression` |
| API — Products & Brands | 6 | `@smoke` `@regression` |
| Accessibility (axe-core) | 4 | `@smoke` `@regression` |
| **Total** | **24** | |

---

## Tech stack

- **[Playwright](https://playwright.dev/)** — cross-browser E2E + API testing
- **TypeScript** — strict mode, path aliases
- **axe-core / @axe-core/playwright** — WCAG 2.1 AA accessibility audits
- **GitHub Actions** — parallel matrix CI with sharding (6 workers)
- **Page Object Model** — maintainable, reusable selectors
- **Custom fixtures** — clean test setup with dependency injection

---

## Project structure

```
qa-automation-portfolio/
├── .github/workflows/playwright.yml   # CI: matrix + sharding
├── src/
│   ├── pages/                         # Page Object Model
│   │   ├── base.page.ts
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   ├── products.page.ts
│   │   └── cart.page.ts
│   ├── fixtures/
│   │   └── base.fixture.ts            # Composed page fixtures
│   └── utils/
│       └── test-data-factory.ts       # Dynamic test data generation
├── tests/
│   ├── e2e/
│   │   ├── auth/login.spec.ts
│   │   ├── products/products.spec.ts
│   │   └── cart/cart.spec.ts
│   ├── api/
│   │   └── products-api.spec.ts
│   └── accessibility/
│       └── home-a11y.spec.ts
├── playwright.config.ts
└── .env.example
```

---

## Getting started

### Prerequisites
- Node.js 20+
- npm 9+

### Install

```bash
git clone https://github.com/YOUR_USERNAME/qa-automation-portfolio.git
cd qa-automation-portfolio
npm install
npx playwright install
```

### Configure environment

```bash
cp .env.example .env
# Edit .env with your test credentials
```

### Run tests

```bash
# All tests
npm test

# By layer
npm run test:e2e
npm run test:api
npm run test:a11y

# By tag
npm run test:smoke
npm run test:regression

# Interactive UI mode
npm run test:ui

# View last report
npm run test:report
```

---

## CI/CD

GitHub Actions runs the full suite on every push and PR, plus a daily scheduled run (Mon–Fri 8am UTC):

- **Matrix strategy**: Chromium, Firefox, WebKit
- **Sharding**: 2 shards per browser (6 parallel jobs)
- **Artifacts**: HTML report uploaded for 30 days on every run
- **Separate API job**: fast feedback on API layer independently

---

## Key design decisions

| Decision | Rationale |
|----------|-----------|
| Page Object Model | Isolates locators from test logic; one change to fix many tests |
| Custom fixtures | Avoids boilerplate in every test; enables dependency injection |
| `getByRole` / `getByLabel` / `data-qa` selectors | Resilient to CSS refactors, aligned with accessibility semantics |
| Dynamic test data factory | Tests never depend on pre-existing data; fully independent |
| No `waitForTimeout` | All waits are semantic (network idle, element state, response) |
| Axe-core integration | Catches accessibility regressions automatically in CI |

---

## Author

**Danays Ernesto**
QA Automation Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/YOUR_PROFILE)
