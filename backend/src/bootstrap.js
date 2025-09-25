// backend/src/bootstrap.js
"use strict";

const seedCategories = require("../scripts/seed-via-api");

module.exports = async ({ strapi }) => {
  // Only run seeding in development and if SEED_DATA env var is set
  if (
    process.env.NODE_ENV === "development" &&
    process.env.SEED_DATA === "true"
  ) {
    console.log("Running category seeding...");
    await seedCategories({ strapi });
  }
};
