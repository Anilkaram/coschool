import Auth from './auth.js';
import Course from './course.js';

document.addEventListener('DOMContentLoaded', () => {
  const auth = new Auth();
  const course = new Course();
  
  // Check auth status on load
  auth.checkAuthStatus();
  
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      
      if (page === 'courses') {
        course.loadCourses();
      } else {
        // Load home page
        document.getElementById('main-content').innerHTML = `
          <section class="hero">
            <h2>Learn Without Limits</h2>
            <p>Start your learning journey today</p>
          </section>
        `;
      }
    });
  });
  
  // Initial load
  document.querySelector('[data-page="home"]').click();
});