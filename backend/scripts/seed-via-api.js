// backend/scripts/seed-via-api.js
require("dotenv").config();
const axios = require("axios");

const categories = [
  {
    name: "Cases",
    slug: "cases",
    description: "PC Cases and Enclosures",
    containsSubCategories: true,
    subcategories: [
      { name: "Full Tower", slug: "full-tower" },
      { name: "Mid Tower", slug: "mid-tower" },
      { name: "Mini ITX", slug: "mini-itx-case" },
      { name: "Micro ATX", slug: "micro-atx-case" },
    ],
  },
  {
    name: "CPUs",
    slug: "cpus",
    description: "Processors",
    containsSubCategories: true,
    subcategories: [
      { name: "Intel", slug: "intel-cpu" },
      { name: "AMD", slug: "amd-cpu" },
    ],
  },
  {
    name: "Graphics Cards",
    slug: "graphics-cards",
    description: "Graphics Cards and GPUs",
    containsSubCategories: true,
    subcategories: [
      { name: "Nvidia", slug: "nvidia-gpu" },
      { name: "Intel", slug: "intel-gpu" },
      { name: "AMD", slug: "amd-gpu" },
    ],
  },
  {
    name: "Motherboards",
    slug: "motherboards",
    description: "Motherboards",
    containsSubCategories: true,
    subcategories: [
      { name: "Intel Socket", slug: "intel-socket-motherboard" },
      { name: "AMD Socket", slug: "amd-socket-motherboard" },
      { name: "ATX", slug: "atx-motherboard" },
      { name: "Micro ATX", slug: "micro-atx-motherboard" },
      { name: "Mini ITX", slug: "mini-itx-motherboard" },
    ],
  },
  {
    name: "Memory",
    slug: "memory",
    description: "RAM and Memory",
    containsSubCategories: true,
    subcategories: [
      { name: "DDR5", slug: "ddr5" },
      { name: "DDR4", slug: "ddr4" },
    ],
  },
  {
    name: "SSD Storage",
    slug: "ssd-storage",
    description: "Solid State Drives",
    containsSubCategories: true,
    subcategories: [
      { name: "NVMe M.2", slug: "nvme-m2" },
      { name: "SATA SSD", slug: "sata-ssd" },
    ],
  },
  {
    name: "Hard Drive Storage",
    slug: "hard-drive-storage",
    description: "Hard Disk Drives",
    containsSubCategories: false,
  },
  {
    name: "Power Supplies",
    slug: "power-supplies",
    description: "PSUs",
    containsSubCategories: true,
    subcategories: [
      { name: "Modular", slug: "modular-psu" },
      { name: "Non-Modular", slug: "non-modular-psu" },
    ],
  },
  {
    name: "CPU Cooling",
    slug: "cpu-cooling",
    description: "CPU Coolers",
    containsSubCategories: true,
    subcategories: [
      { name: "Air Coolers", slug: "air-coolers" },
      { name: "AIO Liquid Coolers", slug: "aio-liquid" },
    ],
  },
  {
    name: "Case Cooling",
    slug: "case-cooling",
    description: "Case Fans and Cooling",
    containsSubCategories: true,
    subcategories: [
      { name: "120mm Fans", slug: "120mm-fans" },
      { name: "140mm Fans", slug: "140mm-fans" },
      { name: "RGB Fans", slug: "rgb-fans" },
    ],
  },
  {
    name: "Operating Systems",
    slug: "operating-systems",
    description: "OS Software",
    containsSubCategories: true,
    subcategories: [
      { name: "Windows", slug: "windows-os" },
      { name: "Linux", slug: "linux-os" },
    ],
  },
  {
    name: "Software",
    slug: "software",
    description: "PC Software",
    containsSubCategories: true,
    subcategories: [
      { name: "Antivirus", slug: "antivirus" },
      { name: "Productivity", slug: "productivity" },
    ],
  },
  {
    name: "Peripherals",
    slug: "peripherals",
    description: "PC Peripherals",
    containsSubCategories: true,
    subcategories: [
      { name: "Keyboards", slug: "keyboards" },
      { name: "Mice", slug: "mice" },
      { name: "Monitors", slug: "monitors" },
      { name: "Headsets", slug: "headsets" },
      { name: "Speakers", slug: "speakers" },
    ],
  },
];

async function createCategory(categoryData, parentId = null) {
  try {
    const response = await axios.post(
      "http://localhost:1337/api/categories",
      {
        data: {
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          containsSubCategories: categoryData.containsSubCategories,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to create category ${categoryData.name}: ${error.response?.data?.error?.message || error.message}`
    );
  }
}

async function seedCategories() {
  console.log("🌱 Starting to seed categories via API...");
  console.log("Make sure Strapi is running on http://localhost:1337\n");

  try {
    // Create main categories first
    const mainCategories = [];

    for (const category of categories) {
      console.log(`📁 Creating main category: ${category.name}`);

      try {
        const mainCategory = await createCategory(category);
        mainCategories.push({
          ...mainCategory.data,
          subcategories: category.subcategories || [],
        });
        console.log(`✅ Created: ${category.name}`);
      } catch (error) {
        if (
          error.message.includes("duplicate") ||
          error.message.includes("unique") ||
          error.message.includes("already exists")
        ) {
          console.log(`⏭️  Skipped: ${category.name} (already exists)`);

          // Still add to mainCategories for subcategory creation
          const existingCategory = await axios.get(
            `http://localhost:1337/api/categories?filters[slug][$eq]=${category.slug}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
              },
            }
          );

          const data = existingCategory.data;
          if (data.data.length > 0) {
            mainCategories.push({
              ...data.data[0],
              subcategories: category.subcategories || [],
            });
          }
        } else {
          console.error(`❌ Failed: ${category.name} - ${error.message}`);
        }
      }

      // Small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    console.log("\n🔗 Creating subcategories...\n");

    // Create subcategories
    for (const mainCategory of mainCategories) {
      if (mainCategory.subcategories && mainCategory.subcategories.length > 0) {
        console.log(
          `📁 Creating subcategories for: ${mainCategory.attributes.name}`
        );

        for (const subcat of mainCategory.subcategories) {
          try {
            // Pass the parent category ID
            await createCategory(subcat, mainCategory.id);
            console.log(`  ✅ Created subcategory: ${subcat.name}`);
          } catch (error) {
            if (
              error.message.includes("duplicate") ||
              error.message.includes("unique") ||
              error.message.includes("already exists")
            ) {
              console.log(
                `  ⏭️  Skipped subcategory: ${subcat.name} (already exists)`
              );
            } else {
              console.error(
                `  ❌ Failed subcategory: ${subcat.name} - ${error.message}`
              );
            }
          }

          // Small delay
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }
    }

    console.log("\n🎉 Category seeding completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("1. Check Strapi admin panel to verify categories");
    console.log("2. Add some sample products");
    console.log("3. Test your frontend API calls");
  } catch (error) {
    console.error("\n❌ Error seeding categories:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure Strapi is running: npm run develop");
    console.log("2. Check API permissions in Strapi admin");
    console.log("3. Verify the Category content type exists");
  }
}

// Check if we're running this script directly
if (require.main === module) {
  seedCategories();
}

module.exports = seedCategories;
