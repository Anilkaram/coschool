import Auth from './auth.js';
import Course from './course.js';

document.addEventListener('DOMContentLoaded', () => {
  const auth = new Auth();
  const course = new Course();

  // Initialize auth status
  auth.checkAuthStatus();

  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active state
      document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
      e.target.classList.add('active');
      
      // Load appropriate content
      const page = e.target.dataset.page;
      if (page === 'courses') {
        course.loadCourses();
      } else if (page === 'home') {
        document.querySelector('main').innerHTML = `
          <section class="hero">
            <div class="container">
              <h1>Learn Without Limits</h1>
              <p>Start, switch, or advance your career with our comprehensive courses taught by industry experts.</p>
              <button class="btn btn-primary" id="heroBtn">Browse Courses</button>
            </div>
          </section>
          <section class="courses-section">
            <div class="container">
              <div class="section-title">
                <h2>Popular Courses</h2>
                <p>Discover our most popular courses loved by thousands of students</p>
              </div>
              <div class="courses-grid" id="coursesContainer"></div>
            </div>
          </section>
        `;
        course.loadCourses();
      }
    });
  });

  // Hero button
  document.addEventListener('click', (e) => {
    if (e.target.id === 'heroBtn') {
      document.querySelector('[data-page="courses"]').click();
    }
  });

  // Initial load
  document.querySelector('[data-page="home"]').click();
});