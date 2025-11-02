// backend/scripts/debug-relations.js
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

async function debugRelations() {
  console.log("🔍 DEBUGGING PRODUCT RELATIONS");
  console.log("═".repeat(50));

  try {
    // 1. Check a specific product's current relations
    const productResponse = await api.get(
      `/products?filters[slug][$eq]=nzxt-h5-flow-mid-tower-case&populate=*`
    );

    if (productResponse.data.data.length > 0) {
      const product = productResponse.data.data[0];
      console.log("📦 Product Details:");
      console.log(`   Name: ${product.name}`);
      console.log(
        `   pCategory: ${product.pCategory ? `${product.pCategory.name} (ID: ${product.pCategory.id})` : "NULL"}`
      );
      console.log(
        `   pSubCategory: ${product.pSubCategory ? `${product.pSubCategory.name} (ID: ${product.pSubCategory.id})` : "NULL"}`
      );
    }

    // 2. Check categories
    const categoriesResponse = await api.get(
      "/categories?filters[slug][$eq]=cases"
    );
    if (categoriesResponse.data.data.length > 0) {
      const category = categoriesResponse.data.data[0];
      console.log("\n📁 Category Details:");
      console.log(`   Name: ${category.name}`);
      console.log(`   ID: ${category.id}`);
      console.log(`   Slug: ${category.slug}`);
    }

    // 3. Check subcategories
    const subCategoriesResponse = await api.get(
      "/sub-categories?filters[slug][$eq]=mid-tower"
    );
    if (subCategoriesResponse.data.data.length > 0) {
      const subCategory = subCategoriesResponse.data.data[0];
      console.log("\n📂 SubCategory Details:");
      console.log(`   Name: ${subCategory.name}`);
      console.log(`   ID: ${subCategory.id}`);
      console.log(`   Slug: ${subCategory.slug}`);
    }

    // 4. Test manual update
    console.log("\n🧪 Testing manual relation update...");
    const categoryId = categoriesResponse.data.data[0]?.id;
    const subCategoryId = subCategoriesResponse.data.data[0]?.id;
    const productId = productResponse.data.data[0]?.id;

    if (categoryId && subCategoryId && productId) {
      const updateResponse = await api.put(`/products/${productId}`, {
        data: {
          pCategory: categoryId,
          pSubCategory: subCategoryId,
        },
      });

      console.log("✅ Manual update successful!");

      // Verify the update
      const verifyResponse = await api.get(
        `/products/${productId}?populate=pCategory&populate=pSubCategory`
      );
      const updatedProduct = verifyResponse.data.data;

      console.log("\n🔍 Verification after update:");
      console.log(
        `   pCategory: ${updatedProduct.pCategory ? `${updatedProduct.pCategory.name} (ID: ${updatedProduct.pCategory.id})` : "NULL"}`
      );
      console.log(
        `   pSubCategory: ${updatedProduct.pSubCategory ? `${updatedProduct.pSubCategory.name} (ID: ${updatedProduct.pSubCategory.id})` : "NULL"}`
      );
    }
  } catch (error) {
    console.error("❌ Debug error:", error.response?.data || error.message);
  }
}

debugRelations();
