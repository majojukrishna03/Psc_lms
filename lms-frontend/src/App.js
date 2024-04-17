// DOM Elements
const rootElement = document.getElementById('root');

// Function to render the welcome page
function renderWelcomePage() {
  rootElement.innerHTML = `
    <div>
      <h1>Welcome to Learning Management System</h1>
      <p>Get started by registering or logging in.</p>
      <button id="registerButton">Register</button>
      <button id="loginButton">Login</button>
    </div>
  `;

  // Event listeners for register and login buttons
  document.getElementById('registerButton').addEventListener('click', () => {
    renderRegistrationPage();
  });

  document.getElementById('loginButton').addEventListener('click', () => {
    renderLoginPage();
  });
}

// Function to render the registration page
function renderRegistrationPage() {
  rootElement.innerHTML = `
    <div>
      <h2>Registration</h2>
      <form id="registrationForm">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <input type="text" name="role" placeholder="Role" required>
        <button type="submit">Register</button>
      </form>
    </div>
  `;

  const registrationForm = document.getElementById('registrationForm');
  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registrationForm);
    const userData = {
      username: formData.get('username'),
      password: formData.get('password'),
      role: formData.get('role')
    };
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        alert('User registered successfully');
        renderWelcomePage();
      } else {
        const data = await response.json();
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration');
    }
  });
}

// Function to render the login page
function renderLoginPage() {
  rootElement.innerHTML = `
    <div>
      <h2>Login</h2>
      <form id="loginForm">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  `;

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const userData = {
      username: formData.get('username'),
      password: formData.get('password')
    };
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        alert('Login successful');
        // Redirect to dashboard or other page
      } else {
        const data = await response.json();
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  });
}

// Initial rendering
renderWelcomePage();
