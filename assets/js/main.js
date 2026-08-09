/* 本文件以 defer 加载：解析完成后立即执行，无需等待 DOMContentLoaded */
(function () {
  var langToggle = document.getElementById('langToggle');
  var langDropdown = document.getElementById('langDropdown');
  var langOptions = document.querySelectorAll('.lang-option');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var backToTop = document.getElementById('backToTop');

  /* ===== 语言 =====
     多语言完全由 URL 决定：/zh/ /en/ /ja/ 各是一份完整的静态 HTML，
     切换语言 = 跳到另一个 URL。本文件不再改写任何正文，
     更不会碰 title / description / keywords / og:* / twitter:* / canonical ——
     它们由各语言页面自己静态写死，爬虫抓到哪个 URL 就收录哪种语言。
     请勿在此处重新引入 translations 之类的运行时翻译表。

     JS 在语言这件事上只做两件事：
       1. 记下用户点选的语言，供根目录 / 的跳转脚本下次使用
       2. 浏览器语言与当前页面语言不一致时，弹一条「可以切换」的提示
     绝不自动跳转 —— 按环境语言自动切换正是首页曾被误收录成英文的原因。 */
  var LANG_HOME = { 'zh-CN': '/zh/', en: '/en/', ja: '/ja/' };
  var pageLang = document.documentElement.getAttribute('lang') || 'zh-CN';

  function rememberLang(lang) {
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  langToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });

  /* 下拉里的每一项都是真链接，点击后浏览器正常跳转；
     这里只顺手把选择写进 localStorage，不拦截默认行为。 */
  langOptions.forEach(function (opt) {
    opt.addEventListener('click', function () {
      rememberLang(this.getAttribute('data-lang'));
    });
  });

  document.addEventListener('click', function () {
    langDropdown.classList.remove('open');
  });
  langDropdown.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  /* ===== 语言提示横幅 =====
     浏览器环境语言与当前页面语言不一致、且用户还没在本站选过语言时，
     用对方的语言提示「可以切换」，点一下才跳转。

     整段由 JS 动态创建，不写进 HTML：静态源码保持单一语言，
     curl 抓到的就是该语言的纯净页面；元素上标注 lang 属性，
     让搜索引擎知道这一小块是外语片段，页面主体语言仍为 html[lang] 声明的那个。 */
  var LANG_BANNER = {
    'zh-CN': {
      text: '本站提供简体中文版本，是否切换？',
      action: '切换到中文',
      close: '关闭'
    },
    en: {
      text: 'This site is available in English. Would you like to switch?',
      action: 'Switch to English',
      close: 'Dismiss'
    },
    ja: {
      text: 'このサイトは日本語版もあります。切り替えますか？',
      action: '日本語に切り替える',
      close: '閉じる'
    }
  };

  function detectBannerLang() {
    /* 只决定「要不要提示」，绝不用来决定页面实际语言 */
    var navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    var target = null;
    if (navLang.indexOf('zh') === 0) target = 'zh-CN';
    else if (navLang.indexOf('ja') === 0) target = 'ja';
    else if (navLang.indexOf('en') === 0) target = 'en';
    /* 已经在看对应语言的页面就不用提示了 */
    return target && target !== pageLang ? target : null;
  }

  function initLangBanner() {
    var stored = null;
    var dismissed = null;
    try {
      stored = localStorage.getItem('lang');
      dismissed = localStorage.getItem('langBannerDismissed');
    } catch (e) {}
    if (stored || dismissed) return; // 已选过语言，或已手动关闭过提示

    var lang = detectBannerLang();
    if (!lang) return;
    var t = LANG_BANNER[lang];

    var banner = document.createElement('div');
    banner.className = 'lang-banner';
    banner.setAttribute('lang', lang);
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', t.action);
    banner.innerHTML =
      '<svg class="icon icon-w125 lang-banner-icon" aria-hidden="true"><use href="#i-language"/></svg>' +
      '<div class="lang-banner-body">' +
        '<p class="lang-banner-text"></p>' +
        '<a class="lang-banner-switch" href="' + LANG_HOME[lang] + '" hreflang="' + lang + '"></a>' +
      '</div>' +
      '<button type="button" class="lang-banner-close">×</button>';

    var switchLink = banner.querySelector('.lang-banner-switch');
    var closeBtn = banner.querySelector('.lang-banner-close');
    /* 文案一律用 textContent 写入，不让它们被当成 HTML 解析 */
    banner.querySelector('.lang-banner-text').textContent = t.text;
    switchLink.textContent = t.action;
    closeBtn.setAttribute('aria-label', t.close);
    document.body.appendChild(banner);

    function hide() {
      banner.classList.remove('show');
      document.removeEventListener('keydown', onKeydown);
      setTimeout(function () {
        if (banner.parentNode) banner.parentNode.removeChild(banner);
      }, 300); // 等淡出过渡结束再移除
    }
    function dismiss() {
      try { localStorage.setItem('langBannerDismissed', '1'); } catch (e) {}
      hide();
    }
    function onKeydown(e) {
      if (e.key === 'Escape') dismiss();
    }

    /* 是真链接，点了就跳转；这里只记下选择，下次进站不再提示 */
    switchLink.addEventListener('click', function () {
      rememberLang(lang);
    });
    closeBtn.addEventListener('click', dismiss);
    document.addEventListener('keydown', onKeydown);

    /* 下一帧再加 .show，保证入场过渡能触发 */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.classList.add('show'); });
    });
  }

  initLangBanner();

  /* 主题不在 JS 里管：深浅色完全交给 style.css 的 prefers-color-scheme 媒体查询，
     浏览器会在系统切换时自动重算，无需监听 matchMedia，也没有可写的用户偏好。 */

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  var navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

  /* 只跟踪真正有导航项的 section。#blog 没有对应导航项，
     若把它算进来，滚到它上面时高亮就会整个消失 */
  var trackedSections = [];
  navLinkItems.forEach(function (link) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target && target.id) trackedSections.push({ el: target, link: link });
  });

  function setActive(link) {
    navLinkItems.forEach(function (item) {
      item.classList.toggle('active', item === link);
    });
  }

  var HEADER_H = 64; /* 吸顶 header 的高度，被它盖住的部分不算露出 */

  if (window.IntersectionObserver && trackedSections.length) {
    /* 以「露出比例」判定当前 section：露出高度 ÷ 它自己能露出的最大高度
       （section 高度与可视区高度取小者）。
       不能直接比露出高度 —— #friends 比可视区矮得多，页面又滚不过它，
       停在页面底部时它露得再全，绝对高度也赢不过上面的 #contact，
       导航就永远高亮不到它。换成比例后，整节都露出来的一方胜出。
       比可视区高的长 section 分母同为可视区高，排序与原来一致。 */
    var visibleHeight = {};
    var thresholds = [];
    for (var i = 0; i <= 20; i++) thresholds.push(i / 20);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visibleHeight[entry.target.id] = entry.isIntersecting ? entry.intersectionRect.height : 0;
      });
      var best = null;
      var bestRatio = 0;
      var rootH = window.innerHeight - HEADER_H;
      trackedSections.forEach(function (s) {
        var h = visibleHeight[s.el.id] || 0;
        if (!h) return;
        var ratio = h / Math.max(1, Math.min(s.el.offsetHeight, rootH));
        if (ratio > bestRatio) { bestRatio = ratio; best = s.link; }
      });
      /* 全部为 0（例如正停在 #blog 上）时保持当前高亮，避免闪烁 */
      if (best) setActive(best);
    }, {
      threshold: thresholds,
      rootMargin: '-' + HEADER_H + 'px 0px 0px 0px'
    });

    trackedSections.forEach(function (s) { observer.observe(s.el); });
  }

  function updateBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  /* 用 rAF 节流滚动回调，避免每个滚动事件都做一次 DOM 写入 */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      updateBackToTop();
    });
  }, { passive: true });
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
})();
