const axios = require("axios");

const STRAPI_URL = "https://pc-builder-strapi-backend.onrender.com";
const API_TOKEN =
  "a1d2cdca3595af6d71abe5d92aa4841719fb297128eb8074481f21b3c093c9f0c204b8eb49d167a68f9cf068731258206a4fb286e9754ef51f52e7f03104c72e69bdeff80a7cebabdf41b6fcff476309a18a8f0e22b3f5dcf20a807c1073aebbfcd20bfdec285ba46a4baee20fb74e677539e3461ea20d7db67398a93b1a6b20";

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Your existing seed data
const categories = [
  { name: "Cases", required: false, order: 1 },
  { name: "Motherboards", required: true, order: 2 },
  { name: "CPUs", required: true, order: 3 },
  { name: "Memory", required: true, order: 4 },
  { name: "Graphics Cards", required: true, order: 5 },
  { name: "Storage", required: true, order: 6 },
  { name: "Power Supplies", required: true, order: 7 },
  { name: "Cooling", required: false, order: 8 },
];

const subCategories = [
  { name: "Mid Tower", categoryName: "Cases" },
  { name: "Full Tower", categoryName: "Cases" },
  { name: "Mini ITX", categoryName: "Cases" },
  { name: "ATX", categoryName: "Motherboards" },
  { name: "Micro ATX", categoryName: "Motherboards" },
  { name: "Mini ITX", categoryName: "Motherboards" },
  { name: "Intel", categoryName: "CPUs" },
  { name: "AMD", categoryName: "CPUs" },
  { name: "DDR4", categoryName: "Memory" },
  { name: "DDR5", categoryName: "Memory" },
  { name: "NVIDIA", categoryName: "Graphics Cards" },
  { name: "AMD", categoryName: "Graphics Cards" },
  { name: "SSD", categoryName: "Storage" },
  { name: "HDD", categoryName: "Storage" },
  { name: "NVMe", categoryName: "Storage" },
  { name: "Modular", categoryName: "Power Supplies" },
  { name: "Non-Modular", categoryName: "Power Supplies" },
  { name: "Air Cooling", categoryName: "Cooling" },
  { name: "Liquid Cooling", categoryName: "Cooling" },
];

const products = [
  {
    name: "Intel Core i7-12700K",
    description:
      "High-performance 12th Gen Intel processor with 12 cores and 20 threads.",
    price: 399.99,
    categoryName: "CPUs",
    subCategoryName: "Intel",
    specifications: {
      cores: 12,
      threads: 20,
      baseFrequency: "3.6 GHz",
      boostFrequency: "5.0 GHz",
      socket: "LGA1700",
      tdp: "125W",
    },
  },
  {
    name: "AMD Ryzen 7 5800X",
    description:
      "8-core, 16-thread processor with excellent gaming performance.",
    price: 299.99,
    categoryName: "CPUs",
    subCategoryName: "AMD",
    specifications: {
      cores: 8,
      threads: 16,
      baseFrequency: "3.8 GHz",
      boostFrequency: "4.7 GHz",
      socket: "AM4",
      tdp: "105W",
    },
  },
  {
    name: "NVIDIA RTX 4070 Ti",
    description: "Powerful graphics card for 4K gaming and content creation.",
    price: 799.99,
    categoryName: "Graphics Cards",
    subCategoryName: "NVIDIA",
    specifications: {
      memory: "12GB GDDR6X",
      coreClock: "2310 MHz",
      boostClock: "2610 MHz",
      memoryInterface: "192-bit",
      maxDisplays: 4,
    },
  },
  {
    name: "ASUS ROG Strix Z690-E",
    description: "Premium ATX motherboard with PCIe 5.0 and DDR5 support.",
    price: 449.99,
    categoryName: "Motherboards",
    subCategoryName: "ATX",
    specifications: {
      chipset: "Z690",
      socket: "LGA1700",
      memorySlots: 4,
      maxMemory: "128GB",
      expansionSlots: "PCIe 5.0 x16, PCIe 4.0 x16",
    },
  },
  {
    name: "Corsair Vengeance RGB Pro 32GB",
    description: "32GB (2x16GB) DDR4 3200MHz memory kit with RGB lighting.",
    price: 149.99,
    categoryName: "Memory",
    subCategoryName: "DDR4",
    specifications: {
      capacity: "32GB",
      speed: "3200MHz",
      latency: "CL16",
      voltage: "1.35V",
      kit: "2x16GB",
    },
  },
  {
    name: "Fractal Design Define 7",
    description:
      "Silent and spacious mid-tower case with excellent build quality.",
    price: 169.99,
    categoryName: "Cases",
    subCategoryName: "Mid Tower",
    specifications: {
      formFactor: "Mid Tower",
      maxGpuLength: "440mm",
      maxCpuCoolerHeight: "185mm",
      drivesBays: '2x 3.5", 3x 2.5"',
      fans: "3x 140mm included",
    },
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // 1. Create Categories
    console.log("📁 Creating categories...");
    const createdCategories = {};
    for (const category of categories) {
      try {
        const response = await api.post("/categories", { data: category });
        createdCategories[category.name] = response.data.data;
        console.log(`✅ Created category: ${category.name}`);
      } catch (error) {
        console.error(
          `❌ Error creating category ${category.name}:`,
          error.response?.data
        );
      }
    }

    // 2. Create Sub-categories
    console.log("📂 Creating sub-categories...");
    const createdSubCategories = {};
    for (const subCategory of subCategories) {
      try {
        const categoryId = createdCategories[subCategory.categoryName]?.id;
        if (categoryId) {
          const response = await api.post("/sub-categories", {
            data: {
              name: subCategory.name,
              category: categoryId,
            },
          });
          createdSubCategories[
            `${subCategory.categoryName}-${subCategory.name}`
          ] = response.data.data;
          console.log(
            `✅ Created sub-category: ${subCategory.name} under ${subCategory.categoryName}`
          );
        }
      } catch (error) {
        console.error(
          `❌ Error creating sub-category ${subCategory.name}:`,
          error.response?.data
        );
      }
    }

    // 3. Create Products
    console.log("📦 Creating products...");
    for (const product of products) {
      try {
        const categoryId = createdCategories[product.categoryName]?.id;
        const subCategoryId =
          createdSubCategories[
            `${product.categoryName}-${product.subCategoryName}`
          ]?.id;

        const productData = {
          name: product.name,
          description: product.description,
          price: product.price,
          slug: product.name.toLowerCase().replace(/\s+/g, "-"),
          specifications: product.specifications,
          category: categoryId,
          subCategory: subCategoryId,
        };

        const response = await api.post("/products", { data: productData });
        console.log(`✅ Created product: ${product.name}`);
      } catch (error) {
        console.error(
          `❌ Error creating product ${product.name}:`,
          error.response?.data
        );
      }
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("💥 Seeding failed:", error);
  }
}

// Run the seeding
seedDatabase();
