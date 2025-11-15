/**
 * Privacy Policy Page JavaScript
 * Handles language switching and translations for privacy policy
 */

(function() {
  'use strict';

  let currentLanguage = 'es';

  // Language data for selector
  const languageData = {
    'es': { flag: '🇪🇸', name: 'ES' },
    'en': { flag: '🇺🇸', name: 'EN' },
    'pt-BR': { flag: '🇧🇷', name: 'PT' }
  };

  /**
   * Initialize language system
   */
  function initLanguage() {
    // Get language from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    // Check supported languages
    const supportedLangs = ['es', 'en', 'pt-BR'];
    
    if (urlLang && supportedLangs.includes(urlLang)) {
      currentLanguage = urlLang;
    } else {
      // Try to get from localStorage
      const savedLang = localStorage.getItem('bolsi-language');
      if (savedLang && supportedLangs.includes(savedLang)) {
        currentLanguage = savedLang;
      } else {
        // Default to Spanish
        currentLanguage = 'es';
      }
    }
    
    // Save to localStorage
    localStorage.setItem('bolsi-language', currentLanguage);
    
    // Update language selector
    updateLanguageSelector(currentLanguage);
    
    // Apply translations
    applyTranslations();
  }

  /**
   * Update language selector display
   */
  function updateLanguageSelector(lang) {
    const currentFlag = document.getElementById('currentFlag');
    const currentLangEl = document.getElementById('currentLang');
    
    // Normalize pt-BR to pt-BR for selector
    const normalizedLang = lang === 'pt' ? 'pt-BR' : lang;
    
    if (currentFlag && currentLangEl && languageData[normalizedLang]) {
      currentFlag.textContent = languageData[normalizedLang].flag;
      currentLangEl.textContent = languageData[normalizedLang].name;
    }

    // Update active state in dropdown
    document.querySelectorAll('.language-option').forEach(option => {
      const optionLang = option.dataset.lang;
      option.classList.toggle('active', optionLang === normalizedLang);
    });
  }

  /**
   * Apply translations to page
   */
  function applyTranslations() {
    if (!window.BolsiTranslations || !window.BolsiTranslations.translations) {
      console.error('Translations not loaded');
      return;
    }

    // Normalize language code for translations (pt-BR -> pt)
    const translationLang = currentLanguage === 'pt-BR' ? 'pt' : currentLanguage;
    const translations = window.BolsiTranslations.translations[translationLang];
    
    if (!translations || !translations.privacy) {
      console.error('Privacy translations not found for language:', translationLang);
      return;
    }

    const t = translations.privacy;
    
    // Update document language
    document.documentElement.lang = translationLang;
    
    // Update meta tags
    document.title = `${t.hero.title} - Bolsi`;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const value = getNestedValue(translations, key);
      
      if (value) {
        element.innerHTML = value;
      }
    });
  }

  /**
   * Get nested object value by path
   */
  function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

  /**
   * Change language
   */
  function changeLanguage(lang) {
    if (lang !== currentLanguage) {
      // Update URL with new language
      const url = new URL(window.location);
      url.searchParams.set('lang', lang);
      window.location.href = url.toString();
    }
  }

  /**
   * Initialize language selector dropdown
   */
  function initLanguageSelector() {
    const selectorBtn = document.getElementById('languageSelectorBtn');
    const dropdown = document.getElementById('languageDropdown');
    
    if (!selectorBtn || !dropdown) return;

    // Toggle dropdown
    selectorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });

    // Language option click
    document.querySelectorAll('.language-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        changeLanguage(lang);
      });
    });
  }

  /**
   * Initialize navbar scroll effect
   */
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /**
   * Initialize page
   */
  function init() {
    // Wait for translations to load
    if (window.BolsiTranslations) {
      initLanguage();
      initLanguageSelector();
      initNavbarScroll();
    } else {
      // Retry after a short delay
      setTimeout(init, 100);
    }
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
