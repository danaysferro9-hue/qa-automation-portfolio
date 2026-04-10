# Portafolio QA Automation — Playwright + TypeScript

[![Playwright Tests](https://github.com/danaysferro9-hue/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/danaysferro9-hue/qa-automation-portfolio/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.50-green)](https://playwright.dev/)
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](LICENSE)

Suite de pruebas end-to-end, API y accesibilidad construida con **Playwright + TypeScript** sobre [Academia sin Humo Playground](https://playground.calidadsinhumo.com) — una aplicación pública de práctica diseñada para el aprendizaje de automatización de pruebas.

Este proyecto demuestra prácticas de QA Automation listas para producción: Page Object Model, fixtures, análisis de valores límite, partición de equivalencias, pruebas de tabla de decisiones, transiciones de estado e integración CI/CD con cobertura de accesibilidad WCAG 2.1 AA.

---

## Cobertura de pruebas

| Capa | Módulo | Tests | Técnica |
|------|--------|-------|---------|
| E2E | Login | 7 | Valores límite, bloqueo por intentos fallidos |
| E2E | Registro | 12 | Partición de equivalencias, valores límite |
| E2E | Cursos | 6 | Tabla de decisiones |
| E2E | Progreso | 6 | Transiciones de estado |
| API | Enrollment API | 5 | Validación de contratos HTTP |
| Accesibilidad | WCAG 2.1 AA | 5 | Auditorías con axe-core |
| **Total** | | **41** | |

---

## Stack tecnológico

| Herramienta | Propósito |
|-------------|-----------|
| [Playwright](https://playwright.dev/) | E2E cross-browser + pruebas de API |
| TypeScript (strict) | Código de pruebas con tipado estricto |
| @axe-core/playwright | Auditorías de accesibilidad WCAG 2.1 AA |
| GitHub Actions | CI con matrix de navegadores |
| Page Object Model | Locators reutilizables y mantenibles |
| Custom fixtures | Inyección de dependencias por test |

---

## Estructura del proyecto

```
qa-automation-portfolio/
├── .github/workflows/playwright.yml   # CI: Chromium + Firefox + Safari + API
├── src/
│   ├── pages/                         # Page Object Model
│   │   ├── base.page.ts               # Clase base con métodos compartidos
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   ├── register.page.ts
│   │   ├── courses.page.ts
│   │   └── progress.page.ts
│   ├── fixtures/
│   │   └── base.fixture.ts            # Fixtures compuestos por página
│   └── utils/
│       └── test-data-factory.ts       # Datos de prueba y constantes de límites
├── tests/
│   ├── e2e/
│   │   ├── auth/login.spec.ts         # 7 pruebas de login
│   │   ├── auth/register.spec.ts      # 12 pruebas de registro
│   │   ├── courses/courses.spec.ts    # 6 pruebas de inscripción
│   │   └── progress/progress.spec.ts  # 6 pruebas de transición de estado
│   ├── api/
│   │   └── enroll-api.spec.ts         # 5 pruebas de contrato de API
│   └── accessibility/
│       └── home-a11y.spec.ts          # 5 pruebas WCAG 2.1 AA
├── playwright.config.ts
└── .env.example
```

---

## Cómo ejecutar

### Requisitos previos
- Node.js 20+
- npm 9+

### Instalación

```bash
git clone https://github.com/danaysferro9-hue/qa-automation-portfolio.git
cd qa-automation-portfolio
npm install
npx playwright install
```

### Ejecución de pruebas

```bash
# Todas las pruebas
npm test

# Por capa
npm run test:e2e
npm run test:api
npm run test:a11y

# Por etiqueta
npm run test:smoke
npm run test:regression

# Modo UI interactivo
npm run test:ui

# Ver último reporte
npm run test:report
```

---

## CI/CD

GitHub Actions ejecuta la suite completa en cada push y pull request, más una ejecución diaria programada (lunes a viernes, 8am UTC):

- Chromium, Firefox, WebKit y Mobile Chrome
- Job separado para API (feedback rápido)
- Reporte HTML disponible como artefacto por 30 días

---

## Decisiones de diseño

| Decisión | Justificación |
|----------|---------------|
| Page Object Model | Aísla los locators de la lógica de prueba |
| Fixtures personalizados de Playwright | Inyección de dependencias limpia, sin repetición |
| Selectores `getByRole` / `getByLabel` | Resistentes a cambios de CSS, alineados con accesibilidad |
| Constantes de valores límite en factory | Fuente única de verdad para los límites del sistema |
| Sin `waitForTimeout` en ningún test | Todas las esperas son semánticas |
| axe-core integrado en CI | Detecta regresiones de accesibilidad automáticamente |

---

## Autora

**Danays Ernesto**  
QA Automation Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-blue)](https://linkedin.com/in/YOUR_PROFILE)
