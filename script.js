// Sample course data
const courses = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the fundamentals of programming with Python",
    image: "https://source.unsplash.com/random/600x400/?coding"
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    description: "Build modern web applications with HTML, CSS, and JavaScript",
    image: "https://source.unsplash.com/random/600x400/?webdevelopment"
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis and visualization",
    image: "https://source.unsplash.com/random/600x400/?datascience"
  }
];

// DOM Elements
const mainContent = document.getElementById('mainContent');
const authModal = document.getElementById('authModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Update active link
    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    e.target.classList.add('active');
    
    // Load content
    const page = e.target.dataset.page;
    if (page === 'courses') {
      loadCoursesPage();
    } else if (page === 'teachers') {
      loadTeachersPage();
    } else {
      loadHomePage();
    }
  });
});

// Auth buttons
document.getElementById('loginBtn').addEventListener('click', () => showAuthModal('login'));
document.getElementById('signupBtn').addEventListener('click', () => showAuthModal('signup'));
closeBtn.addEventListener('click', () => authModal.classList.remove('active'));

// Close modal when clicking outside
authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.classList.remove('active');
  }
});

// Initial load
loadHomePage();

// Page loading functions
function loadHomePage() {
  mainContent.innerHTML = `
    <section class="hero">
      <div class="container">
        <h1>Learn Without Limits</h1>
        <p>Start, switch, or advance your career with our comprehensive courses</p>
        <button class="btn btn-primary" id="exploreBtn">Explore Courses</button>
      </div>
    </section>
    <section class="courses-section">
      <div class="container">
        <div class="section-title">
          <h2>Popular Courses</h2>
          <p>Discover our most popular courses</p>
        </div>
        <div class="courses-grid">
          ${courses.slice(0, 3).map(course => `
            <div class="course-card">
              <div class="course-image" style="background-image: url('${course.image}')"></div>
              <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <button class="enroll-btn">Enroll Now</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
  
  document.getElementById('exploreBtn').addEventListener('click', () => {
    document.querySelector('[data-page="courses"]').click();
  });
}

function loadCoursesPage() {
  mainContent.innerHTML = `
    <section class="courses-section">
      <div class="container">
        <div class="section-title">
          <h2>All Courses</h2>
          <p>Browse our complete course catalog</p>
        </div>
        <div class="courses-grid">
          ${courses.map(course => `
            <div class="course-card">
              <div class="course-image" style="background-image: url('${course.image}')"></div>
              <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <button class="enroll-btn">Enroll Now</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function loadTeachersPage() {
  mainContent.innerHTML = `
    <section class="courses-section">
      <div class="container">
        <div class="section-title">
          <h2>Our Instructors</h2>
          <p>Learn from industry experts</p>
        </div>
        <div class="courses-grid">
          <div class="course-card">
            <div class="course-image" style="background-image: url('https://source.unsplash.com/random/600x400/?teacher')"></div>
            <div class="course-content">
              <h3 class="course-title">Dr. Sarah Johnson</h3>
              <p class="course-description">Computer Science Professor with 10+ years experience</p>
            </div>
          </div>
          <div class="course-card">
            <div class="course-image" style="background-image: url('https://source.unsplash.com/random/600x400/?professor')"></div>
            <div class="course-content">
              <h3 class="course-title">Mark Williams</h3>
              <p class="course-description">Senior Web Developer and Educator</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Auth modal functions
function showAuthModal(type) {
  if (type === 'login') {
    modalBody.innerHTML = `
      <h2>Login to Your Account</h2>
      <form class="auth-form" id="loginForm">
        <div class="form-group">
          <label for="loginEmail">Email</label>
          <input type="email" id="loginEmail" required>
        </div>
        <div class="form-group">
          <label for="loginPassword">Password</label>
          <input type="password" id="loginPassword" required>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-outline" id="cancelLogin">Cancel</button>
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    `;
  } else {
    modalBody.innerHTML = `
      <h2>Create an Account</h2>
      <form class="auth-form" id="signupForm">
        <div class="form-group">
          <label for="signupName">Full Name</label>
          <input type="text" id="signupName" required>
        </div>
        <div class="form-group">
          <label for="signupEmail">Email</label>
          <input type="email" id="signupEmail" required>
        </div>
        <div class="form-group">
          <label for="signupPassword">Password</label>
          <input type="password" id="signupPassword" required>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-outline" id="cancelSignup">Cancel</button>
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </div>
      </form>
    `;
  }
  
  authModal.classList.add('active');
  
  // Add form handlers
  document.getElementById('cancelLogin')?.addEventListener('click', () => authModal.classList.remove('active'));
  document.getElementById('cancelSignup')?.addEventListener('click', () => authModal.classList.remove('active'));
  
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login functionality would connect to backend in a real app');
    authModal.classList.remove('active');
  });
  
  document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Signup functionality would connect to backend in a real app');
    authModal.classList.remove('active');
  });
}