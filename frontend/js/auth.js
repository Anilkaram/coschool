class Auth {
  constructor() {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.initEventListeners();
  }

  initEventListeners() {
    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', (e) => this.handleLogin(e));
    
    // Register form
    document.getElementById('registerForm')?.addEventListener('submit', (e) => this.handleRegister(e));
    
    // Logout button
    document.getElementById('logoutBtn')?.addEventListener('click', () => this.logout());
  }

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.updateUI();
        window.location.href = '/';
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
  }

  updateUI() {
    const authButtons = document.getElementById('authButtons');
    if (this.user) {
      authButtons.innerHTML = `
        <span>Welcome, ${this.user.username}</span>
        <button id="logoutBtn">Logout</button>
      `;
    } else {
      authButtons.innerHTML = `
        <button id="loginBtn">Login</button>
        <button id="registerBtn">Register</button>
      `;
    }
    this.initEventListeners();
  }

  checkAuth() {
    return !!this.token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
    this.updateUI();
    window.location.href = '/';
  }
}

export default Auth;