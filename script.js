// Dan & Dor Solar Company Limited — script.js

(function () {
  'use strict';

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  }));

  // Scroll reveal
  document.querySelectorAll(
    '.service-card,.why-card,.testi-card,.process-step,.value-item,.contact-detail-item,.about-images,.about-content,.process-left,.process-right,.contact-left,.contact-right'
  ).forEach(el => el.classList.add('reveal'));

  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 }).observe(document.body) || (() => {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); o.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
  })();

  // Re-run reveal observer properly
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => revealObs.observe(el));

  // Stagger service cards
  document.querySelectorAll('.service-card, .why-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });

  // Counter animation
  function animateCount(el, target, suffix) {
    let n = 0; const step = target / 50;
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = Math.floor(n) + suffix;
      if (n >= target) clearInterval(t);
    }, 30);
  }
  const trustObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const items = document.querySelectorAll('.trust-item strong');
      const data = [{ v: 500, s: '+' }, { v: 5, s: '.0★' }, { v: 100, s: '%' }];
      items.forEach((el, i) => animateCount(el, data[i].v, data[i].s));
      trustObs.disconnect();
    }
  }, { threshold: 0.6 });
  const trustEl = document.querySelector('.hero-trust');
  if (trustEl) trustObs.observe(trustEl);

  // Contact form
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
      setTimeout(() => {
        btn.innerHTML = 'Send My Request <i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 6000);
      }, 1800);
    });
  }

  // Footer year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' }); }
    });
  });

})();
