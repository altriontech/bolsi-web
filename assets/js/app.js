const translationModule = window.BolsiTranslations;

if (!translationModule) {
  throw new Error('El módulo de traducciones de Bolsi no se cargó antes de app.js');
}

const {
  translations,
  fallbackLang,
  resolveValue,
  normalizeLangCode,
  getBrowserLanguagePreference
} = translationModule;

const langButtons = document.querySelectorAll('.lang-btn');
const translatableNodes = document.querySelectorAll('[data-i18n]');
const metricNodes = {
  users: document.querySelector('[data-stat="users"]'),
  rating: document.querySelector('[data-stat="rating"]'),
  updated: document.querySelector('[data-stat="updated"]')
};

const LIVE_STATS_ENDPOINT = 'https://r.jina.ai/https://play.google.com/store/apps/details?id=com.gastosmensuales.app&hl=en&gl=US';
const state = {
  currentLang: fallbackLang,
  liveStats: null
};

const metaSelectors = {
  description: 'meta[name="description"]',
  ogDescription: 'meta[property="og:description"]',
  ogTitle: 'meta[property="og:title"]',
  twitterDescription: 'meta[name="twitter:description"]',
  twitterTitle: 'meta[name="twitter:title"]'
};

const updateMetaTags = (meta) => {
  if (!meta) return;
  const { title, description } = meta;
  document.title = title || document.title;
  const descriptionFallback = description || document.querySelector(metaSelectors.description)?.content;

  const mappings = [
    { selector: metaSelectors.description, value: descriptionFallback },
    { selector: metaSelectors.ogDescription, value: descriptionFallback },
    { selector: metaSelectors.twitterDescription, value: descriptionFallback },
    { selector: metaSelectors.ogTitle, value: title },
    { selector: metaSelectors.twitterTitle, value: title }
  ];

  mappings.forEach(({ selector, value }) => {
    const node = document.querySelector(selector);
    if (node && value) {
      node.setAttribute('content', value);
    }
  });
};

const setActiveLang = (lang) => {
  langButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
};

const getMetricConfig = () => ({
  users: {
    stateKey: 'installs',
    fallbackPath: 'features.metrics.users',
    templatePath: 'features.metricsDynamic.users'
  },
  rating: {
    stateKey: 'rating',
    fallbackPath: 'features.metrics.groups',
    templatePath: 'features.metricsDynamic.rating'
  },
  updated: {
    stateKey: 'updated',
    fallbackPath: 'features.metrics.rating',
    templatePath: 'features.metricsDynamic.updated'
  }
});

const formatTemplate = (template, value) => {
  if (!template) return value;
  return template.replace('{{value}}', value);
};

const updateMetricNodes = () => {
  const config = getMetricConfig();
  Object.entries(config).forEach(([key, meta]) => {
    const node = metricNodes[key];
    if (!node) return;
    const fallbackText = resolveValue(translations[state.currentLang], meta.fallbackPath)
      ?? resolveValue(translations[fallbackLang], meta.fallbackPath);

    if (state.liveStats && state.liveStats[meta.stateKey]) {
      const template = resolveValue(translations[state.currentLang], meta.templatePath)
        ?? resolveValue(translations[fallbackLang], meta.templatePath)
        ?? '{{value}}';
      node.textContent = formatTemplate(template, state.liveStats[meta.stateKey]);
    } else if (fallbackText) {
      node.textContent = fallbackText;
    }
  });
};

const applyTranslations = (lang) => {
  const langData = translations[lang] || translations[fallbackLang];
  translatableNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (!key) return;
    const value = resolveValue(langData, key) ?? resolveValue(translations[fallbackLang], key);
    if (typeof value === 'string') {
      node.textContent = value;
    }
  });
  updateMetaTags(langData.meta);
  setActiveLang(lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  document.documentElement.dataset.currentLang = lang;
  localStorage.setItem('bolsi-lang', lang);
  state.currentLang = lang;
  updateMetricNodes();
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
};

const detectInitialLang = () => {
  const params = new URLSearchParams(window.location.search);
  const urlLang = normalizeLangCode(params.get('lang'));
  if (urlLang && translations[urlLang]) return urlLang;

  const storedLang = normalizeLangCode(localStorage.getItem('bolsi-lang'));
  if (storedLang && translations[storedLang]) return storedLang;

  const browserLang = getBrowserLanguagePreference();
  if (browserLang) return browserLang;

  return fallbackLang;
};

const extractValue = (html, regexes) => {
  for (const regex of regexes) {
    const match = html.match(regex);
    if (match && match[1]) {
      return match[1].replace(/\s+/g, ' ').trim();
    }
  }
  return null;
};

const parsePlayStoreHtml = (html) => {
  const installs = extractValue(html, [
    /([\d.,+]+)\s*Descargas/i,
    /([\d.,+]+)\s*downloads/i
  ]);

  const rating = extractValue(html, [
    /Calificación:\s*([0-5](?:\.[0-9])?)/i,
    /Valoración:\s*([0-5](?:\.[0-9])?)/i,
    /Rating\s*([0-5](?:\.[0-9])?)/i
  ]);

  const updated = extractValue(html, [
    /Actualización\s+([\d]{1,2}\s+\w+\s+\d{4})/i,
    /Updated on\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})/i
  ]);

  return {
    installs,
    rating,
    updated
  };
};

const fetchLiveStats = async () => {
  try {
    const response = await fetch(LIVE_STATS_ENDPOINT, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const stats = parsePlayStoreHtml(html);
    state.liveStats = stats;
    animateMetricNodes();
  } catch (error) {
    console.warn('[Bolsi Landing] No se pudieron obtener estadísticas en vivo:', error);
    updateMetricNodes();
  }
};

const animateMetricNodes = () => {
  const config = getMetricConfig();
  Object.entries(config).forEach(([key, meta]) => {
    const node = metricNodes[key];
    if (!node) return;
    
    node.classList.add('loading');
    
    setTimeout(() => {
      updateMetricNodes();
      node.classList.remove('loading');
      node.style.animation = 'countUp 0.6s ease-out forwards';
    }, 500);
  });
};

const init = () => {
  const initialLang = detectInitialLang();
  applyTranslations(initialLang);
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang) {
        applyTranslations(lang);
      }
    });
  });
  fetchLiveStats();
  initScrollAnimations();
  initNavbarScroll();
  initStepsSlider();
  initFAQAccordion();
};

const initNavbarScroll = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  let lastScrollTop = 0;
  const scrollThreshold = 100;
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check initial state
};

const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.hero-copy > *, .hero-visual, .stat, .faq-item, .audience-list li');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-slide-up');
        }, index * 50);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
  
  // Animate cards with staggered delay
  const cards = document.querySelectorAll('.cards-grid .card, .benefit-card');
  const cardObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
  };
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = Array.from(entry.target.parentElement.children);
        const index = cards.indexOf(entry.target);
        
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 150); // Stagger delay of 150ms between each card
        
        cardObserver.unobserve(entry.target);
      }
    });
  }, cardObserverOptions);
  
  cards.forEach((card) => {
    cardObserver.observe(card);
  });
  
  const heroElements = document.querySelectorAll('.hero-copy > *');
  heroElements.forEach((el, i) => {
    el.classList.add('animate-slide-up', `animate-delay-${Math.min(i + 1, 5)}`);
  });
  
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.classList.add('animate-slide-right', 'animate-delay-2');
  }
  
  // Initialize steps vertical slider
  initStepsSlider();
};

const initStepsSlider = () => {
  const section = document.querySelector('#how-it-works');
  const container = document.querySelector('.steps-scroll-container');
  const slides = document.querySelectorAll('.step-slide');
  const progressDots = document.querySelectorAll('.progress-dot');
  
  if (!section || !container || slides.length === 0) {
    return;
  }
  
  
  let currentSlide = 0;
  let isLocked = false;
  let scrollAccumulator = 0;
  const scrollThreshold = 100; // Accumulated scroll needed to change slide
  
  const activateSlide = (index) => {
    
    slides.forEach((slide) => {
      slide.classList.remove('active', 'prev');
    });
    
    slides[index].classList.add('active');
    
    for (let i = 0; i < index; i++) {
      slides[i].classList.add('prev');
    }
    
    progressDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
    scrollAccumulator = 0; // Reset accumulator after slide change
  };
  
  const handleWheel = (e) => {
    if (!isLocked) return;
    
    // Always prevent default when locked
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY;
    scrollAccumulator += delta;
    
    // Scrolling down
    if (scrollAccumulator > scrollThreshold) {
      if (currentSlide < slides.length - 1) {
        // Move to next slide
        activateSlide(currentSlide + 1);
      } else {
        // At last slide, unlock to allow scrolling down past section
        isLocked = false;
        scrollAccumulator = 0;
      }
    } 
    // Scrolling up
    else if (scrollAccumulator < -scrollThreshold) {
      if (currentSlide > 0) {
        // Move to previous slide
        activateSlide(currentSlide - 1);
      } else {
        // At first slide, unlock to allow scrolling up past section
        isLocked = false;
        scrollAccumulator = 0;
      }
    }
  };
  
  // Intersection Observer with high threshold to detect when centered
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        // Section is centered - lock scrolling
        isLocked = true;
        scrollAccumulator = 0;
        container.classList.add('in-view');
      } else if (!entry.isIntersecting || entry.intersectionRatio < 0.4) {
        // Section is leaving viewport - unlock
        isLocked = false;
        scrollAccumulator = 0;
        container.classList.remove('in-view');
      }
    });
  }, {
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
  });
  
  sectionObserver.observe(section);
  
  // Add wheel listener
  window.addEventListener('wheel', handleWheel, { passive: false });
  
  // Click handlers for progress dots
  progressDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      activateSlide(index);
    });
  });
  
  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!isLocked) return;
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (currentSlide < slides.length - 1) {
        e.preventDefault();
        activateSlide(currentSlide + 1);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (currentSlide > 0) {
        e.preventDefault();
        activateSlide(currentSlide - 1);
      }
    }
  });
  
  // Touch support for mobile
  let touchStartY = 0;
  let touchEndY = 0;
  
  container.addEventListener('touchstart', (e) => {
    if (isLocked) {
      touchStartY = e.changedTouches[0].screenY;
    }
  }, { passive: true });
  
  container.addEventListener('touchend', (e) => {
    if (isLocked) {
      touchEndY = e.changedTouches[0].screenY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < slides.length - 1) {
          activateSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
          activateSlide(currentSlide - 1);
        }
      }
    }
  }, { passive: true });
  
  // Activate first slide on load
  activateSlide(0);
};

const initFAQAccordion = () => {
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  
  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-accordion-header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
