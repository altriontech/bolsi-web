/**
 * Bolsi AI Blog Post Generator v2
 * Uses Google Gemini to generate SEO-optimized blog posts in 3 languages
 * Features: Image generation, auto-categories, author assignment
 * Posts are created as drafts (isPublished: false) for manual review
 */

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");
const https = require("https");

// Configuration
const CONFIG = {
  postsPerRun: 3,
  dryRun: process.argv.includes("--dry-run"),
  delayBetweenPosts: 5000, // 5 seconds between posts
  delayBetweenLanguages: 2000, // 2 seconds between language generations
};

// Initialize Gemini - using gemini-2.0-flash (best free tier: 2K RPM, unlimited daily)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const textModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

// Cache for existing data
let existingCategories = [];
let existingAuthor = null;
let existingSlugs = [];

/**
 * Load existing data from Sanity
 */
async function loadExistingData() {
  console.log("📂 Loading existing data from Sanity...");

  // Get existing categories
  existingCategories = await sanityClient.fetch(
    `*[_type == "category"]{_id, name}`
  );
  console.log(`   Found ${existingCategories.length} categories`);

  // Get first author (we'll use this for all posts)
  const authors = await sanityClient.fetch(
    `*[_type == "author"][0]{_id, name}`
  );
  existingAuthor = authors;
  console.log(`   Author: ${existingAuthor?.name || "None found"}`);

  // Get existing post slugs to avoid duplicates
  existingSlugs = await sanityClient.fetch(`*[_type == "post"].slug.current`);
  console.log(`   Found ${existingSlugs.length} existing posts`);
}

/**
 * Get unused topics (excluding already created posts)
 */
function getUnusedTopics(count) {
  const unused = topicsData.topics.filter((t) => {
    if (t.used) return false;
    // Also check if slug already exists in Sanity
    const slug = generateSlug(t.title_es);
    if (existingSlugs.includes(slug)) {
      console.log(`   ⚠️  Topic "${t.title_es}" already exists, skipping`);
      return false;
    }
    return true;
  });
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
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80);
}

/**
 * Find or create category
 */
async function findOrCreateCategory(categoryName) {
  // Check if category exists
  const existing = existingCategories.find(
    (c) =>
      c.name?.es?.toLowerCase() === categoryName.toLowerCase() ||
      c.name?.en?.toLowerCase() === categoryName.toLowerCase()
  );

  if (existing) {
    return existing._id;
  }

  // Check in predefined categories
  const predefined = topicsData.categories.find(
    (c) =>
      c.name_es.toLowerCase() === categoryName.toLowerCase() ||
      c.name_en.toLowerCase() === categoryName.toLowerCase()
  );

  if (predefined && !CONFIG.dryRun) {
    console.log(`   📁 Creating category: ${predefined.name_es}`);
    const newCategory = await sanityClient.create({
      _type: "category",
      name: {
        es: predefined.name_es,
        en: predefined.name_en,
        pt: predefined.name_pt,
      },
      slug: { _type: "slug", current: predefined.id },
      color: predefined.color,
    });
    existingCategories.push(newCategory);
    return newCategory._id;
  }

  return null;
}

/**
 * Suggest category based on topic
 */
function suggestCategory(topic) {
  const keywords = topic.keywords.join(" ").toLowerCase();

  if (
    keywords.includes("ahorr") ||
    keywords.includes("sav") ||
    keywords.includes("emergenc")
  ) {
    return "Ahorro";
  }
  if (
    keywords.includes("presupuest") ||
    keywords.includes("budget") ||
    keywords.includes("50/30/20")
  ) {
    return "Presupuesto";
  }
  if (
    keywords.includes("deud") ||
    keywords.includes("debt") ||
    keywords.includes("crédit")
  ) {
    return "Deudas";
  }
  return "Consejos";
}

/**
 * Download image from URL
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
        response.on("error", reject);
      })
      .on("error", reject);
  });
}

/**
 * Generate and upload image to Sanity using Gemini AI
 */
async function generateAndUploadImage(topic) {
  console.log("   🎨 Generating AI image...");

  try {
    const imagePrompt = `Professional finance blog illustration: ${topic.title_en}. 
Clean flat design, blue and teal colors, minimalist icons for savings and budgeting. 
No text, no human faces, abstract geometric shapes.`;

    if (CONFIG.dryRun) {
      console.log(
        "   [DRY RUN] Would generate image with prompt:",
        imagePrompt.substring(0, 60) + "..."
      );
      return null;
    }

    // Use Gemini 2.0 Flash Exp with image output (TESTED & WORKING)
    try {
      const imageModel = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        generationConfig: {
          responseMimeType: "text/plain",
        },
      });

      const result = await imageModel.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: `Generate an image: ${imagePrompt}` }],
          },
        ],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"],
        },
      });

      const parts = result.response.candidates?.[0]?.content?.parts || [];

      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith("image/")) {
          const imageBuffer = Buffer.from(part.inlineData.data, "base64");

          const asset = await sanityClient.assets.upload("image", imageBuffer, {
            filename: `${generateSlug(topic.title_en)}.png`,
            contentType: part.inlineData.mimeType,
          });

          console.log(`   ✅ AI Image generated: ${asset._id}`);
          return asset._id;
        }
      }

      console.log("   ⚠️  No image in AI response, using curated...");
    } catch (aiError) {
      console.log("   ⚠️  AI image failed:", aiError.message?.substring(0, 50));
    }

    // Fallback to curated finance images
    console.log("   📷 Using curated image...");
    const financeImages = [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop", // Money/wallet
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop", // Piggy bank
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop", // Charts
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=630&fit=crop", // Dollar bills
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=1200&h=630&fit=crop", // Calculator
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop", // Trading charts
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop", // Savings jar
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=630&fit=crop", // Budget planning
    ];

    const imageUrl =
      financeImages[Math.floor(Math.random() * financeImages.length)];
    const imageBuffer = await downloadImage(imageUrl);

    const asset = await sanityClient.assets.upload("image", imageBuffer, {
      filename: `${generateSlug(topic.title_en)}.jpg`,
      contentType: "image/jpeg",
    });

    console.log(`   ✅ Curated image uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("   ⚠️  Image generation failed:", error.message);
    return null;
  }
}

/**
 * SEO-optimized prompt for blog content with Bolsi integration
 */
function buildPrompt(topic, lang) {
  const langNames = {
    es: "Spanish",
    en: "English",
    pt: "Brazilian Portuguese",
  };
  const appName = "Bolsi";

  // Bolsi features to mention
  const bolsiFeatures = {
    es: `
CARACTERÍSTICAS DE BOLSI A MENCIONAR (elige 2-3 relevantes al tema):
- Registro de gastos en segundos: registrar cada compra toma menos de 10 segundos
- Gastos fijos automáticos: configura alquiler, servicios, suscripciones una vez y Bolsi los recuerda cada mes
- Presupuestos por categoría: define cuánto quieres gastar en comida, transporte, entretenimiento
- Alertas inteligentes: notificaciones cuando te acercas al límite de tu presupuesto
- Estadísticas visuales: gráficos claros que muestran a dónde va tu dinero
- Gastos compartidos: divide cuentas con pareja, roommates o familia fácilmente
- Múltiples monedas: ideal para quienes manejan dólares, pesos, reales
- Sin anuncios molestos: experiencia limpia y sin distracciones
- Funciona offline: registra gastos sin conexión, se sincroniza después`,
    en: `
BOLSI FEATURES TO MENTION (choose 2-3 relevant to the topic):
- Track expenses in seconds: logging each purchase takes less than 10 seconds
- Automatic fixed expenses: set up rent, utilities, subscriptions once and Bolsi remembers every month
- Category budgets: define how much you want to spend on food, transport, entertainment
- Smart alerts: notifications when you're approaching your budget limit
- Visual statistics: clear charts showing where your money goes
- Shared expenses: easily split bills with partner, roommates, or family
- Multiple currencies: ideal for those managing dollars, pesos, reals
- No annoying ads: clean, distraction-free experience
- Works offline: log expenses without connection, syncs later`,
    pt: `
RECURSOS DO BOLSI A MENCIONAR (escolha 2-3 relevantes ao tema):
- Registre gastos em segundos: cada compra leva menos de 10 segundos para registrar
- Gastos fixos automáticos: configure aluguel, contas, assinaturas uma vez e Bolsi lembra todo mês
- Orçamentos por categoria: defina quanto quer gastar com comida, transporte, lazer
- Alertas inteligentes: notificações quando você se aproxima do limite do orçamento
- Estatísticas visuais: gráficos claros mostrando para onde vai seu dinheiro
- Despesas compartilhadas: divida contas com parceiro, colegas de quarto ou família facilmente
- Múltiplas moedas: ideal para quem lida com dólares, pesos, reais
- Sem anúncios irritantes: experiência limpa e sem distrações
- Funciona offline: registre gastos sem conexão, sincroniza depois`,
  };

  return `You are an expert SEO content writer for a personal finance app called "${appName}".

Write a comprehensive blog post in ${langNames[lang]} about: "${
    topic[`title_${lang}`]
  }"

Keywords to include naturally: ${topic.keywords.join(", ")}

${bolsiFeatures[lang]}

REQUIREMENTS:
1. Write 800-1200 words
2. Use proper HTML formatting (h2, h3, p, ul, li, strong, em)
3. Include the main keyword in the first paragraph
4. Use H2 for main sections, H3 for subsections
5. Include practical examples and actionable tips that show REAL everyday problems
6. Mention "${appName}" 3-4 times naturally, explaining HOW it solves specific problems
7. Include a dedicated section (H2) about how ${appName} helps with this topic
8. End with a strong call-to-action to download ${appName} from Google Play
9. NO markdown, ONLY HTML tags
10. Start directly with <h2>, no title needed

STRUCTURE:
- Opening paragraph (hook + main keyword + common problem people face)
- 2-3 main sections with practical advice (H2 headers)
- Section: "Cómo ${appName} te ayuda con esto" / "How ${appName} Helps" / "Como ${appName} Ajuda" - explain specific features
- Conclusion with strong CTA and link mention to Google Play (link https://play.google.com/store/apps/details?id=com.gastosmensuales.app)

IMPORTANT: Make the ${appName} mentions feel natural and helpful, not promotional. Show how the app solves REAL problems people face daily with money management.

Write the content now:`;
}

/**
 * Generate content using Gemini with retry
 */
async function generateContent(topic, lang, retries = 3) {
  console.log(`   Generating ${lang.toUpperCase()} content...`);

  const prompt = buildPrompt(topic, lang);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await textModel.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Clean up the response
      text = text.replace(/```html\n?/g, "").replace(/```\n?/g, "");
      text = text.trim();

      // Wait before next language
      await new Promise((resolve) =>
        setTimeout(resolve, CONFIG.delayBetweenLanguages)
      );

      return text;
    } catch (error) {
      if (attempt < retries && error.message.includes("429")) {
        const waitTime = 60000 * attempt; // 1 min, 2 min, 3 min
        console.log(
          `   ⏳ Rate limited, waiting ${
            waitTime / 1000
          }s (attempt ${attempt}/${retries})...`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        console.error(`   Error generating ${lang} content:`, error.message);
        return null;
      }
    }
  }
  return null;
}

/**
 * Generate excerpt from content
 */
function generateExcerpt(html, maxLength = 160) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
}

/**
 * Create post in Sanity
 */
async function createSanityPost(topic, contents, imageAssetId, categoryId) {
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

  // Add author if exists
  if (existingAuthor?._id) {
    post.author = { _type: "reference", _ref: existingAuthor._id };
  }

  // Add category if exists
  if (categoryId) {
    post.categories = [{ _type: "reference", _ref: categoryId, _key: "cat1" }];
  }

  // Add image if uploaded
  if (imageAssetId) {
    post.mainImage = {
      _type: "image",
      asset: { _type: "reference", _ref: imageAssetId },
    };
  }

  if (CONFIG.dryRun) {
    console.log("   [DRY RUN] Would create post:", slug);
    console.log("   Title ES:", topic.title_es);
    console.log("   Excerpt:", post.excerpt.es.substring(0, 100) + "...");
    console.log("   Author:", existingAuthor?.name || "None");
    console.log("   Category:", categoryId || "None");
    console.log("   Image:", imageAssetId || "None");
    return { _id: "dry-run-id", slug };
  }

  try {
    const result = await sanityClient.create(post);
    console.log(`   ✅ Created post: ${slug} (ID: ${result._id})`);
    return result;
  } catch (error) {
    console.error("   ❌ Error creating post:", error.message);
    return null;
  }
}

/**
 * Update sitemap.xml with new post
 */
function updateSitemap(slug) {
  const sitemapPath = path.join(__dirname, "..", "sitemap.xml");
  let sitemap = fs.readFileSync(sitemapPath, "utf8");

  // Check if slug already in sitemap
  if (sitemap.includes(slug)) {
    console.log(`   📍 Slug already in sitemap: ${slug}`);
    return;
  }

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

  sitemap = sitemap.replace("</urlset>", newEntry + "\n</urlset>");

  if (!CONFIG.dryRun) {
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`   📍 Updated sitemap with: ${slug}`);
  } else {
    console.log(`   [DRY RUN] Would update sitemap with: ${slug}`);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Bolsi AI Blog Generator v2");
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

  // Load existing data
  if (!CONFIG.dryRun) {
    await loadExistingData();
  }

  // Get unused topics
  const topics = getUnusedTopics(CONFIG.postsPerRun);

  if (topics.length === 0) {
    console.log("⚠️  No unused topics available. Add more to seo-topics.json");
    process.exit(0);
  }

  console.log(`\n📝 Found ${topics.length} topics to process\n`);

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
      console.log("   ⚠️  Skipping due to generation error");
      continue;
    }

    // Generate and upload image
    const imageAssetId = await generateAndUploadImage(topic);

    // Find or create category
    const categoryName = suggestCategory(topic);
    const categoryId = await findOrCreateCategory(categoryName);
    console.log(`   📁 Category: ${categoryName}`);

    // Create post in Sanity
    const result = await createSanityPost(
      topic,
      contents,
      imageAssetId,
      categoryId
    );

    if (result) {
      // Update sitemap
      const slug = generateSlug(topic.title_es);
      updateSitemap(slug);

      // Mark topic as used
      markTopicAsUsed(topic.id);
      successCount++;
    }

    // Delay between posts
    console.log(
      `   ⏳ Waiting ${CONFIG.delayBetweenPosts / 1000}s before next post...`
    );
    await new Promise((resolve) =>
      setTimeout(resolve, CONFIG.delayBetweenPosts)
    );
  }

  console.log(`\n✨ Done! Created ${successCount}/${topics.length} posts`);

  if (successCount > 0 && !CONFIG.dryRun) {
    console.log("\n📋 Next steps:");
    console.log("   1. Review drafts in Sanity Studio");
    console.log("   2. Publish approved posts");
    console.log(
      '   3. Run: git add . && git commit -m "Add new posts" && git push'
    );
    console.log("   4. Deploy: firebase deploy --only hosting");
  }
}

main().catch(console.error);
