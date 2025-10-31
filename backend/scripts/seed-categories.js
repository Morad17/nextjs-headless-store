const axios = require("axios");

// Production configuration
const STRAPI_URL = "https://nextjs-headless-store-production.up.railway.app";
const API_TOKEN =
  "d0998661e68d4f3ee1ae03f4a12af962d940e91101071904045d0e661a0f39c4d8fc167a823afddd7a6c9f33afbe1c12189a31768cd9d9c39333f386a3eccbb952fe3d8c3f88d4c3494f75f8cdc7d2b7c39dc3476c1a8de894e68b7f0e4273f7eaed0d4a07ea403e35c4a8360bf382f0c9c1d32d871986f3d764e2bcda85baac";

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("❌ Request timed out - Railway may be slow to respond");
    } else if (error.response?.status === 404) {
      console.error("❌ 404 Error - Check if Railway URL is correct");
      console.error("💡 Current URL:", STRAPI_URL);
    }
    throw error;
  }
);

// Complete categories with exact data from your system
const categories = [
  {
    name: "Cases",
    slug: "cases",
    containsSubCategories: true,
    maxAllowance: 1,
    order: 1,
    required: true,
    subcategories: [
      { name: "Full Tower", slug: "full-tower" },
      { name: "Mid Tower", slug: "mid-tower" },
      { name: "Mini ITX", slug: "mini-itx-case" },
      { name: "Micro ATX", slug: "micro-atx-case" },
    ],
  },
  {
    name: "CPU's",
    slug: "cpus",
    containsSubCategories: true,
    maxAllowance: 1,
    order: 2,
    required: true,
    subcategories: [
      { name: "Intel", slug: "intel-cpu" },
      { name: "AMD", slug: "amd-cpu" },
    ],
  },
  {
    name: "Motherboards",
    slug: "motherboards",
    containsSubCategories: true,
    maxAllowance: 1,
    order: 3,
    required: true,
    subcategories: [
      { name: "Intel Socket", slug: "intel-socket-motherboard" },
      { name: "AMD Socket", slug: "amd-socket-motherboard" },
      { name: "ATX", slug: "atx-motherboard" },
      { name: "Micro ATX", slug: "micro-atx-motherboard" },
      { name: "Mini ITX", slug: "mini-itx-motherboard" },
    ],
  },
  {
    name: "Graphics Cards",
    slug: "graphics-cards",
    containsSubCategories: true,
    maxAllowance: 1,
    order: 4,
    required: true,
    subcategories: [
      { name: "AMD", slug: "amd-gpu" },
      { name: "Nvidia", slug: "nvidia-gpu" },
      { name: "Intel", slug: "intel-gpu" },
    ],
  },
  {
    name: "Memory",
    slug: "memory",
    containsSubCategories: true,
    maxAllowance: 2,
    order: 5,
    required: true,
    subcategories: [
      { name: "DDR4", slug: "ddr4" },
      { name: "DDR5", slug: "ddr5" },
    ],
  },
  {
    name: "SSD Storage",
    slug: "ssd-storage",
    containsSubCategories: true,
    maxAllowance: 4,
    order: 6,
    required: true,
    subcategories: [
      { name: "Nvme M2", slug: "nvme-m2" },
      { name: "SATA SSD", slug: "sata-ssd" },
    ],
  },
  {
    name: "Power Supplies",
    slug: "power-supplies",
    containsSubCategories: true,
    maxAllowance: 1,
    order: 7,
    required: true,
    subcategories: [
      { name: "Modular", slug: "modular-psu" },
      { name: "Non Modular", slug: "non-modular-psu" },
    ],
  },
  {
    name: "CPU Cooling",
    slug: "cpu-cooling",
    containsSubCategories: true,
    maxAllowance: 1,
    order: 8,
    required: true,
    subcategories: [
      { name: "Air Coolers", slug: "air-coolers" },
      { name: "AIO Liquid Coolers", slug: "aio-liquid" },
    ],
  },
  {
    name: "Operating Systems",
    slug: "operating-systems",
    containsSubCategories: true,
    maxAllowance: 1,
    order: 9,
    required: true,
    subcategories: [
      { name: "Windows", slug: "windows-os" },
      { name: "Linux", slug: "linux-os" },
    ],
  },
  {
    name: "Hard Drive Storage",
    slug: "hard-drive-storage",
    containsSubCategories: false,
    maxAllowance: 10,
    order: 10,
    required: false,
    subcategories: [],
  },
  {
    name: "Case Cooling",
    slug: "case-cooling",
    containsSubCategories: true,
    maxAllowance: 10,
    order: 11,
    required: false,
    subcategories: [
      { name: "140mm Fans", slug: "140mm-fans" },
      { name: "120mm Fans", slug: "120mm-fans" },
    ],
  },
  {
    name: "Software",
    slug: "software",
    containsSubCategories: true,
    maxAllowance: 10,
    order: 12,
    required: false,
    subcategories: [
      { name: "Antivirus", slug: "antivirus" },
      { name: "Productivity", slug: "productivity" },
    ],
  },
  {
    name: "Peripherals",
    slug: "peripherals",
    containsSubCategories: true,
    maxAllowance: 100,
    order: 13,
    required: false,
    subcategories: [
      { name: "Keyboards", slug: "keyboards" },
      { name: "Mice", slug: "mice" },
      { name: "Monitors", slug: "monitors" },
      { name: "Headsets", slug: "headsets" },
      { name: "Speakers", slug: "speakers" },
    ],
  },
];

async function forceReseedSubcategories() {
  try {
    console.log("🔄 FORCE RESEEDING SUBCATEGORIES...");
    console.log(`📡 Target URL: ${STRAPI_URL}`);
    console.log("═".repeat(80));

    const categoryMap = {};
    let totalSubCategoriesProcessed = 0;
    let totalSubCategoriesCreated = 0;
    let totalSubCategoriesUpdated = 0;
    let totalErrors = 0;

    // Step 1: Get all existing categories
    console.log("\n📁 STEP 1: Loading existing categories...");
    console.log("═".repeat(60));

    const allCategoriesResponse = await api.get(
      "/categories?pagination[limit]=100"
    );
    const existingCategories = allCategoriesResponse.data.data;

    for (const category of existingCategories) {
      categoryMap[category.name] = category;
      console.log(`✅ Found category: ${category.name} (ID: ${category.id})`);
    }

    // Step 2: Delete ALL existing subcategories first (optional - uncomment if you want clean slate)
    console.log("\n🗑️  STEP 2: Cleaning existing subcategories...");
    console.log("═".repeat(60));

    const allSubCategoriesResponse = await api.get(
      "/sub-categories?pagination[limit]=1000"
    );
    const existingSubCategories = allSubCategoriesResponse.data.data;

    console.log(
      `Found ${existingSubCategories.length} existing subcategories to clean up...`
    );

    for (const subCat of existingSubCategories) {
      try {
        await api.delete(`/sub-categories/${subCat.id}`);
        console.log(`   🗑️  Deleted: ${subCat.name} (ID: ${subCat.id})`);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Rate limiting
      } catch (error) {
        console.error(`   ❌ Failed to delete ${subCat.name}:`, error.message);
      }
    }

    // Step 3: Create all subcategories fresh
    console.log("\n📂 STEP 3: Creating all subcategories fresh...");
    console.log("═".repeat(60));

    for (const categoryData of categories) {
      if (
        !categoryData.subcategories ||
        categoryData.subcategories.length === 0
      ) {
        console.log(
          `⏭️  Skipping ${categoryData.name} - no subcategories defined`
        );
        continue;
      }

      const categoryId = categoryMap[categoryData.name]?.id;
      if (!categoryId) {
        console.error(`❌ Category not found: ${categoryData.name}`);
        continue;
      }

      console.log(
        `\n🔄 Processing subcategories for: ${categoryData.name} (ID: ${categoryId})`
      );
      console.log(
        `   📊 Expected subcategories: ${categoryData.subcategories.length}`
      );

      for (const subCategoryData of categoryData.subcategories) {
        try {
          totalSubCategoriesProcessed++;
          console.log(`   🔄 Creating: ${subCategoryData.name}`);

          const createData = {
            name: subCategoryData.name,
            slug: subCategoryData.slug,
            category: categoryId, // Direct ID reference
          };

          console.log(`      📝 Data:`, createData);

          const response = await api.post("/sub-categories", {
            data: createData,
          });

          console.log(
            `      ✅ Created: ${subCategoryData.name} (ID: ${response.data.data.id})`
          );
          console.log(
            `      🔗 Linked to category: ${categoryData.name} (ID: ${categoryId})`
          );

          totalSubCategoriesCreated++;

          // Verify the creation immediately
          try {
            const verifyResponse = await api.get(
              `/sub-categories/${response.data.data.id}?populate=category`
            );
            const createdSubCat = verifyResponse.data.data;

            if (createdSubCat.category?.id === categoryId) {
              console.log(`      ✅ Verification successful - properly linked`);
            } else {
              console.log(
                `      ⚠️  Verification warning - category link might be missing`
              );
            }
          } catch (verifyError) {
            console.log(
              `      ⚠️  Could not verify creation: ${verifyError.message}`
            );
          }

          // Rate limiting
          await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`      ❌ Failed to create ${subCategoryData.name}:`);
          console.error(
            `         Error:`,
            error.response?.data?.error || error.message
          );

          if (error.response?.data?.error?.details) {
            console.error(
              `         Details:`,
              error.response.data.error.details
            );
          }

          totalErrors++;
        }
      }
    }

    // Step 4: Final verification with detailed output
    console.log("\n🔍 STEP 4: Final verification...");
    console.log("═".repeat(60));

    for (const categoryData of categories) {
      if (
        !categoryData.subcategories ||
        categoryData.subcategories.length === 0
      ) {
        continue;
      }

      const categoryId = categoryMap[categoryData.name]?.id;
      if (!categoryId) continue;

      try {
        const subCategoriesResponse = await api.get(
          `/sub-categories?filters[category][id][$eq]=${categoryId}&populate=category`
        );
        const actualSubCategories = subCategoriesResponse.data.data;

        console.log(`📊 ${categoryData.name}:`);
        console.log(
          `   Expected: ${categoryData.subcategories.length} subcategories`
        );
        console.log(`   Actual: ${actualSubCategories.length} subcategories`);

        if (actualSubCategories.length === categoryData.subcategories.length) {
          console.log(`   ✅ PERFECT MATCH!`);
        } else {
          console.log(`   ⚠️  MISMATCH DETECTED`);
        }

        // List all subcategories for this category
        actualSubCategories.forEach((subCat) => {
          console.log(
            `      - ${subCat.name} (${subCat.slug}) - ID: ${subCat.id}`
          );
        });

        console.log("");
      } catch (error) {
        console.error(
          `❌ Error verifying ${categoryData.name}:`,
          error.message
        );
      }
    }

    // Final Summary
    console.log("\n🎉 FORCE RESEED COMPLETED!");
    console.log("═".repeat(80));
    console.log(`📊 FINAL SUMMARY:`);
    console.log(
      `   📂 SubCategories Processed: ${totalSubCategoriesProcessed}`
    );
    console.log(`   ✅ SubCategories Created: ${totalSubCategoriesCreated}`);
    console.log(`   🔄 SubCategories Updated: ${totalSubCategoriesUpdated}`);
    console.log(`   ❌ Errors: ${totalErrors}`);

    if (totalErrors === 0 && totalSubCategoriesCreated > 0) {
      console.log(
        `\n🎉 SUCCESS! All subcategories should now be properly linked!`
      );
    } else if (totalErrors > 0) {
      console.log(
        `\n⚠️  Some errors occurred. Check the output above for details.`
      );
    }

    // Show final structure
    console.log("\n📋 FINAL STRUCTURE CHECK:");
    console.log("═".repeat(80));

    const finalCategoriesResponse = await api.get(
      "/categories?populate=sub_categories&sort=order&pagination[limit]=100"
    );
    const finalCategories = finalCategoriesResponse.data.data;

    finalCategories.forEach((cat) => {
      const subCount = cat.sub_categories?.length || 0;
      const expectedSubCount =
        categories.find((c) => c.name === cat.name)?.subcategories?.length || 0;
      const status = subCount === expectedSubCount ? "✅" : "⚠️";

      console.log(
        `${status} ${cat.order}. ${cat.name}: ${subCount}/${expectedSubCount} subcategories`
      );

      if (cat.sub_categories && cat.sub_categories.length > 0) {
        cat.sub_categories.forEach((sub) => {
          console.log(`    └─ ${sub.name} (${sub.slug})`);
        });
      }
    });
  } catch (error) {
    console.error(
      "💥 Force reseed failed:",
      error.response?.data || error.message
    );
    if (error.response?.data?.error) {
      console.error(
        "Full error details:",
        JSON.stringify(error.response.data.error, null, 2)
      );
    }
  }
}

// Run the force reseed
forceReseedSubcategories();
