/**
 * Sanity Client - Lightweight API client for Bolsi Blog
 * Fetches content from Sanity.io CMS
 */

const SanityClient = (function () {
  // Sanity Project Configuration
  const CONFIG = {
    projectId: "7l7q9kja",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  };

  /**
   * Build the API URL for a GROQ query
   */
  function buildUrl(query, params = {}) {
    const baseUrl = `https://${CONFIG.projectId}.api.sanity.io/v${CONFIG.apiVersion}/data/query/${CONFIG.dataset}`;
    const encodedQuery = encodeURIComponent(query);
    let url = `${baseUrl}?query=${encodedQuery}`;

    // Add parameters
    Object.entries(params).forEach(([key, value]) => {
      url += `&$${key}="${encodeURIComponent(value)}"`;
    });

    return url;
  }

  /**
   * Build image URL from Sanity image reference
   */
  function imageUrl(image, options = {}) {
    if (!image || !image.asset || !image.asset._ref) {
      return null;
    }

    // Parse the asset reference: image-{id}-{width}x{height}-{format}
    const ref = image.asset._ref;
    const [, id, dimensions, format] = ref.split("-");

    let url = `https://cdn.sanity.io/images/${CONFIG.projectId}/${CONFIG.dataset}/${id}-${dimensions}.${format}`;

    // Add transformations
    const transforms = [];
    if (options.width) transforms.push(`w=${options.width}`);
    if (options.height) transforms.push(`h=${options.height}`);
    if (options.fit) transforms.push(`fit=${options.fit}`);
    if (options.quality) transforms.push(`q=${options.quality}`);

    if (transforms.length > 0) {
      url += "?" + transforms.join("&");
    }

    return url;
  }

  /**
   * Execute a GROQ query
   */
  async function query(groqQuery, params = {}) {
    const url = buildUrl(groqQuery, params);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Sanity API error: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("[SanityClient] Query failed:", error);
      throw error;
    }
  }

  /**
   * Fetch all published posts
   */
  async function fetchPosts(lang = "es", category = null) {
    let groqQuery = `*[_type == "post" && isPublished == true] | order(publishedAt desc) {
      _id,
      "slug": slug.current,
      "title": title.${lang},
      "excerpt": excerpt.${lang},
      mainImage,
      publishedAt,
      "categories": categories[]->{ 
        "name": name.${lang}, 
        "slug": slug.current,
        color 
      }
    }`;

    return await query(groqQuery);
  }

  /**
   * Fetch a single post by slug
   */
  async function fetchPostBySlug(slug, lang = "es") {
    const groqQuery = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      "slug": slug.current,
      "title": title.${lang},
      "excerpt": excerpt.${lang},
      "body": body.${lang},
      "rawHtml": rawHtml.${lang},
      mainImage,
      publishedAt,
      isPublished,
      "author": author->{ 
        name, 
        "bio": bio.${lang},
        image 
      },
      "categories": categories[]->{ 
        "name": name.${lang}, 
        "slug": slug.current,
        color 
      }
    }`;

    return await query(groqQuery, { slug });
  }

  /**
   * Fetch all categories
   */
  async function fetchCategories(lang = "es") {
    const groqQuery = `*[_type == "category"] | order(name.${lang} asc) {
      _id,
      "name": name.${lang},
      "slug": slug.current,
      color
    }`;

    return await query(groqQuery);
  }

  /**
   * Fetch related posts (same category, excluding current)
   */
  async function fetchRelatedPosts(
    currentSlug,
    categorySlug,
    lang = "es",
    limit = 3
  ) {
    const groqQuery = `*[_type == "post" && isPublished == true && slug.current != $currentSlug && $categorySlug in categories[]->slug.current][0...${limit}] {
      _id,
      "slug": slug.current,
      "title": title.${lang},
      "excerpt": excerpt.${lang},
      mainImage,
      publishedAt
    }`;

    return await query(groqQuery, { currentSlug, categorySlug });
  }

  /**
   * Convert Portable Text blocks to HTML
   * Simple implementation - for production, use @portabletext/to-html
   */
  function portableTextToHtml(blocks) {
    if (!blocks || !Array.isArray(blocks)) {
      return "";
    }

    return blocks
      .map((block) => {
        // Handle different block types
        if (block._type === "block") {
          const style = block.style || "normal";
          const text = (block.children || [])
            .map((child) => {
              let content = child.text || "";

              // Apply marks (bold, italic, etc.)
              if (child.marks && child.marks.length > 0) {
                child.marks.forEach((mark) => {
                  if (mark === "strong")
                    content = `<strong>${content}</strong>`;
                  if (mark === "em") content = `<em>${content}</em>`;
                  if (mark === "code") content = `<code>${content}</code>`;
                  if (mark === "underline") content = `<u>${content}</u>`;
                });
              }

              return content;
            })
            .join("");

          // Map styles to HTML elements
          switch (style) {
            case "h1":
              return `<h1>${text}</h1>`;
            case "h2":
              return `<h2>${text}</h2>`;
            case "h3":
              return `<h3>${text}</h3>`;
            case "h4":
              return `<h4>${text}</h4>`;
            case "blockquote":
              return `<blockquote>${text}</blockquote>`;
            default:
              return text ? `<p>${text}</p>` : "";
          }
        }

        // Handle images
        if (block._type === "image") {
          const url = imageUrl(block, { width: 800, quality: 85 });
          const alt = block.alt || "";
          return url ? `<img src="${url}" alt="${alt}" loading="lazy" />` : "";
        }

        return "";
      })
      .join("\n");
  }

  /**
   * Format date for display
   */
  function formatDate(dateString, lang = "es") {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };

    const locales = {
      es: "es-ES",
      en: "en-US",
      pt: "pt-BR",
    };

    return date.toLocaleDateString(locales[lang] || locales.es, options);
  }

  // Public API
  return {
    CONFIG,
    imageUrl,
    query,
    fetchPosts,
    fetchPostBySlug,
    fetchCategories,
    fetchRelatedPosts,
    portableTextToHtml,
    formatDate,
  };
})();

// Expose to global scope
window.SanityClient = SanityClient;
