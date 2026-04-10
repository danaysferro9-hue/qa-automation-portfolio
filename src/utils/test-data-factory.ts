export function generateUser() {
  const timestamp = Date.now();
  return {
    name: `Test User ${timestamp}`,
    email: `testuser.${timestamp}@mailinator.com`,
    password: 'TestPass@123',
    firstName: 'Test',
    lastName: 'User',
    company: 'QA Corp',
    address: '123 Test Street',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipCode: '90001',
    mobileNumber: '5551234567',
  };
}

export function generateCard() {
  return {
    name: 'Test User',
    number: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2027',
  };
}
