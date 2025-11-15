// Delete Account Page - Language Management
document.addEventListener('DOMContentLoaded', function() {
  // Initialize language from URL params or localStorage
  initLanguage();
  
  // Setup language dropdown
  setupLanguageDropdown();
  
  // Setup navbar scroll effect
  setupNavbarScroll();
});

function initLanguage() {
  // Get language from URL params or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get('lang');
  
  // If no URL param, try localStorage
  if (!lang) {
    lang = localStorage.getItem('preferredLanguage') || 'es';
  }
  
  // Normalize language code
  if (lang === 'pt-BR' || lang === 'pt') {
    lang = 'pt';
  } else if (lang !== 'en' && lang !== 'es') {
    lang = 'es'; // Default to Spanish
  }
  
  // Store in localStorage for persistence
  localStorage.setItem('preferredLanguage', lang);
  
  // Update the page
  updateLanguageSelector(lang);
  applyTranslations(lang);
}

function updateLanguageSelector(lang) {
  const langBtn = document.getElementById('languageBtn');
  if (!langBtn) return;
  
  const flagEmojis = {
    'es': '🇪🇸',
    'en': '🇺🇸',
    'pt': '🇧🇷'
  };
  
  const langNames = {
    'es': 'Español',
    'en': 'English',
    'pt': 'Português'
  };
  
  langBtn.innerHTML = `${flagEmojis[lang]} ${langNames[lang]}`;
  
  // Update active state in dropdown
  document.querySelectorAll('.language-option').forEach(option => {
    const optionLang = option.dataset.lang;
    if (optionLang === lang) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

function applyTranslations(lang) {
  if (!window.BolsiTranslations || !window.BolsiTranslations[lang]) {
    console.error('Translations not found for language:', lang);
    return;
  }
  
  const translations = window.BolsiTranslations[lang].delete;
  
  // Apply translations to all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    
    // Navigate through the translation object
    let translation = translations;
    for (const k of keys.slice(1)) { // Skip 'delete' prefix as we already have it
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn('Translation not found for key:', key);
        return;
      }
    }
    
    // Apply translation
    if (typeof translation === 'string') {
      element.innerHTML = translation;
    }
  });
}

function setupLanguageDropdown() {
  const langBtn = document.getElementById('languageBtn');
  const langDropdown = document.getElementById('languageDropdown');
  
  if (!langBtn || !langDropdown) return;
  
  // Toggle dropdown on button click
  langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.classList.remove('show');
    }
  });
  
  // Handle language selection
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const selectedLang = this.dataset.lang;
      
      // Store preference
      localStorage.setItem('preferredLanguage', selectedLang);
      
      // Update URL with new language
      const url = new URL(window.location);
      url.searchParams.set('lang', selectedLang);
      window.history.pushState({}, '', url);
      
      // Update UI
      updateLanguageSelector(selectedLang);
      applyTranslations(selectedLang);
      
      // Close dropdown
      langDropdown.classList.remove('show');
    });
  });
}

function setupNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
      navbar.style.backgroundColor = 'white';
      navbar.style.boxShadow = 'none';
    }
  });
}
