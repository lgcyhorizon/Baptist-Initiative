/* Baptist Initiative — site JS
   Scroll-reveal, sticky nav, mobile menu, accordions, image parallax. */

(function () {
  'use strict';

  // ---- Sticky nav background shift ----
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 12) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile menu ----
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // close on nav click
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll reveal via IntersectionObserver ----
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Hero figure subtle zoom on load ----
  const heroImg = document.querySelector('.hero-figure img');
  if (heroImg) {
    requestAnimationFrame(() => {
      heroImg.style.transform = 'scale(1.0)';
    });
  }

  // ---- Accordions ----
  document.querySelectorAll('.acc').forEach((acc) => {
    acc.querySelectorAll('.acc-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.acc-item');
        const content = item.querySelector('.acc-content');
        const open = item.classList.toggle('is-open');
        if (open) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = 0;
        }
      });
    });
  });

  // ---- Set current year ----
  const yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- Counselor directory filter (find-a-counselor page) ----
  const search = document.getElementById('counselor-search');
  if (search) {
    const cards = document.querySelectorAll('[data-counselor]');
    search.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      cards.forEach((c) => {
        const text = c.getAttribute('data-counselor').toLowerCase();
        c.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });
  }
})();
