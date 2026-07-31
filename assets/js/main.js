/* 本文件以 defer 加载：解析完成后立即执行，无需等待 DOMContentLoaded */
(function () {
  var html = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var langToggle = document.getElementById('langToggle');
  var langDropdown = document.getElementById('langDropdown');
  var langOptions = document.querySelectorAll('.lang-option');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var backToTop = document.getElementById('backToTop');

  /* i18n 只负责页面正文的可见文案。
     title / description / keywords / og:* / twitter:* / canonical 属于 SEO 元数据，
     一律由 index.html 静态定义，本文件不得写入，否则以 en-US 环境执行 JS 的爬虫
     会把中文首页收录成英文描述。请勿在此处再添加 metaDesc / ogTitle 之类的键。 */
  var translations = {
    'zh-CN': {
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

  /* index.html 静态文案所使用的语言，也是唯一被搜索引擎收录的语言 */
  var DEFAULT_LANG = 'zh-CN';

  function getPreferredLang() {
    /* 只认用户在本站主动选择并存下来的语言，不再读取 navigator.language：
       爬虫的运行环境几乎都是 en-US，一旦按环境语言自动切换，
       渲染后的正文会变成英文，首页就会被判定为英文页面。
       没有存过选择时（包括所有爬虫）一律使用中文。 */
    var stored = null;
    try { stored = localStorage.getItem('lang'); } catch (e) {}
    return translations[stored] ? stored : DEFAULT_LANG;
  }

  function applyTranslations(lang, skipDom) {
    var t = translations[lang];
    if (!t) return;
    langOptions.forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });
    // 首屏语言与 HTML 内置文案一致时跳过整页重写，避免多余的重排
    if (skipDom) return;
    /* 只改正文与 html[lang]（保证屏幕阅读器读音正确）。
       document.title 与 meta[name=description] / og:* / twitter:* 一律不动，
       它们只由 index.html 静态决定。 */
    html.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) el.innerHTML = t[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (t[key]) el.setAttribute('aria-label', t[key]);
    });
  }

  var currentLang = getPreferredLang();
  applyTranslations(currentLang, currentLang === DEFAULT_LANG);

  langToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });

  /* 用户主动选择语言时才写入偏好：localStorage 里的值即「用户的明确选择」 */
  function switchLang(lang) {
    if (!translations[lang]) return;
    try { localStorage.setItem('lang', lang); } catch (e) {}
    applyTranslations(lang);
  }

  langOptions.forEach(function (opt) {
    opt.addEventListener('click', function () {
      switchLang(this.getAttribute('data-lang'));
      langDropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', function () {
    langDropdown.classList.remove('open');
  });
  langDropdown.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  /* ===== 语言提示横幅 =====
     浏览器环境是英文/日文、且用户还没在本站选过语言时，用对应语言提示「可以切换」。
     它只是提示，绝不自动切换 —— 按环境语言自动切换正是首页被误收录成英文的原因。

     整段由 JS 动态创建，不写进 index.html：静态源码保持纯中文，
     curl 抓到的仍是中文页面；元素上标注 lang 属性，
     让搜索引擎知道这一小块是外语片段，页面主体语言仍为 html[lang] 声明的 zh-CN。 */
  var LANG_BANNER = {
    en: {
      text: 'This site is displayed in Chinese. Would you like to switch to English?',
      action: 'Switch to English',
      close: 'Dismiss'
    },
    ja: {
      text: 'このサイトは中国語で表示されています。日本語に切り替えますか？',
      action: '日本語に切り替える',
      close: '閉じる'
    }
  };

  function detectBannerLang() {
    /* 只决定「要不要提示」，绝不用来决定页面实际语言 */
    var navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (navLang.indexOf('ja') === 0) return 'ja';
    if (navLang.indexOf('en') === 0) return 'en';
    return null;
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
        '<button type="button" class="lang-banner-switch"></button>' +
      '</div>' +
      '<button type="button" class="lang-banner-close">×</button>';

    var switchBtn = banner.querySelector('.lang-banner-switch');
    var closeBtn = banner.querySelector('.lang-banner-close');
    /* 文案一律用 textContent 写入，不让它们被当成 HTML 解析 */
    banner.querySelector('.lang-banner-text').textContent = t.text;
    switchBtn.textContent = t.action;
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

    switchBtn.addEventListener('click', function () {
      switchLang(lang); // 会写入 lang 偏好，下次进站不再提示
      hide();
    });
    closeBtn.addEventListener('click', dismiss);
    document.addEventListener('keydown', onKeydown);

    /* 下一帧再加 .show，保证入场过渡能触发 */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.classList.add('show'); });
    });
  }

  initLangBanner();

  /* 主题已由 index.html 头部的内联脚本在首屏绘制前设置好，此处只处理切换 */
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

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

  if (window.IntersectionObserver && trackedSections.length) {
    /* 以「在视口内露出的高度」判定当前 section：比原来的 offsetTop 阈值法更准，
       而且滚到页面底部时最后一个 section 一定能胜出（原来它会被 #blog 挡住） */
    var visibleHeight = {};
    var thresholds = [];
    for (var i = 0; i <= 20; i++) thresholds.push(i / 20);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visibleHeight[entry.target.id] = entry.isIntersecting ? entry.intersectionRect.height : 0;
      });
      var best = null;
      var bestHeight = 0;
      trackedSections.forEach(function (s) {
        var h = visibleHeight[s.el.id] || 0;
        if (h > bestHeight) { bestHeight = h; best = s.link; }
      });
      /* 全部为 0（例如正停在 #blog 上）时保持当前高亮，避免闪烁 */
      if (best) setActive(best);
    }, {
      threshold: thresholds,
      rootMargin: '-64px 0px 0px 0px' /* 扣掉吸顶 header，被挡住的部分不算露出 */
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
