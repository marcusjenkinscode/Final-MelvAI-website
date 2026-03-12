// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
    });
  });
}

// ===== Header Scroll Shadow =====
const header = document.getElementById('header');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  var scrollY = window.scrollY + 100;

  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    var sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Fade-In on Scroll (Intersection Observer) =====
var fadeElements = document.querySelectorAll('.card, .feature, .stat, .about__text');

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in', 'visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// ===== Stat Counter Animation =====
var statNumbers = document.querySelectorAll('.stat__number[data-target]');

if ('IntersectionObserver' in window) {
  var statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = parseInt(entry.target.getAttribute('data-target'), 10);
          animateCounter(entry.target, target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(function (el) {
    statObserver.observe(el);
  });
}

function animateCounter(element, target) {
  var current = 0;
  var duration = 1500;
  var stepTime = Math.max(Math.floor(duration / target), 16);

  var timer = setInterval(function () {
    current += 1;
    element.textContent = current;
    if (current >= target) {
      clearInterval(timer);
      element.textContent = target;
    }
  }, stepTime);
}

// ===== Contact Form Handling =====
var contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var formData = new FormData(contactForm);
    var name = formData.get('name');
    var email = formData.get('email');
    var message = formData.get('message');

    if (!name || !email || !message) {
      return;
    }

    // Show a simple confirmation (replace with actual backend integration)
    var btn = contactForm.querySelector('.btn');
    var originalText = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.disabled = true;

    setTimeout(function () {
      btn.textContent = originalText;
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}
