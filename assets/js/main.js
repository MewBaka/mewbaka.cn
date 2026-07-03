document.addEventListener('DOMContentLoaded', function () {
  var html = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var backToTop = document.getElementById('backToTop');

  function getPreferredTheme() {
    var stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  setTheme(getPreferredTheme());

  toggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  var navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = document.querySelectorAll('section[id]');

  function updateActive() {
    var current = '';
    sections.forEach(function (section) {
      var top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinkItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  function updateBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', function () {
    updateActive();
    updateBackToTop();
  });
  updateActive();
  updateBackToTop();

  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  var wechatCard = document.getElementById('wechatCard');
  if (wechatCard) {
    wechatCard.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('popup-open');
    });
    document.addEventListener('click', function (e) {
      if (!wechatCard.contains(e.target)) {
        wechatCard.classList.remove('popup-open');
      }
    });
  }
});
