// backend/scripts/fix-missing-relations.js
require("dotenv").config();
const axios = require("axios");

const STRAPI_URL = "http://localhost:1337";
const STRAPI_API_TOKEN = "";

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Map product slugs to their expected categories and subcategories
const productCategoryMapping = {
  // Cases
  "nzxt-h5-flow-mid-tower-case": {
    category: "cases",
    subCategory: "mid-tower",
  },
  "lian-li-pc-o11-dynamic-evo": { category: "cases", subCategory: "mid-tower" },
  "thermaltake-core-p3": { category: "cases", subCategory: "mid-tower" },
  "phanteks-enthoo-pro-2": { category: "cases", subCategory: "full-tower" },
  "corsair-4000d-airflow": { category: "cases", subCategory: "mid-tower" },
  "silverstone-sg13": { category: "cases", subCategory: "mini-itx" },
  "be-quiet-pure-base-500dx": { category: "cases", subCategory: "mid-tower" },

  // CPUs
  "amd-ryzen-7-7700x": { category: "cpus", subCategory: "amd-cpu" },
  "intel-core-i5-13600k": { category: "cpus", subCategory: "intel-cpu" },
  "amd-ryzen-9-7950x": { category: "cpus", subCategory: "amd-cpu" },
  "intel-core-i9-13900k": { category: "cpus", subCategory: "intel-cpu" },
  "amd-ryzen-5-7500f": { category: "cpus", subCategory: "amd-cpu" },
  "intel-core-i3-13100f": { category: "cpus", subCategory: "intel-cpu" },

  // Graphics Cards
  "nvidia-rtx-4060-ti": {
    category: "graphics-cards",
    subCategory: "nvidia-gpu",
  },
  "amd-radeon-rx-7600-xt": {
    category: "graphics-cards",
    subCategory: "amd-gpu",
  },
  "nvidia-rtx-4090": { category: "graphics-cards", subCategory: "nvidia-gpu" },
  "amd-radeon-rx-7900-xtx": {
    category: "graphics-cards",
    subCategory: "amd-gpu",
  },
  "nvidia-rtx-4070": { category: "graphics-cards", subCategory: "nvidia-gpu" },
  "intel-arc-a770": { category: "graphics-cards", subCategory: "intel-gpu" },

  // Add more mappings as needed...
};

async function getCategoryId(slug) {
  const response = await api.get(`/categories?filters[slug][$eq]=${slug}`);
  return response.data.data[0]?.id;
}

async function getSubCategoryId(slug) {
  const response = await api.get(`/sub-categories?filters[slug][$eq]=${slug}`);
  return response.data.data[0]?.id;
}

async function fixMissingRelations() {
  console.log("🔧 FIXING MISSING PRODUCT RELATIONS");
  console.log("═".repeat(60));

  try {
    // Get all products
    const response = await api.get(
      "/products?populate=pCategory&populate=pSubCategory&pagination[limit]=100"
    );
    const products = response.data.data;

    let fixedCount = 0;

    for (const product of products) {
      const hasCategory = !!product.pCategory;
      const hasSubCategory = !!product.pSubCategory;

      if (!hasCategory || !hasSubCategory) {
        console.log(`\n🔧 Fixing: ${product.name} (${product.slug})`);

        const mapping = productCategoryMapping[product.slug];
        if (mapping) {
          try {
            const categoryId = await getCategoryId(mapping.category);
            const subCategoryId = await getSubCategoryId(mapping.subCategory);

            if (categoryId && subCategoryId) {
              await api.put(`/products/${product.id}`, {
                data: {
                  pCategory: categoryId,
                  pSubCategory: subCategoryId,
                },
              });

              console.log(
                `   ✅ Fixed relations: ${mapping.category} → ${mapping.subCategory}`
              );
              fixedCount++;
            } else {
              console.log(`   ❌ Could not find category/subcategory IDs`);
            }
          } catch (error) {
            console.log(`   ❌ Failed to fix: ${error.message}`);
          }
        } else {
          console.log(`   ⚠️ No mapping found for ${product.slug}`);
        }

        // Rate limiting
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    console.log(`\n🎉 Fixed ${fixedCount} products!`);
  } catch (error) {
    console.error(
      "❌ Error fixing relations:",
      error.response?.data || error.message
    );
  }
}

fixMissingRelations();
