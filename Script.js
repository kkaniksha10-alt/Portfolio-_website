document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });
  }

  // 2. Interactive Modals
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const closeButtons = document.querySelectorAll('.close-modal');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      event.target.classList.remove('active');
      event.target.setAttribute('aria-hidden', 'true');
    }
  });

  // 3. Form Validation & Interactivity
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      // Clear previous error messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formStatus.textContent = '';

      let isValid = true;

      if (name === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
      }

      if (email === '' || !validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (message === '') {
        messageError.textContent = 'Message cannot be empty.';
        isValid = false;
      }

      if (isValid) {
        formStatus.style.color = '#16a34a';
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        contactForm.reset();
      } else {
        formStatus.style.color = '#dc2626';
        formStatus.textContent = 'Please correct the errors above and try again.';
      }
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
