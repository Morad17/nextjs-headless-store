const { createStrapi } = require("@strapi/strapi");
const seedCategories = require("./seed-via-api");

async function runSeed() {
  try {
    console.log("Starting Strapi instance...");

    // Updated Strapi initialization syntax
    const strapi = await createStrapi({
      // Strapi will automatically detect your app configuration
    }).load();

    await seedCategories({ strapi });

    console.log("Closing Strapi instance...");
    await strapi.destroy();

    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

runSeed();
