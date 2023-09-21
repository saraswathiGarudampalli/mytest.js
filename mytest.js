import { Selector } from 'testcafe';

fixture`SDLMS Login Tests`
  .page`https://dev.deepthought.education/login`;

// Test Case 1: Successful login with valid credentials
test('Login with valid username and password', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');

  await t
    .typeText(usernameInput, 'Saraswathi') // Replace with a valid username
    .typeText(passwordInput, 'Saru@2002') // Replace with a valid password
    .click(loginButton)
    .expect(Selector('dashboard-selector').exists).ok(); // Replace with a selector on the dashboard page
});

// Test Case 2: Attempt login with empty username and password
test('Login with empty username and password', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');

  await t
    .click(loginButton)
    .expect(Selector('.error-message').innerText).contains('Username or password is required');
});

// Test Case 3: Attempt login with valid username and incorrect password
test('Login with valid username and incorrect password', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');

  await t
    .typeText(usernameInput, 'Saraswathi') // Replace with a valid username
    .typeText(passwordInput, 'Saru@2121') // Replace with an incorrect password
    .click(loginButton)
    .expect(Selector('.error-message').innerText).contains('Invalid credentials');
});

// Test Case 4: Attempt login with invalid username and valid password
test('Login with invalid username and valid password', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');

  await t
    .typeText(usernameInput, 'invalid_username') // Replace with an invalid username
    .typeText(passwordInput, 'valid_password') // Replace with a valid password
    .click(loginButton)
    .expect(Selector('.error-message').innerText).contains('Invalid credentials');
});

// Test Case 5: Attempt login with special characters in username
test('Login with special characters in username', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');

  await t
    .typeText(usernameInput, '!@#$%^&*()') // Special characters in username
    .typeText(passwordInput, 'valid_password') // Replace with a valid password
    .click(loginButton)
    .expect(Selector('.error-message').innerText).contains('Invalid username format');
});

// Test Case 6: Attempt login with a very long username
test('Login with a very long username', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');

  await t
    .typeText(usernameInput, 'a'.repeat(300)) // A very long username
    .typeText(passwordInput, 'valid_password') // Replace with a valid password
    .click(loginButton)
    .expect(Selector('.error-message').innerText).contains('Invalid username format');
});

// Test Case 7: Attempt login with a very long password
test('Login with a very long password', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');

  await t
    .typeText(usernameInput, 'valid_username') // Replace with a valid username
    .typeText(passwordInput, 'a'.repeat(300)) // A very long password
    .click(loginButton)
    .expect(Selector('.error-message').innerText).contains('Invalid password format');
});

// Test Case 8: Attempt login with SQL injection in username
test('Login with SQL injection in username', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');

  await t
    .typeText(usernameInput, "' OR 1=1 --") // SQL injection attempt in username
    .typeText(passwordInput, 'valid_password') // Replace with a valid password
    .click(loginButton)
    .expect(Selector('.error-message').innerText).contains('Invalid credentials');
});

// Test Case 9: Attempt login with XSS attack in password
test('Login with XSS attack in password', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');

  await t
    .typeText(usernameInput, 'valid_username') // Replace with a valid username
    .typeText(passwordInput, '<script>alert("XSS Attack");</script>') // XSS attack in password
    .click(loginButton)
    .expect(Selector('.error-message').innerText).contains('Invalid password format');
});

// Test Case 10: Attempt login with valid username and password, then log out
test('Login, then log out', async (t) => {
  const usernameInput = Selector('#username');
  const passwordInput = Selector('#password');
  const loginButton = Selector('#login');
  const logoutButton = Selector('#logout'); // Replace with
