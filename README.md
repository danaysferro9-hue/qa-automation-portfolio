# QA Automation Portfolio — Playwright + TypeScript

[![Playwright Tests](https://github.com/danaysferro9-hue/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/danaysferro9-hue/qa-automation-portfolio/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.50-green)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

End-to-end, API, and accessibility test suite built with **Playwright + TypeScript** targeting [Academia sin Humo Playground](https://playground.calidadsinhumo.com) — a public QA practice application designed for test automation learning.

This project demonstrates production-ready QA automation practices: Page Object Model, fixture-based composition, boundary value analysis, equivalence partitioning, decision table testing, state transition testing, and CI/CD integration with WCAG 2.1 AA accessibility coverage.

---

## What's covered

| Layer | Module | Tests | Technique |
|-------|--------|-------|-----------|
| E2E | Login | 7 | Boundary values, rate limiting |
| E2E | Registro | 12 | Equivalence partitioning, boundary values |
| E2E | Cursos | 6 | Decision table testing |
| E2E | Progreso | 6 | State transition testing |
| API | Enrollment API | 5 | HTTP contract validation |
| Accessibility | WCAG 2.1 AA | 5 | axe-core audits |
| **Total** | | **41** | |

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Cross-browser E2E + API testing |
| TypeScript (strict) | Type-safe test code |
| @axe-core/playwright | WCAG 2.1 AA accessibility audits |
| GitHub Actions | CI matrix with browser sharding |
| Page Object Model | Maintainable, reusable selectors |
| Custom fixtures | Dependency injection for pages |

---

## Project structure

```
qa-automation-portfolio/
├── .github/workflows/playwright.yml   # CI: Chromium + Firefox + Safari + API
├── src/
│   ├── pages/                         # Page Object Model
│   │   ├── base.page.ts               # Base class with shared methods
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   ├── register.page.ts
│   │   ├── courses.page.ts
│   │   └── progress.page.ts
│   ├── fixtures/
│   │   └── base.fixture.ts            # Composed page fixtures
│   └── utils/
│       └── test-data-factory.ts       # Test data + boundary constants
├── tests/
│   ├── e2e/
│   │   ├── auth/login.spec.ts         # 7 login tests
│   │   ├── auth/register.spec.ts      # 12 registration tests
│   │   ├── courses/courses.spec.ts    # 6 enrollment tests
│   │   └── progress/progress.spec.ts  # 6 state transition tests
│   ├── api/
│   │   └── enroll-api.spec.ts         # 5 API contract tests
│   └── accessibility/
│       └── home-a11y.spec.ts          # 5 WCAG 2.1 AA tests
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
git clone https://github.com/danaysferro9-hue/qa-automation-portfolio.git
cd qa-automation-portfolio
npm install
npx playwright install
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

GitHub Actions runs the full suite on every push and PR, plus a scheduled daily run (Mon–Fri 8am UTC):

- Chromium, Firefox, WebKit + Mobile Chrome
- Separate API job for fast feedback
- HTML report artifact retained 30 days

---

## Key design decisions

| Decision | Rationale |
|----------|-----------|
| Page Object Model | Isolates locators from test logic |
| Custom Playwright fixtures | Clean DI — no boilerplate per test |
| `getByRole` / `getByLabel` selectors | Resilient to CSS changes, a11y-aligned |
| Boundary value constants in factory | Single source of truth for limits |
| No `waitForTimeout` anywhere | All waits are semantic |
| axe-core in CI | Catches accessibility regressions automatically |

---

## Author

**Danays Ernesto**  
QA Automation Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/YOUR_PROFILE)
