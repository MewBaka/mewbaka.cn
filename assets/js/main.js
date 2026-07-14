document.addEventListener('DOMContentLoaded', function () {
  var html = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var langWrapper = document.querySelector('.lang-wrapper');
  var langDropdown = document.getElementById('langDropdown');
  var langOptions = document.querySelectorAll('.lang-option');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var backToTop = document.getElementById('backToTop');
  var ldJson = document.getElementById('ldJson');

  var translations = {
    'zh-CN': {
      siteTitle: 'MewBaka 笨猫',
      metaDesc: 'MewBaka 笨猫工作室官方网站 - 视觉小说游戏引擎 NarraLeaf Project 开发者，致力于创造有趣的视觉小说体验',
      metaKeywords: 'MewBaka,笨猫,视觉小说,NarraLeaf,Visual Novel,游戏引擎,独立游戏',
      ogTitle: 'MewBaka 笨猫',
      ogDesc: 'MewBaka 笨猫工作室官方网站 - 视觉小说游戏引擎 NarraLeaf Project 开发者',
      twitterTitle: 'MewBaka 笨猫',
      twitterDesc: 'MewBaka 笨猫工作室官方网站 - 视觉小说游戏引擎 NarraLeaf Project 开发者',
      navHome: '主页',
      navNarraLeaf: 'NarraLeaf',
      navContact: '联系我们',
      navBlog: '博客',
      langLabel: '切换语言',
      themeLabel: '切换主题',
      menuLabel: '菜单',
      skipLink: '跳转到内容',
      backTop: '回到顶部',
      heroTitle: '简单又笨蛋的<br/>视觉小说工作室',
      heroDesc: '欢迎来到 MewBaka 笨猫 工作室的官方网站<br/>简单来讲，我们是一个什么都想做的工作室<br/>总要相信，笨蛋也能改变世界',
      narraleafDesc: 'MewBaka 工作室旗下视觉小说引擎产品<br>NarraLeaf Project 是一款现代视觉小说（Visual Novel）游戏引擎，提供多种解决方案<br/>从灵活集成到一体化开发，帮助释放你的创造力',
      narraleafGitBtn: '前往 GitHub 组织',
      narraleafSiteBtn: '前往官方网站',
      blogDesc: '查看最新动态，了解 MewBaka 的事情<br/>欢迎访问 MewBaka Blog 查看更多',
      blogBtn: '前往 Blog',
      contactTitle: '联系我们',
      contactSub: '通过以下渠道即可联系我们',
      qqName: 'QQ 交流总群',
      emailName: '官方邮箱',
      recruitName: '招募联系邮箱',
      externalTitle: '外部链接',
      externalSub: '工作室在部分网站开设的账号',
      githubName: 'GitHub 组织',
      biliName: 'BiliBili 官方',
      afdianName: '爱发电官方',
      wechatName: '微信公众号',
      wechatSub: '扫码关注',
      footerCopy: '\u00a9 2026 笨猫工作室 MewBaka Studio. All Rights Reserved.'
    },
    en: {
      siteTitle: 'MewBaka Studio',
      metaDesc: 'MewBaka Studio official website - Developer of NarraLeaf Project visual novel engine, dedicated to creating fun visual novel experiences',
      metaKeywords: 'MewBaka,Visual Novel,NarraLeaf,game engine,indie game',
      ogTitle: 'MewBaka Studio',
      ogDesc: 'MewBaka Studio official website - Developer of NarraLeaf Project visual novel engine',
      twitterTitle: 'MewBaka Studio',
      twitterDesc: 'MewBaka Studio official website - Developer of NarraLeaf Project visual novel engine',
      navHome: 'Home',
      navNarraLeaf: 'NarraLeaf',
      navContact: 'Contact',
      navBlog: 'Blog',
      langLabel: 'Switch Language',
      themeLabel: 'Toggle Theme',
      menuLabel: 'Menu',
      skipLink: 'Skip to Content',
      backTop: 'Back to Top',
      heroTitle: 'A Simple but Silly<br/>Visual Novel Studio',
      heroDesc: 'Welcome to the official website of MewBaka Studio<br/>Simply put, we want to do everything<br/>Always believe, even fools can change the world',
      narraleafDesc: 'Visual novel engine product by MewBaka Studio<br>NarraLeaf Project is a modern Visual Novel game engine offering multiple solutions<br/>From flexible integration to all-in-one development, helping unleash your creativity',
      narraleafGitBtn: 'Visit GitHub Org',
      narraleafSiteBtn: 'Visit Official Site',
      blogDesc: 'Check out the latest updates about MewBaka<br/>Welcome to MewBaka Blog to learn more',
      blogBtn: 'Visit Blog',
      contactTitle: 'Contact Us',
      contactSub: 'Contact us through the following channels',
      qqName: 'QQ Group',
      emailName: 'Official Email',
      recruitName: 'Recruitment Email',
      externalTitle: 'External Links',
      externalSub: 'Our accounts on various platforms',
      githubName: 'GitHub Org',
      biliName: 'BiliBili Official',
      afdianName: 'Afdian Official',
      wechatName: 'WeChat Official',
      wechatSub: 'Scan to Follow',
      footerCopy: '\u00a9 2026 B\u00e8nM\u0101o Studio MewBaka Studio. All Rights Reserved.'
    },
    ja: {
      siteTitle: 'MewBaka \u7b28\u732b',
      metaDesc: 'MewBaka \u7b28\u732b\u30b9\u30bf\u30b8\u30aa\u516c\u5f0f\u30a6\u30a7\u30d6\u30b5\u30a4\u30c8 - \u30d3\u30b8\u30e5\u30a2\u30eb\u30ce\u30d9\u30eb\u30b2\u30fc\u30e0\u30a8\u30f3\u30b8\u30f3 NarraLeaf Project \u306e\u958b\u767a\u8005',
      metaKeywords: 'MewBaka,\u7b28\u732b,\u30d3\u30b8\u30e5\u30a2\u30eb\u30ce\u30d9\u30eb,NarraLeaf,\u30b2\u30fc\u30e0\u30a8\u30f3\u30b8\u30f3,\u30a4\u30f3\u30c7\u30a3\u30fc\u30b2\u30fc\u30e0',
      ogTitle: 'MewBaka \u7b28\u732b',
      ogDesc: 'MewBaka \u7b28\u732b\u30b9\u30bf\u30b8\u30aa\u516c\u5f0f\u30a6\u30a7\u30d6\u30b5\u30a4\u30c8 - \u30d3\u30b8\u30e5\u30a2\u30eb\u30ce\u30d9\u30eb\u30b2\u30fc\u30e0\u30a8\u30f3\u30b8\u30f3 NarraLeaf Project \u306e\u958b\u767a\u8005',
      twitterTitle: 'MewBaka \u7b28\u732b',
      twitterDesc: 'MewBaka \u7b28\u732b\u30b9\u30bf\u30b8\u30aa\u516c\u5f0f\u30a6\u30a7\u30d6\u30b5\u30a4\u30c8 - \u30d3\u30b8\u30e5\u30a2\u30eb\u30ce\u30d9\u30eb\u30b2\u30fc\u30e0\u30a8\u30f3\u30b8\u30f3 NarraLeaf Project \u306e\u958b\u767a\u8005',
      navHome: '\u30db\u30fc\u30e0',
      navNarraLeaf: 'NarraLeaf',
      navContact: '\u304a\u554f\u3044\u5408\u308f\u305b',
      navBlog: '\u30d6\u30ed\u30b0',
      langLabel: '\u8a00\u8a9e\u5207\u308a\u66ff\u3048',
      themeLabel: '\u30c6\u30fc\u30de\u5207\u308a\u66ff\u3048',
      menuLabel: '\u30e1\u30cb\u30e5\u30fc',
      skipLink: '\u30b3\u30f3\u30c6\u30f3\u30c4\u306b\u30b9\u30ad\u30c3\u30d7',
      backTop: '\u30c8\u30c3\u30d7\u3078\u623b\u308b',
      heroTitle: '\u30b7\u30f3\u30d7\u30eb\u3067\u304a\u30d0\u30ab\u306a<br/>\u30d3\u30b8\u30e5\u30a2\u30eb\u30ce\u30d9\u30eb\u30b9\u30bf\u30b8\u30aa',
      heroDesc: 'MewBaka \u7b28\u732b \u30b9\u30bf\u30b8\u30aa\u306e\u516c\u5f0f\u30a6\u30a7\u30d6\u30b5\u30a4\u30c8\u3078\u3088\u3046\u3053\u305d<br/>\u7c21\u5358\u306b\u8a00\u3046\u3068\u3001\u4f55\u3067\u3082\u3084\u308a\u305f\u3044\u30b9\u30bf\u30b8\u30aa\u3067\u3059<br/>\u3070\u304b\u3067\u3082\u4e16\u754c\u3092\u5909\u3048\u3089\u308c\u308b\u3068\u4fe1\u3058\u3066\u3044\u307e\u3059',
      narraleafDesc: 'MewBaka \u30b9\u30bf\u30b8\u30aa\u304c\u958b\u767a\u3059\u308b\u30d3\u30b8\u30e5\u30a2\u30eb\u30ce\u30d9\u30eb\u30b2\u30fc\u30e0\u30a8\u30f3\u30b8\u30f3<br/>NarraLeaf Project \u306f\u3001\u591a\u69d8\u306a\u30bd\u30ea\u30e5\u30fc\u30b7\u30e7\u30f3\u3092\u63d0\u4f9b\u3059\u308b\u73fe\u4ee3\u7684\u306a\u30d3\u30b8\u30e5\u30a2\u30eb\u30ce\u30d9\u30eb\u30b2\u30fc\u30e0\u30a8\u30f3\u30b8\u30f3\u3067\u3059<br/>\u67d4\u8edf\u306a\u7d71\u5408\u304b\u3089\u4e00\u4f53\u578b\u958b\u767a\u307e\u3067\u3001\u3042\u306a\u305f\u306e\u5275\u9020\u529b\u3092\u5f15\u304d\u51fa\u3057\u307e\u3059',
      narraleafGitBtn: 'GitHub \u7d44\u7e54\u3078',
      narraleafSiteBtn: '\u516c\u5f0f\u30b5\u30a4\u30c8\u3078',
      blogDesc: 'MewBaka \u306e\u6700\u65b0\u60c5\u5831\u3092\u30c1\u30a7\u30c3\u30af<br/>MewBaka Blog \u3067\u3082\u3063\u3068\u8a73\u3057\u304f',
      blogBtn: 'Blog \u3078',
      contactTitle: '\u304a\u554f\u3044\u5408\u308f\u305b',
      contactSub: '\u4e0b\u8a18\u306e\u30c1\u30e3\u30f3\u30cd\u30eb\u304b\u3089\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044',
      qqName: 'QQ \u30b0\u30eb\u30fc\u30d7',
      emailName: '\u516c\u5f0f\u30e1\u30fc\u30eb',
      recruitName: '\u52df\u96c6\u9023\u7d61\u5148',
      externalTitle: '\u5916\u90e8\u30ea\u30f3\u30af',
      externalSub: '\u5404\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u306e\u30a2\u30ab\u30a6\u30f3\u30c8',
      githubName: 'GitHub \u7d44\u7e54',
      biliName: 'BiliBili \u516c\u5f0f',
      afdianName: 'Afdian \u516c\u5f0f',
      wechatName: 'WeChat \u516c\u5f0f',
      wechatSub: '\u30b9\u30ad\u30e3\u30f3\u3057\u3066\u30d5\u30a9\u30ed\u30fc',
      footerCopy: '\u00a9 2026 \u7b28\u732b\u30b9\u30bf\u30b8\u30aa MewBaka Studio. All Rights Reserved.'
    }
  };

  function getPreferredLang() {
    var stored = localStorage.getItem('lang');
    if (stored) return stored;
    var navLang = navigator.language || navigator.userLanguage || '';
    return navLang.startsWith('zh') ? 'zh-CN' : navLang.startsWith('ja') ? 'ja' : 'en';
  }

  function applyTranslations(lang) {
    var t = translations[lang];
    if (!t) return;
    html.setAttribute('lang', lang === 'zh-CN' ? 'zh-CN' : lang === 'ja' ? 'ja' : 'en');
    document.title = t.siteTitle;
    document.querySelector('meta[name="description"]').setAttribute('content', t.metaDesc);
    document.querySelector('meta[name="keywords"]').setAttribute('content', t.metaKeywords);
    document.querySelector('meta[property="og:locale"]').setAttribute('content', lang === 'zh-CN' ? 'zh_CN' : lang === 'ja' ? 'ja_JP' : 'en_US');
    document.querySelector('meta[property="og:title"]').setAttribute('content', t.ogTitle);
    document.querySelector('meta[property="og:description"]').setAttribute('content', t.ogDesc);
    document.querySelector('meta[name="twitter:title"]').setAttribute('content', t.twitterTitle);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', t.twitterDesc);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) el.innerHTML = t[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (t[key]) el.setAttribute('aria-label', t[key]);
    });
    langOptions.forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });
    localStorage.setItem('lang', lang);
  }

  var currentLang = getPreferredLang();
  applyTranslations(currentLang);

  langToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });

  langOptions.forEach(function (opt) {
    opt.addEventListener('click', function () {
      applyTranslations(this.getAttribute('data-lang'));
      langDropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', function () {
    langDropdown.classList.remove('open');
  });
  langDropdown.addEventListener('click', function (e) {
    e.stopPropagation();
  });

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
