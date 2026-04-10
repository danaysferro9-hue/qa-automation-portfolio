export const TEST_USER = {
  email: 'ana.garcia@ejemplo.com',
  password: 'Segura2026!',
  name: 'Ana García',
};

export function generateUser() {
  const timestamp = Date.now();
  return {
    name: `Usuario Test ${timestamp}`,
    email: `test.${timestamp}@ejemplo.com`,
    password: 'Segura2026!',
    age: 25,
  };
}

export const BOUNDARY_AGES = {
  tooYoung: 15,
  minimumValid: 16,
  maximumValid: 99,
  tooOld: 100,
};

export const BOUNDARY_PASSWORDS = {
  tooShort: 'Ab1234',        // 6 chars
  minimumValid: 'Ab123456',  // 8 chars
  maximumValid: 'A'.repeat(63) + '1', // 64 chars
  tooLong: 'A'.repeat(64) + '1',     // 65 chars
};

export const BOUNDARY_NAMES = {
  tooShort: 'A',             // 1 char
  minimumValid: 'Ab',        // 2 chars
  maximumValid: 'A'.repeat(50), // 50 chars
  tooLong: 'A'.repeat(51),  // 51 chars
};
