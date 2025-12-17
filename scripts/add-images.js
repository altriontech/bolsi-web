/**
 * Add images to existing posts that don't have images
 */

require("dotenv").config();
const { createClient } = require("@sanity/client");
const https = require("https");

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Post IDs to update
const postsToUpdate = [
  { id: "yF0MRMAlPLbkU9RvPGETqi", name: "envelope-method" },
  { id: "yF0MRMAlPLbkU9RvPGEVgi", name: "save-low-income" },
  { id: "yF0MRMAlPLbkU9RvPGEXJD", name: "financial-goals" },
];

// Using Lorem Picsum for reliable free images
const imageUrls = {
  "envelope-method":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop", // Wallet/money
  "save-low-income":
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop", // Piggy bank
  "financial-goals":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop", // Charts/goals
};

/**
 * Download image from URL with redirect handling
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      // Handle redirects
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        return downloadImage(response.headers.location)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        return reject(new Error(`HTTP ${response.statusCode}`));
      }

      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });
    request.on("error", reject);
  });
}

async function main() {
  console.log("🖼️  Adding images to posts without images...\n");

  for (const post of postsToUpdate) {
    console.log(`📄 Processing: ${post.name}`);

    try {
      const imageUrl = imageUrls[post.name];
      console.log(`   Downloading from: ${imageUrl}`);

      const imageBuffer = await downloadImage(imageUrl);
      console.log(`   Downloaded: ${imageBuffer.length} bytes`);

      // Upload to Sanity
      const asset = await sanityClient.assets.upload("image", imageBuffer, {
        filename: `${post.name}.jpg`,
        contentType: "image/jpeg",
      });
      console.log(`   ✅ Uploaded: ${asset._id}`);

      // Update the post with the image
      await sanityClient
        .patch(post.id)
        .set({
          mainImage: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          },
        })
        .commit();

      console.log(`   ✅ Post updated!\n`);
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
    }
  }

  console.log("✨ Done!");
}

main().catch(console.error);
