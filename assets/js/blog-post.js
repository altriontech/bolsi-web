/**
 * Blog Post Page - Bolsi Landing
 * Handles loading and rendering of individual blog post
 */

(function () {
  // Get translation module
  const translationModule = window.BolsiTranslations;
  if (!translationModule) {
    console.error("[BlogPost] Translation module not loaded");
  }

  // State
  let currentLang = "es";
  let currentPost = null;

  // DOM Elements
  const postLoading = document.getElementById("postLoading");
  const postHeader = document.getElementById("postHeader");
  const postImageContainer = document.getElementById("postImageContainer");
  const postBody = document.getElementById("postBody");
  const postNotFound = document.getElementById("postNotFound");
  const blogRelated = document.getElementById("blogRelated");
  const langButtons = document.querySelectorAll(".lang-btn");
  const translatableNodes = document.querySelectorAll("[data-i18n]");

  /**
   * Get post slug from URL
   */
  function getSlugFromUrl() {
    const path = window.location.pathname;
    const match = path.match(/\/blog\/(.+)/);
    return match ? match[1] : null;
  }

  /**
   * Get current language
   */
  function detectLang() {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang && ["es", "en", "pt"].includes(urlLang)) {
      return urlLang;
    }

    const storedLang = localStorage.getItem("bolsi-lang");
    if (storedLang && ["es", "en", "pt"].includes(storedLang)) {
      return storedLang;
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

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.documentElement.dataset.currentLang = lang;
    localStorage.setItem("bolsi-lang", lang);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  }

  /**
   * Update page meta tags
   */
  function updateMeta(post) {
    if (!post) return;

    document.title = `${post.title} | Bolsi Blog`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", post.excerpt || "");

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", post.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", post.excerpt || "");

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", window.location.href);

    if (post.mainImage) {
      const imageUrl = SanityClient.imageUrl(post.mainImage, {
        width: 1200,
        height: 630,
      });
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && imageUrl) ogImage.setAttribute("content", imageUrl);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical)
      canonical.setAttribute("href", window.location.href.split("?")[0]);

    // Update Schema.org structured data for SEO
    updateSchemaOrg(post);
  }

  /**
   * Update Schema.org JSON-LD for SEO
   */
  function updateSchemaOrg(post) {
    const pageUrl = window.location.href.split("?")[0];
    const imageUrl = post.mainImage
      ? SanityClient.imageUrl(post.mainImage, { width: 1200, height: 630 })
      : "";

    // Update BlogPosting schema
    const postSchema = document.getElementById("blogPostSchema");
    if (postSchema) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
        headline: post.title,
        description: post.excerpt || "",
        image: imageUrl,
        author: {
          "@type": post.author ? "Person" : "Organization",
          name: post.author ? post.author.name : "Bolsi",
        },
        publisher: {
          "@type": "Organization",
          name: "Bolsi",
          logo: {
            "@type": "ImageObject",
            url: "https://bolsi.altrion-tech.com/assets/images/gm-logov1.png",
          },
        },
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
      };
      postSchema.textContent = JSON.stringify(schema);
    }

    // Update Breadcrumb schema
    const breadcrumbSchema = document.getElementById("breadcrumbSchema");
    if (breadcrumbSchema) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://bolsi.altrion-tech.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://bolsi.altrion-tech.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: pageUrl,
          },
        ],
      };
      breadcrumbSchema.textContent = JSON.stringify(schema);
    }
  }

  /**
   * Render post content
   */
  function renderPost(post) {
    // Title
    document.getElementById("postTitle").textContent = post.title;

    // Excerpt
    document.getElementById("postExcerpt").textContent = post.excerpt || "";

    // Date
    document.getElementById("postDate").textContent = SanityClient.formatDate(
      post.publishedAt,
      currentLang
    );

    // Categories
    const categoriesContainer = document.getElementById("postCategories");
    if (post.categories && post.categories.length > 0) {
      categoriesContainer.innerHTML = post.categories
        .map((cat) => `<span class="blog-card-category">${cat.name}</span>`)
        .join("");
    }

    // Featured Image
    if (post.mainImage) {
      const imageUrl = SanityClient.imageUrl(post.mainImage, {
        width: 1200,
        quality: 85,
      });
      if (imageUrl) {
        const postImage = document.getElementById("postImage");
        postImage.src = imageUrl;
        postImage.alt = post.mainImage.alt || post.title;
        postImageContainer.style.display = "block";
      }
    }

    // Body content - prefer rawHtml if available, otherwise use Portable Text
    let content = "";
    if (post.rawHtml) {
      content = post.rawHtml;
    } else if (post.body) {
      content = SanityClient.portableTextToHtml(post.body);
    }
    document.getElementById("postContent").innerHTML = content;

    // Author
    if (post.author) {
      const authorContainer = document.getElementById("postAuthor");
      document.getElementById("authorName").textContent = post.author.name;

      if (post.author.image) {
        const avatarUrl = SanityClient.imageUrl(post.author.image, {
          width: 112,
          height: 112,
        });
        if (avatarUrl) {
          document.getElementById("authorAvatar").src = avatarUrl;
        }
      }

      authorContainer.style.display = "flex";
    }

    // Show sections
    postHeader.style.display = "block";
    postBody.style.display = "block";
  }

  /**
   * Render related posts
   */
  function renderRelatedPosts(posts) {
    if (!posts || posts.length === 0) return;

    const readMoreText = translationModule
      ? translationModule.resolveValue(
          translationModule.translations[currentLang],
          "blog.readMore"
        ) || "Leer más"
      : "Leer más";

    const grid = document.getElementById("relatedGrid");
    grid.innerHTML = posts
      .map((post) => {
        const imageUrl = SanityClient.imageUrl(post.mainImage, {
          width: 400,
          height: 260,
          fit: "crop",
        });
        const date = SanityClient.formatDate(post.publishedAt, currentLang);

        return `
        <article class="blog-card">
          ${
            imageUrl
              ? `<img class="blog-card-image" src="${imageUrl}" alt="${post.title}" loading="lazy" />`
              : '<div class="blog-card-image"></div>'
          }
          <div class="blog-card-content">
            <span class="blog-card-date">${date}</span>
            <h2 class="blog-card-title">
              <a href="/blog/${post.slug}?lang=${currentLang}">${post.title}</a>
            </h2>
            <a class="blog-card-link" href="/blog/${
              post.slug
            }?lang=${currentLang}">
              ${readMoreText} <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </article>
      `;
      })
      .join("");

    blogRelated.style.display = "block";
  }

  /**
   * Show not found state
   */
  function showNotFound() {
    postLoading.style.display = "none";
    postNotFound.style.display = "flex";
  }

  /**
   * Load post
   */
  async function loadPost() {
    const slug = getSlugFromUrl();

    if (!slug) {
      showNotFound();
      return;
    }

    try {
      const post = await SanityClient.fetchPostBySlug(slug, currentLang);

      if (!post || !post.isPublished) {
        showNotFound();
        return;
      }

      currentPost = post;
      postLoading.style.display = "none";

      updateMeta(post);
      renderPost(post);

      // Load related posts
      if (post.categories && post.categories.length > 0) {
        const relatedPosts = await SanityClient.fetchRelatedPosts(
          slug,
          post.categories[0].slug,
          currentLang,
          3
        );
        renderRelatedPosts(relatedPosts);
      }
    } catch (error) {
      console.error("[BlogPost] Failed to load post:", error);
      showNotFound();
    }
  }

  /**
   * Handle language change
   */
  function handleLangChange(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    applyTranslations(lang);

    // Reset and reload
    postHeader.style.display = "none";
    postImageContainer.style.display = "none";
    postBody.style.display = "none";
    postNotFound.style.display = "none";
    blogRelated.style.display = "none";
    postLoading.style.display = "flex";

    loadPost();
  }

  /**
   * Initialize
   */
  function init() {
    currentLang = detectLang();
    applyTranslations(currentLang);

    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        handleLangChange(btn.dataset.lang);
      });
    });

    loadPost();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
