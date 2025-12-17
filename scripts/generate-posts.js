/**
 * Bolsi AI Blog Post Generator
 * Uses Google Gemini to generate SEO-optimized blog posts in 3 languages
 * Posts are created as drafts (isPublished: false) for manual review
 */

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

// Configuration
const CONFIG = {
  postsPerRun: 3,
  dryRun: process.argv.includes("--dry-run"),
};

// Initialize Gemini - using gemini-1.5-pro (more stable quota)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Load topics database
const topicsPath = path.join(__dirname, "seo-topics.json");
let topicsData = JSON.parse(fs.readFileSync(topicsPath, "utf8"));

/**
 * Get unused topics
 */
function getUnusedTopics(count) {
  const unused = topicsData.topics.filter((t) => !t.used);
  return unused.slice(0, count);
}

/**
 * Mark topic as used
 */
function markTopicAsUsed(topicId) {
  const topic = topicsData.topics.find((t) => t.id === topicId);
  if (topic) {
    topic.used = true;
    topic.usedAt = new Date().toISOString();
    fs.writeFileSync(topicsPath, JSON.stringify(topicsData, null, 2));
  }
}

/**
 * Generate slug from title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80);
}

/**
 * SEO-optimized prompt for blog content
 */
function buildPrompt(topic, lang) {
  const langNames = {
    es: "Spanish",
    en: "English",
    pt: "Brazilian Portuguese",
  };
  const appName = "Bolsi";

  return `You are an expert SEO content writer for a personal finance app called "${appName}".

Write a comprehensive blog post in ${langNames[lang]} about: "${
    topic[`title_${lang}`]
  }"

Keywords to include naturally: ${topic.keywords.join(", ")}

REQUIREMENTS:
1. Write 800-1200 words
2. Use proper HTML formatting (h2, h3, p, ul, li, strong, em)
3. Include the main keyword in the first paragraph
4. Use H2 for main sections, H3 for subsections
5. Include practical examples and actionable tips
6. Mention "${appName}" 2-3 times naturally as a solution
7. End with a call-to-action to download ${appName}
8. Make it engaging and easy to read
9. NO markdown, ONLY HTML tags
10. Start directly with <h2>, no title needed

STRUCTURE:
- Opening paragraph (hook + main keyword)
- 3-5 main sections with H2 headers
- Practical tips or numbered steps
- Conclusion with CTA

Write the content now:`;
}

/**
 * Generate content using Gemini
 */
async function generateContent(topic, lang) {
  console.log(`  Generating ${lang.toUpperCase()} content...`);

  const prompt = buildPrompt(topic, lang);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up the response
    text = text.replace(/```html\n?/g, "").replace(/```\n?/g, "");
    text = text.trim();

    return text;
  } catch (error) {
    console.error(`  Error generating ${lang} content:`, error.message);
    return null;
  }
}

/**
 * Generate excerpt from content
 */
function generateExcerpt(html, maxLength = 160) {
  // Remove HTML tags and get plain text
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;

  // Cut at word boundary
  const truncated = text.substring(0, maxLength);
  return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
}

/**
 * Create post in Sanity
 */
async function createSanityPost(topic, contents) {
  const slug = generateSlug(topic.title_es);

  const post = {
    _type: "post",
    title: {
      es: topic.title_es,
      en: topic.title_en,
      pt: topic.title_pt,
    },
    slug: {
      _type: "slug",
      current: slug,
    },
    excerpt: {
      es: generateExcerpt(contents.es),
      en: generateExcerpt(contents.en),
      pt: generateExcerpt(contents.pt),
    },
    rawHtml: {
      es: contents.es,
      en: contents.en,
      pt: contents.pt,
    },
    publishedAt: new Date().toISOString(),
    isPublished: false, // DRAFT - requires manual review
  };

  if (CONFIG.dryRun) {
    console.log("  [DRY RUN] Would create post:", slug);
    console.log("  Title ES:", topic.title_es);
    console.log("  Excerpt:", post.excerpt.es.substring(0, 100) + "...");
    return { _id: "dry-run-id", slug };
  }

  try {
    const result = await sanityClient.create(post);
    console.log(`  ✅ Created post: ${slug} (ID: ${result._id})`);
    return result;
  } catch (error) {
    console.error("  ❌ Error creating post:", error.message);
    return null;
  }
}

/**
 * Update sitemap.xml with new post
 */
function updateSitemap(slug) {
  const sitemapPath = path.join(__dirname, "..", "sitemap.xml");
  let sitemap = fs.readFileSync(sitemapPath, "utf8");

  const today = new Date().toISOString().split("T")[0];
  const baseUrl = "https://bolsi.altrion-tech.com/blog";

  const newEntry = `
  <!-- Blog Post: ${slug} -->
  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/${slug}?lang=es" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/${slug}?lang=en" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${baseUrl}/${slug}?lang=pt" />
  </url>`;

  // Insert before </urlset>
  sitemap = sitemap.replace("</urlset>", newEntry + "\n</urlset>");

  if (!CONFIG.dryRun) {
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`  📍 Updated sitemap with: ${slug}`);
  } else {
    console.log(`  [DRY RUN] Would update sitemap with: ${slug}`);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Bolsi AI Blog Generator");
  console.log(`   Mode: ${CONFIG.dryRun ? "DRY RUN" : "PRODUCTION"}`);
  console.log(`   Posts to generate: ${CONFIG.postsPerRun}`);
  console.log("");

  // Validate environment
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Missing GEMINI_API_KEY in .env");
    process.exit(1);
  }

  if (!CONFIG.dryRun && !process.env.SANITY_TOKEN) {
    console.error("❌ Missing SANITY_TOKEN in .env");
    process.exit(1);
  }

  // Get unused topics
  const topics = getUnusedTopics(CONFIG.postsPerRun);

  if (topics.length === 0) {
    console.log("⚠️  No unused topics available. Add more to seo-topics.json");
    process.exit(0);
  }

  console.log(`📝 Found ${topics.length} topics to process\n`);

  let successCount = 0;

  for (const topic of topics) {
    console.log(`\n📄 Processing: ${topic.title_es}`);

    // Generate content in all 3 languages
    const contents = {
      es: await generateContent(topic, "es"),
      en: await generateContent(topic, "en"),
      pt: await generateContent(topic, "pt"),
    };

    // Check if all content was generated
    if (!contents.es || !contents.en || !contents.pt) {
      console.log("  ⚠️  Skipping due to generation error");
      continue;
    }

    // Create post in Sanity
    const result = await createSanityPost(topic, contents);

    if (result) {
      // Update sitemap
      const slug = generateSlug(topic.title_es);
      updateSitemap(slug);

      // Mark topic as used
      markTopicAsUsed(topic.id);
      successCount++;
    }

    // Small delay between posts
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log(`\n✨ Done! Created ${successCount}/${topics.length} posts`);

  if (successCount > 0 && !CONFIG.dryRun) {
    console.log("\n📋 Next steps:");
    console.log("   1. Review drafts in Sanity Studio");
    console.log("   2. Publish approved posts");
    console.log(
      '   3. Run: git add sitemap.xml && git commit -m "Add new posts" && git push'
    );
    console.log("   4. Deploy: firebase deploy --only hosting");
  }
}

main().catch(console.error);
