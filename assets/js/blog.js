/**
 * Blog List Page - Bolsi Landing
 * Handles loading and rendering of blog posts
 */

(function () {
  // Get translation module
  const translationModule = window.BolsiTranslations;
  if (!translationModule) {
    console.error("[Blog] Translation module not loaded");
  }

  // State
  let currentLang = "es";
  let allPosts = [];
  let allCategories = [];
  let selectedCategory = "all";

  // DOM Elements
  const blogGrid = document.getElementById("blogGrid");
  const blogLoading = document.getElementById("blogLoading");
  const blogEmpty = document.getElementById("blogEmpty");
  const blogCategories = document.getElementById("blogCategories");
  const langButtons = document.querySelectorAll(".lang-btn");
  const translatableNodes = document.querySelectorAll("[data-i18n]");

  /**
   * Get current language from various sources
   */
  function detectLang() {
    // Check URL param
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang && ["es", "en", "pt"].includes(urlLang)) {
      return urlLang;
    }

    // Check localStorage
    const storedLang = localStorage.getItem("bolsi-lang");
    if (storedLang && ["es", "en", "pt"].includes(storedLang)) {
      return storedLang;
    }

    // Check document attribute
    const docLang = document.documentElement.dataset.currentLang;
    if (docLang && ["es", "en", "pt"].includes(docLang)) {
      return docLang;
    }

    return "es";
  }

  /**
   * Apply static translations
   */
  function applyTranslations(lang) {
    if (!translationModule) return;

    const { translations, fallbackLang, resolveValue } = translationModule;
    const langData = translations[lang] || translations[fallbackLang];

    translatableNodes.forEach((node) => {
      const key = node.dataset.i18n;
      if (!key) return;
      const value =
        resolveValue(langData, key) ??
        resolveValue(translations[fallbackLang], key);
      if (typeof value === "string") {
        node.textContent = value;
      }
    });

    // Update active button
    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.documentElement.dataset.currentLang = lang;
    localStorage.setItem("bolsi-lang", lang);

    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  }

  /**
   * Render a single blog card
   */
  function renderCard(post) {
    const imageUrl = SanityClient.imageUrl(post.mainImage, {
      width: 600,
      height: 400,
      fit: "crop",
    });
    const date = SanityClient.formatDate(post.publishedAt, currentLang);
    const readMoreText = translationModule
      ? translationModule.resolveValue(
          translationModule.translations[currentLang],
          "blog.readMore"
        ) || "Leer más"
      : "Leer más";

    const categoriesHtml = (post.categories || [])
      .map(
        (cat) =>
          `<span class="blog-card-category" style="background: ${cat.color}15; color: ${cat.color}">${cat.name}</span>`
      )
      .join("");

    return `
      <article class="blog-card">
        ${
          imageUrl
            ? `<img class="blog-card-image" src="${imageUrl}" alt="${post.title}" loading="lazy" />`
            : '<div class="blog-card-image"></div>'
        }
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="blog-card-date">${date}</span>
            ${categoriesHtml}
          </div>
          <h2 class="blog-card-title">
            <a href="/blog/${post.slug}?lang=${currentLang}">${post.title}</a>
          </h2>
          <p class="blog-card-excerpt">${post.excerpt || ""}</p>
          <a class="blog-card-link" href="/blog/${
            post.slug
          }?lang=${currentLang}">
            ${readMoreText} <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  }

  /**
   * Render category buttons
   */
  function renderCategories(categories) {
    const allText = translationModule
      ? translationModule.resolveValue(
          translationModule.translations[currentLang],
          "blog.allCategories"
        ) || "Todas"
      : "Todas";

    let html = `<button class="category-btn ${
      selectedCategory === "all" ? "active" : ""
    }" data-category="all">${allText}</button>`;

    categories.forEach((cat) => {
      html += `<button class="category-btn ${
        selectedCategory === cat.slug ? "active" : ""
      }" data-category="${cat.slug}">${cat.name}</button>`;
    });

    blogCategories.innerHTML = html;

    // Add click handlers
    blogCategories.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedCategory = btn.dataset.category;
        blogCategories
          .querySelectorAll(".category-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filterAndRenderPosts();
      });
    });
  }

  /**
   * Filter and render posts
   */
  function filterAndRenderPosts() {
    let posts = allPosts;

    if (selectedCategory !== "all") {
      posts = allPosts.filter(
        (post) =>
          post.categories &&
          post.categories.some((cat) => cat.slug === selectedCategory)
      );
    }

    if (posts.length === 0) {
      blogGrid.innerHTML = "";
      blogEmpty.style.display = "block";
    } else {
      blogEmpty.style.display = "none";
      blogGrid.innerHTML = posts.map(renderCard).join("");
    }
  }

  /**
   * Load posts from Sanity
   */
  async function loadPosts() {
    try {
      blogLoading.style.display = "block";
      blogEmpty.style.display = "none";

      // Fetch posts and categories in parallel
      const [posts, categories] = await Promise.all([
        SanityClient.fetchPosts(currentLang),
        SanityClient.fetchCategories(currentLang),
      ]);

      allPosts = posts || [];
      allCategories = categories || [];

      blogLoading.style.display = "none";

      if (allCategories.length > 0) {
        renderCategories(allCategories);
      }

      filterAndRenderPosts();
    } catch (error) {
      console.error("[Blog] Failed to load posts:", error);
      blogLoading.style.display = "none";
      blogEmpty.style.display = "block";
    }
  }

  /**
   * Handle language change
   */
  function handleLangChange(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    applyTranslations(lang);
    loadPosts();
  }

  /**
   * Initialize
   */
  function init() {
    currentLang = detectLang();
    applyTranslations(currentLang);

    // Language button handlers
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        handleLangChange(btn.dataset.lang);
      });
    });

    // Load posts
    loadPosts();
  }

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
