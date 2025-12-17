/**
 * Test AI Image Generation - Testing different API formats
 */

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require("@sanity/client");

const POST_ID = "mXsDyLN04EKCrxVbcBsSAe";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function testImageGeneration() {
  console.log("🧪 Testing AI Image Generation\n");

  const post = await sanityClient.fetch(
    `*[_id == "${POST_ID}"][0]{title, slug}`
  );
  console.log("📄 Post:", post?.title?.en || post?.title?.es);

  const imagePrompt = `Professional finance blog illustration: shared expenses and budgeting. 
Clean flat design, blue and teal colors, minimalist icons. No text, no faces.`;

  console.log("📝 Prompt:", imagePrompt, "\n");

  // Test with Gemini 2.0 Flash (multimodal with image output)
  console.log("=== Test: Gemini 2.0 Flash with Image Output ===");
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseMimeType: "text/plain",
      },
    });

    const result = await model.generateContent({
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

    const response = result.response;
    console.log("Candidates:", response.candidates?.length || 0);

    const parts = response.candidates?.[0]?.content?.parts || [];
    console.log("Parts:", parts.length);

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      console.log(
        `Part ${i}: ${
          part.text ? "TEXT" : part.inlineData ? "IMAGE" : "UNKNOWN"
        }`
      );

      if (part.inlineData) {
        console.log("  MimeType:", part.inlineData.mimeType);
        console.log("  Data length:", part.inlineData.data?.length || 0);

        if (part.inlineData.data) {
          const imageBuffer = Buffer.from(part.inlineData.data, "base64");
          console.log("  Buffer size:", imageBuffer.length, "bytes");

          const asset = await sanityClient.assets.upload("image", imageBuffer, {
            filename: "ai-generated-image.png",
            contentType: part.inlineData.mimeType,
          });
          console.log("  ✅ Uploaded:", asset._id);

          await sanityClient
            .patch(POST_ID)
            .set({
              mainImage: {
                _type: "image",
                asset: { _type: "reference", _ref: asset._id },
              },
            })
            .commit();
          console.log("  ✅ Post updated!");
        }
      }
    }
  } catch (err) {
    console.log("❌ Error:", err.message);
    if (err.message.includes("400")) {
      console.log("   This model may not support image generation");
    }
  }

  console.log("\n✨ Test complete!");
}

testImageGeneration().catch(console.error);
