// Redirect to saved language version before render
(function () {
  const saved = localStorage.getItem('lang');
  if (!saved) return;
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  const isEn = filename.endsWith('-en.html');
  if (saved === 'en' && !isEn) {
    window.location.replace(filename.replace('.html', '-en.html'));
  } else if (saved === 'no' && isEn) {
    window.location.replace(filename.replace('-en.html', '.html'));
  }
})();

function switchLang(lang) {
  localStorage.setItem('lang', lang);
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  if (lang === 'en') {
    window.location.href = filename.replace('.html', '-en.html');
  } else {
    window.location.href = filename.replace('-en.html', '.html');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // ── Active nav link ──────────────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Hamburger menu ───────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Smooth scroll to #contact ────────────────────
  document.querySelectorAll('a[href="#contact"], a[href="index.html#contact"], a[href="index-en.html#contact"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector('#contact');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
