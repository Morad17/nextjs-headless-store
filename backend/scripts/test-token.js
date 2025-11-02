// backend/scripts/test-specific-product.js
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

async function testProductAccess() {
  console.log("🔍 Testing Product ID 233 Access");
  console.log("═".repeat(50));

  try {
    // Test 1: Can we GET the product by ID directly?
    console.log("1️⃣ Testing GET /products/233...");
    const getResponse = await api.get("/products/233");
    console.log(`✅ GET successful: ${getResponse.data.data.name}`);

    // Test 2: Can we GET the product with populate?
    console.log("\n2️⃣ Testing GET /products/233 with populate...");
    const getPopulateResponse = await api.get("/products/233?populate=*");
    console.log(`✅ GET with populate successful`);
    console.log(
      `   Category: ${getPopulateResponse.data.data.pCategory?.name || "None"}`
    );
    console.log(
      `   SubCategory: ${getPopulateResponse.data.data.pSubCategory?.name || "None"}`
    );
    console.log(
      `   Image: ${getPopulateResponse.data.data.imageUrl || "None"}`
    );

    // Test 3: Can we UPDATE the product with a simple field?
    console.log("\n3️⃣ Testing PUT /products/233 with simple update...");
    try {
      const updateResponse = await api.put("/products/233", {
        data: {
          stock: getPopulateResponse.data.data.stock || 20, // Keep existing stock or set to 20
        },
      });
      console.log("✅ Simple PUT successful");

      // Test 4: Try updating with the imageUrl
      console.log("\n4️⃣ Testing PUT /products/233 with imageUrl...");
      const imageUpdateResponse = await api.put("/products/233", {
        data: {
          imageUrl:
            "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112525/lian-li-dynamic-evo-rgb-white-removebg-preview_dctt7x.png",
        },
      });
      console.log("✅ Image update successful");

      // Test 5: Try updating with relations
      console.log("\n5️⃣ Testing PUT /products/233 with relations...");
      const relationUpdateResponse = await api.put("/products/233", {
        data: {
          pCategory: 58,
          pSubCategory: 4,
        },
      });
      console.log("✅ Relations update successful");
    } catch (updateError) {
      console.log("❌ PUT failed:");
      console.log(`   Status: ${updateError.response?.status}`);
      console.log(`   Error: ${updateError.response?.data?.error?.message}`);
      console.log(
        `   Details: ${JSON.stringify(updateError.response?.data?.error?.details || {}, null, 2)}`
      );
    }
  } catch (error) {
    console.error("❌ Test failed:");
    console.error(`   Status: ${error.response?.status}`);
    console.error(`   Error: ${error.response?.data?.error?.message}`);
    console.error(`   Code: ${error.code}`);
  }
}

testProductAccess();
