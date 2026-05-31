// Dan & Dor Solar Company Limited

(function(){
  'use strict';

  // Navbar scroll
  const navbar = document.querySelector('.navbar');
  const totop  = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    totop.classList.toggle('show', window.scrollY > 500);
  }, { passive:true });
  totop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // Burger menu
  const burger  = document.getElementById('navBurger');
  const navMenu = document.querySelector('.nav-menu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    navMenu.classList.remove('open');
  }));

  // Scroll reveal
  const revealEls = document.querySelectorAll(
    '.svc,.gal-cell,.why-card,.tcard,.testi-feat,.step-card,.pillar,.cinfo,.ceo-grid,.about-grid,.ceo-stats,.hero-stats'
  );
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.09}s`;
  });
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target); } });
  }, { threshold: 0.1 });
  revealEls.forEach(el => ro.observe(el));

  // Counter animation
  function runCounter(el, target) {
    let n = 0; const step = target / 55;
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = Math.floor(n);
      if(n >= target) clearInterval(t);
    }, 28);
  }
  const statsEl = document.querySelector('.hero-stats');
  if(statsEl){
    const cObs = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        document.querySelectorAll('.hcount').forEach(el => runCounter(el, parseInt(el.dataset.to)));
        cObs.disconnect();
      }
    }, { threshold: 0.6 });
    cObs.observe(statsEl);
  }

  // Contact form
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.fsub');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
      setTimeout(() => {
        btn.innerHTML = 'Send Request <i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 6000);
      }, 1800);
    });
  }

  // Footer year
  const yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); window.scrollTo({ top: t.offsetTop - 68, behavior:'smooth' }); }
    });
  });

})();
