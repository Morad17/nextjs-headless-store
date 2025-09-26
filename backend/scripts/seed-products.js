// backend/scripts/seed-products.js
require("dotenv").config();
const axios = require("axios");

const sampleProducts = [
  // Cases
  {
    name: "NZXT H5 Flow Mid Tower Case",
    slug: "nzxt-h5-flow-mid-tower-case",
    description:
      "The NZXT H5 Flow is a premium mid-tower case featuring excellent airflow design, tempered glass side panel, and tool-free installation. Perfect for gaming and enthusiast builds with support for ATX, Micro ATX, and Mini ITX motherboards.",
    price: 89.99,
    stock: 25,
    featured: true,
    categorySlug: "cases",
    subCategorySlug: "mid-tower",
    specifications: {
      formFactor: "Mid Tower",
      motherboardSupport: ["ATX", "Micro ATX", "Mini ITX"],
      dimensions: "435 x 230 x 480 mm",
      weight: "7.2 kg",
      materials: ["Steel", "Tempered Glass"],
      frontPorts: ["2x USB 3.2", "1x USB-C", "Audio Jack"],
      expansionSlots: 7,
      driveCapacity: {
        "2.5inch": 4,
        "3.5inch": 2,
      },
      brand: "NZXT",
      model: "H5 Flow",
    },
  },
  {
    name: "Fractal Design Define 7 Full Tower",
    slug: "fractal-design-define-7-full-tower",
    description:
      "Premium full tower case with sound dampening, modular design, and extensive storage options. Ideal for high-end workstations and silent builds with exceptional build quality and cable management.",
    price: 169.99,
    stock: 15,
    featured: true,
    categorySlug: "cases",
    subCategorySlug: "full-tower",
    specifications: {
      formFactor: "Full Tower",
      motherboardSupport: ["ATX", "E-ATX", "Micro ATX", "Mini ITX"],
      dimensions: "543 x 240 x 475 mm",
      weight: "12.5 kg",
      materials: ["Steel", "Tempered Glass"],
      soundDampening: true,
      brand: "Fractal Design",
      model: "Define 7",
    },
  },
  {
    name: "Cooler Master MasterBox Q300L Mini ITX",
    slug: "cooler-master-masterbox-q300l-mini-itx",
    description:
      "Compact Mini ITX case with flexible design and magnetic dust filters. Perfect for small form factor builds while maintaining excellent cooling potential.",
    price: 44.99,
    stock: 30,
    featured: false,
    categorySlug: "cases",
    subCategorySlug: "mini-itx",
    specifications: {
      formFactor: "Mini ITX",
      motherboardSupport: ["Mini ITX"],
      dimensions: "387 x 230 x 378 mm",
      weight: "3.9 kg",
      brand: "Cooler Master",
      model: "MasterBox Q300L",
    },
  },

  // CPUs
  {
    name: "AMD Ryzen 9 7900X",
    slug: "amd-ryzen-9-7900x",
    description:
      "12-core, 24-thread processor built on 5nm Zen 4 architecture. Excellent for gaming, content creation, and professional workloads with exceptional single and multi-threaded performance.",
    price: 549.99,
    stock: 40,
    featured: true,
    categorySlug: "cpus",
    subCategorySlug: "amd-cpu",
    specifications: {
      cores: 12,
      threads: 24,
      baseClock: "4.7 GHz",
      boostClock: "5.6 GHz",
      architecture: "Zen 4",
      process: "5nm",
      socket: "AM5",
      tdp: "170W",
      cache: {
        l1: "768 KB",
        l2: "12 MB",
        l3: "64 MB",
      },
      brand: "AMD",
      model: "Ryzen 9 7900X",
    },
  },
  {
    name: "Intel Core i7-13700K",
    slug: "intel-core-i7-13700k",
    description:
      "16-core hybrid architecture processor with 8 P-cores and 8 E-cores. Perfect balance of gaming and productivity performance with Intel's latest Raptor Lake technology.",
    price: 419.99,
    stock: 35,
    featured: true,
    categorySlug: "cpus",
    subCategorySlug: "intel-cpu",
    specifications: {
      cores: 16,
      threads: 24,
      pCores: 8,
      eCores: 8,
      baseClock: "3.4 GHz",
      boostClock: "5.4 GHz",
      architecture: "Raptor Lake",
      process: "10nm",
      socket: "LGA1700",
      tdp: "125W",
      brand: "Intel",
      model: "Core i7-13700K",
    },
  },
  {
    name: "AMD Ryzen 5 7600X",
    slug: "amd-ryzen-5-7600x",
    description:
      "6-core, 12-thread gaming processor with excellent price-to-performance ratio. Ideal for gaming builds and general computing tasks.",
    price: 299.99,
    stock: 60,
    featured: false,
    categorySlug: "cpus",
    subCategorySlug: "amd-cpu",
    specifications: {
      cores: 6,
      threads: 12,
      baseClock: "4.7 GHz",
      boostClock: "5.3 GHz",
      architecture: "Zen 4",
      process: "5nm",
      socket: "AM5",
      tdp: "105W",
      brand: "AMD",
      model: "Ryzen 5 7600X",
    },
  },

  // Graphics Cards
  {
    name: "NVIDIA GeForce RTX 4070 Ti",
    slug: "nvidia-rtx-4070-ti",
    description:
      "High-performance graphics card with Ada Lovelace architecture, DLSS 3, and ray tracing capabilities. Excellent for 1440p gaming and content creation.",
    price: 799.99,
    stock: 20,
    featured: true,
    categorySlug: "graphics-cards",
    subCategorySlug: "nvidia-gpu",
    specifications: {
      architecture: "Ada Lovelace",
      process: "4nm",
      cudaCores: 7680,
      rtCores: 60,
      tensorCores: 240,
      baseClock: "2310 MHz",
      boostClock: "2610 MHz",
      memory: "12GB GDDR6X",
      memoryBus: "192-bit",
      bandwidth: "504.2 GB/s",
      tdp: "285W",
      brand: "NVIDIA",
      model: "GeForce RTX 4070 Ti",
    },
  },
  {
    name: "AMD Radeon RX 7800 XT",
    slug: "amd-radeon-rx-7800-xt",
    description:
      "Powerful graphics card based on RDNA 3 architecture with excellent 1440p performance and advanced ray tracing capabilities.",
    price: 699.99,
    stock: 25,
    featured: true,
    categorySlug: "graphics-cards",
    subCategorySlug: "amd-gpu",
    specifications: {
      architecture: "RDNA 3",
      process: "5nm",
      streamProcessors: 3840,
      rtUnits: 60,
      baseClock: "1295 MHz",
      boostClock: "2430 MHz",
      memory: "16GB GDDR6",
      memoryBus: "256-bit",
      bandwidth: "624 GB/s",
      tdp: "263W",
      brand: "AMD",
      model: "Radeon RX 7800 XT",
    },
  },

  // Motherboards
  {
    name: "ASUS ROG Strix B650E-E Gaming WiFi",
    slug: "asus-rog-strix-b650e-e-gaming-wifi",
    description:
      "Premium AMD B650E motherboard with PCIe 5.0, DDR5 support, WiFi 6E, and comprehensive gaming features. Perfect for high-end AMD Ryzen builds.",
    price: 329.99,
    stock: 30,
    featured: true,
    categorySlug: "motherboards",
    subCategorySlug: "amd-socket-motherboard",
    specifications: {
      socket: "AM5",
      chipset: "B650E",
      formFactor: "ATX",
      memorySlots: 4,
      maxMemory: "128GB",
      memoryType: "DDR5",
      pcie: {
        "5.0_x16": 1,
        "4.0_x16": 1,
        "4.0_x1": 2,
      },
      storage: {
        m2Slots: 3,
        sataConnectors: 6,
      },
      networking: ["2.5Gb Ethernet", "WiFi 6E", "Bluetooth 5.2"],
      brand: "ASUS",
      model: "ROG Strix B650E-E Gaming WiFi",
    },
  },
  {
    name: "MSI MPG Z790 Carbon WiFi",
    slug: "msi-mpg-z790-carbon-wifi",
    description:
      "High-end Intel Z790 motherboard with DDR5, PCIe 5.0, WiFi 6E, and premium components for Intel 13th gen processors.",
    price: 449.99,
    stock: 20,
    featured: true,
    categorySlug: "motherboards",
    subCategorySlug: "intel-socket-motherboard",
    specifications: {
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memorySlots: 4,
      maxMemory: "128GB",
      memoryType: "DDR5",
      brand: "MSI",
      model: "MPG Z790 Carbon WiFi",
    },
  },

  // Memory
  {
    name: "Corsair Vengeance DDR5-5600 32GB Kit",
    slug: "corsair-vengeance-ddr5-5600-32gb",
    description:
      "High-performance DDR5 memory kit with aluminum heat spreaders and optimized for AMD and Intel platforms. Perfect for gaming and professional workloads.",
    price: 189.99,
    stock: 50,
    featured: true,
    categorySlug: "memory",
    subCategorySlug: "ddr5",
    specifications: {
      capacity: "32GB",
      configuration: "2x16GB",
      type: "DDR5",
      speed: "5600 MHz",
      timings: "36-36-36-76",
      voltage: "1.25V",
      heatspreader: "Aluminum",
      compatibility: ["AMD EXPO", "Intel XMP 3.0"],
      brand: "Corsair",
      model: "Vengeance DDR5-5600",
    },
  },
  {
    name: "G.Skill Trident Z5 DDR5-6000 16GB Kit",
    slug: "gskill-trident-z5-ddr5-6000-16gb",
    description:
      "Premium DDR5 memory with high-speed performance and RGB lighting. Ideal for enthusiast gaming builds.",
    price: 129.99,
    stock: 40,
    featured: false,
    categorySlug: "memory",
    subCategorySlug: "ddr5",
    specifications: {
      capacity: "16GB",
      configuration: "2x8GB",
      type: "DDR5",
      speed: "6000 MHz",
      timings: "36-36-36-96",
      voltage: "1.35V",
      rgb: true,
      brand: "G.Skill",
      model: "Trident Z5",
    },
  },

  // SSD Storage
  {
    name: "Samsung 980 PRO 2TB NVMe SSD",
    slug: "samsung-980-pro-2tb-nvme",
    description:
      "Premium NVMe SSD with PCIe 4.0 interface, delivering exceptional performance for gaming and professional applications. Features advanced thermal management.",
    price: 199.99,
    stock: 45,
    featured: true,
    categorySlug: "ssd-storage",
    subCategorySlug: "nvme-m2",
    specifications: {
      capacity: "2TB",
      interface: "PCIe 4.0 x4",
      formFactor: "M.2 2280",
      controller: "Samsung Elpis",
      memory: "3D V-NAND",
      sequentialRead: "7,000 MB/s",
      sequentialWrite: "6,900 MB/s",
      randomRead: "1,000,000 IOPS",
      randomWrite: "1,000,000 IOPS",
      endurance: "1,200 TBW",
      warranty: "5 years",
      brand: "Samsung",
      model: "980 PRO",
    },
  },
  {
    name: "WD Black SN850X 1TB NVMe SSD",
    slug: "wd-black-sn850x-1tb-nvme",
    description:
      "High-performance gaming SSD with PCIe Gen4 technology and advanced thermal management for sustained peak performance.",
    price: 109.99,
    stock: 60,
    featured: false,
    categorySlug: "ssd-storage",
    subCategorySlug: "nvme-m2",
    specifications: {
      capacity: "1TB",
      interface: "PCIe 4.0 x4",
      formFactor: "M.2 2280",
      sequentialRead: "7,300 MB/s",
      sequentialWrite: "6,600 MB/s",
      endurance: "600 TBW",
      brand: "Western Digital",
      model: "Black SN850X",
    },
  },

  // Power Supplies
  {
    name: "Corsair RM850x 850W 80+ Gold Modular PSU",
    slug: "corsair-rm850x-850w-modular-psu",
    description:
      "Fully modular 80+ Gold certified power supply with quiet operation and premium components for stable power delivery. Perfect for high-end gaming systems.",
    price: 139.99,
    stock: 35,
    featured: true,
    categorySlug: "power-supplies",
    subCategorySlug: "modular-psu",
    specifications: {
      wattage: "850W",
      efficiency: "80+ Gold",
      modular: true,
      fanSize: "135mm",
      cables: {
        "24pin": 1,
        "8pin_cpu": 2,
        "8pin_pcie": 4,
        sata: 8,
        molex: 4,
      },
      protections: ["OVP", "UVP", "OCP", "OPP", "SCP", "OTP"],
      warranty: "10 years",
      brand: "Corsair",
      model: "RM850x",
    },
  },
  {
    name: "EVGA SuperNOVA 750W 80+ Platinum",
    slug: "evga-supernova-750w-platinum",
    description:
      "High-efficiency 80+ Platinum certified power supply with fully modular cables and exceptional build quality.",
    price: 119.99,
    stock: 25,
    featured: false,
    categorySlug: "power-supplies",
    subCategorySlug: "modular-psu",
    specifications: {
      wattage: "750W",
      efficiency: "80+ Platinum",
      modular: true,
      fanSize: "135mm",
      warranty: "10 years",
      brand: "EVGA",
      model: "SuperNOVA 750 P2",
    },
  },

  // CPU Cooling
  {
    name: "Noctua NH-D15 Air Cooler",
    slug: "noctua-nh-d15-air-cooler",
    description:
      "Premium dual-tower air cooler with exceptional cooling performance and ultra-quiet operation. Compatible with most modern sockets.",
    price: 99.99,
    stock: 40,
    featured: true,
    categorySlug: "cpu-cooling",
    subCategorySlug: "air-coolers",
    specifications: {
      type: "Air Cooler",
      height: "165mm",
      fans: "2x 140mm",
      sockets: ["AM4", "AM5", "LGA1700", "LGA1200"],
      tdpRating: "250W",
      noiseLevel: "24.6 dB(A)",
      brand: "Noctua",
      model: "NH-D15",
    },
  },
  {
    name: "Corsair H100i RGB Platinum AIO",
    slug: "corsair-h100i-rgb-platinum-aio",
    description:
      "240mm all-in-one liquid cooler with RGB lighting and advanced pump design for superior cooling performance.",
    price: 159.99,
    stock: 30,
    featured: true,
    categorySlug: "cpu-cooling",
    subCategorySlug: "aio-liquid",
    specifications: {
      type: "AIO Liquid Cooler",
      radiatorSize: "240mm",
      fans: "2x 120mm",
      pumpSpeed: "2400 RPM",
      rgb: true,
      sockets: ["AM4", "AM5", "LGA1700", "LGA1200"],
      brand: "Corsair",
      model: "H100i RGB Platinum",
    },
  },

  // Peripherals
  {
    name: "Logitech G Pro X Mechanical Keyboard",
    slug: "logitech-g-pro-x-mechanical-keyboard",
    description:
      "Tournament-grade mechanical gaming keyboard with hot-swappable switches and customizable RGB lighting. Perfect for esports and gaming.",
    price: 149.99,
    stock: 50,
    featured: true,
    categorySlug: "peripherals",
    subCategorySlug: "keyboards",
    specifications: {
      type: "Mechanical Gaming Keyboard",
      switches: "GX Blue Clicky",
      hotSwappable: true,
      rgb: true,
      connectivity: "USB-A",
      features: ["Detachable Cable", "Tournament Mode"],
      brand: "Logitech",
      model: "G Pro X",
    },
  },
  {
    name: "SteelSeries Rival 600 Gaming Mouse",
    slug: "steelseries-rival-600-gaming-mouse",
    description:
      "High-precision gaming mouse with dual optical sensors and customizable weight system for competitive gaming.",
    price: 79.99,
    stock: 45,
    featured: false,
    categorySlug: "peripherals",
    subCategorySlug: "mice",
    specifications: {
      type: "Gaming Mouse",
      sensor: "TrueMove3+ Dual Sensor",
      dpi: "12,000",
      buttons: 7,
      weight: "96g",
      rgb: true,
      brand: "SteelSeries",
      model: "Rival 600",
    },
  },
];

async function getCategoryId(categorySlug) {
  try {
    const response = await axios.get(
      `http://localhost:1337/api/categories?filters[slug][$eq]=${categorySlug}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (response.data.data.length > 0) {
      return response.data.data[0].id;
    }
    console.warn(`Category not found: ${categorySlug}`);
    return null;
  } catch (error) {
    console.error(`Error finding category ${categorySlug}:`, error.message);
    return null;
  }
}

async function getSubCategoryId(subCategorySlug) {
  try {
    const response = await axios.get(
      `http://localhost:1337/api/sub-categories?filters[slug][$eq]=${subCategorySlug}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (response.data.data.length > 0) {
      return response.data.data[0].id;
    }
    console.warn(`Sub-category not found: ${subCategorySlug}`);
    return null;
  } catch (error) {
    console.error(
      `Error finding sub-category ${subCategorySlug}:`,
      error.message
    );
    return null;
  }
}

async function createProduct(productData) {
  try {
    // Get category and subcategory IDs
    const categoryId = await getCategoryId(productData.categorySlug);
    const subCategoryId = productData.subCategorySlug
      ? await getSubCategoryId(productData.subCategorySlug)
      : null;

    if (!categoryId) {
      throw new Error(`Category not found: ${productData.categorySlug}`);
    }

    const response = await axios.post(
      "http://localhost:1337/api/products",
      {
        data: {
          name: productData.name,
          slug: productData.slug,
          description: productData.description, // Now a string
          price: productData.price,
          stock: productData.stock,
          featured: productData.featured || false,
          pCategory: categoryId,
          pSubCategory: subCategoryId,
          specifications: productData.specifications, // JSON object
          // Note: images will need to be uploaded separately or handled differently
          // For now, we're just storing the URL in specifications
          imageUrl: productData.imageUrl,
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
      `Failed to create product ${productData.name}: ${
        error.response?.data?.error?.message || error.message
      }`
    );
  }
}

async function seedProducts() {
  console.log("🛍️  Starting to seed products via API...");
  console.log("Make sure Strapi is running on http://localhost:1337\n");

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  try {
    for (const product of sampleProducts) {
      console.log(`📦 Creating product: ${product.name}`);

      try {
        await createProduct(product);
        console.log(`✅ Created: ${product.name}`);
        successCount++;
      } catch (error) {
        if (
          error.message.includes("duplicate") ||
          error.message.includes("unique") ||
          error.message.includes("already exists") ||
          error.message.includes("slug must be unique")
        ) {
          console.log(`⏭️  Skipped: ${product.name} (already exists)`);
          skipCount++;
        } else {
          console.error(`❌ Failed: ${product.name} - ${error.message}`);
          errorCount++;
        }
      }

      // Small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    console.log("\n🎉 Product seeding completed!");
    console.log(`✅ Created: ${successCount} products`);
    console.log(`⏭️  Skipped: ${skipCount} products`);
    console.log(`❌ Failed: ${errorCount} products`);

    console.log("\n📝 Next steps:");
    console.log("1. Check Strapi admin panel to verify products");
    console.log("2. Upload actual product images via Media Library");
    console.log("3. Test your frontend API calls");
    console.log("4. Link uploaded images to products");
  } catch (error) {
    console.error("\n❌ Error seeding products:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure Strapi is running: npm run develop");
    console.log("2. Check API permissions in Strapi admin");
    console.log("3. Verify categories and sub-categories exist");
    console.log("4. Make sure your API token is valid");
  }
}

// Check if we're running this script directly
if (require.main === module) {
  seedProducts();
}

module.exports = seedProducts;
