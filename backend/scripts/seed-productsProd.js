const axios = require("axios");

// Production configuration
const STRAPI_URL = "https://pc-builder-strapi-backend.onrender.com";
const API_TOKEN = "";

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Your exact products data with descriptions and specifications
const products = [
  {
    name: "AMD Radeon RX 7800 XT",
    slug: "amd-radeon-rx-7800-xt",
    description:
      "Powerful graphics card based on RDNA 3 architecture with excellent 1440p performance and advanced ray tracing capabilities. Features 16GB of GDDR6 memory for high-resolution gaming and content creation.",
    price: 699.99,
    featured: true,
    pCategoryName: "Graphics Cards",
    pSubCategoryName: "AMD",
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
      outputs: ["3x DisplayPort 2.1", "1x HDMI 2.1"],
      directX: "12 Ultimate",
      vulkan: "1.3",
    },
  },
  {
    name: "AMD Ryzen 5 7600X",
    slug: "amd-ryzen-5-7600x",
    description:
      "6-core, 12-thread gaming processor with excellent price-to-performance ratio. Built on 5nm Zen 4 architecture with high clock speeds and low power consumption. Ideal for gaming builds and general computing tasks.",
    price: 299.99,
    featured: false,
    pCategoryName: "CPU's",
    pSubCategoryName: "AMD",
    specifications: {
      cores: 6,
      threads: 12,
      baseClock: "4.7 GHz",
      boostClock: "5.3 GHz",
      architecture: "Zen 4",
      process: "5nm",
      socket: "AM5",
      tdp: "105W",
      cache: {
        l1: "384 KB",
        l2: "6 MB",
        l3: "32 MB",
      },
      memorySupport: "DDR5-5200",
      brand: "AMD",
      model: "Ryzen 5 7600X",
      integratedGraphics: "Radeon Graphics",
    },
  },
  {
    name: "AMD Ryzen 9 7900X",
    slug: "amd-ryzen-9-7900x",
    description:
      "12-core, 24-thread processor built on 5nm Zen 4 architecture. Excellent for gaming, content creation, and professional workloads with exceptional single and multi-threaded performance.",
    price: 549.99,
    featured: true,
    pCategoryName: "CPU's",
    pSubCategoryName: "AMD",
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
      memorySupport: "DDR5-5200",
      brand: "AMD",
      model: "Ryzen 9 7900X",
      integratedGraphics: "Radeon Graphics",
    },
  },
  {
    name: "ASUS ROG Strix B650E-E Gaming WiFi",
    slug: "asus-rog-strix-b650e-e-gaming-wifi",
    description:
      "Premium AMD B650E motherboard with PCIe 5.0, DDR5 support, WiFi 6E, and comprehensive gaming features. Perfect for high-end AMD Ryzen builds with robust power delivery and advanced cooling.",
    price: 329.99,
    featured: true,
    pCategoryName: "Motherboards",
    pSubCategoryName: "AMD Socket",
    specifications: {
      socket: "AM5",
      chipset: "B650E",
      formFactor: "ATX",
      memorySlots: 4,
      maxMemory: "128GB",
      memoryType: "DDR5",
      memorySpeed: "DDR5-6400+ (OC)",
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
      audio: "SupremeFX 7.1",
      brand: "ASUS",
      model: "ROG Strix B650E-E Gaming WiFi",
    },
  },
  {
    name: "Cooler Master MasterBox Q300L Mini ITX",
    slug: "cooler-master-masterbox-q300l-mini-itx",
    description:
      "Compact Mini ITX case with flexible design and magnetic dust filters. Perfect for small form factor builds while maintaining excellent cooling potential and easy cable management.",
    price: 44.99,
    featured: false,
    pCategoryName: "Cases",
    pSubCategoryName: "Mini ITX",
    specifications: {
      formFactor: "Mini ITX",
      motherboardSupport: ["Mini ITX"],
      dimensions: "387 x 230 x 378 mm",
      weight: "3.9 kg",
      materials: ["Steel", "Acrylic"],
      frontPorts: ["2x USB 3.0", "Audio Jack"],
      expansionSlots: 2,
      driveCapacity: {
        "2.5inch": 2,
        "3.5inch": 1,
      },
      maxCpuCoolerHeight: "158mm",
      maxGpuLength: "360mm",
      brand: "Cooler Master",
      model: "MasterBox Q300L",
    },
  },
  {
    name: "Corsair H100i RGB Platinum AIO",
    slug: "corsair-h100i-rgb-platinum-aio",
    description:
      "240mm all-in-one liquid cooler with RGB lighting and advanced pump design for superior cooling performance. Features customizable RGB lighting and quiet operation.",
    price: 159.99,
    featured: true,
    pCategoryName: "CPU Cooling",
    pSubCategoryName: "AIO Liquid Coolers",
    specifications: {
      type: "AIO Liquid Cooler",
      radiatorSize: "240mm",
      fans: "2x 120mm ML Pro RGB",
      pumpSpeed: "2400 RPM",
      fanSpeed: "400-2400 RPM",
      noiseLevel: "37 dB(A)",
      rgb: true,
      sockets: ["AM4", "AM5", "LGA1700", "LGA1200", "LGA1151"],
      warranty: "5 years",
      brand: "Corsair",
      model: "H100i RGB Platinum",
    },
  },
  {
    name: "Corsair RM850x 850W 80+ Gold Modular PSU",
    slug: "corsair-rm850x-850w-modular-psu",
    description:
      "Fully modular 80+ Gold certified power supply with quiet operation and premium components for stable power delivery. Perfect for high-end gaming systems with excellent efficiency.",
    price: 139.99,
    featured: true,
    pCategoryName: "Power Supplies",
    pSubCategoryName: "Modular",
    specifications: {
      wattage: "850W",
      efficiency: "80+ Gold",
      modular: "Fully Modular",
      fanSize: "135mm",
      fanBearing: "Rifle Bearing",
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
    name: "Corsair Vengeance DDR5-5600 32GB Kit (16GB x2)",
    slug: "corsair-vengeance-ddr5-5600-32gb",
    description:
      "High-performance DDR5 memory kit with aluminum heat spreaders and optimized for AMD and Intel platforms. Perfect for gaming and professional workloads with excellent overclocking potential.",
    price: 189.99,
    featured: true,
    pCategoryName: "Memory",
    pSubCategoryName: "DDR5",
    specifications: {
      capacity: "32GB",
      configuration: "2x16GB",
      type: "DDR5",
      speed: "5600 MHz",
      timings: "36-36-36-76",
      voltage: "1.25V",
      heatspreader: "Aluminum",
      compatibility: ["AMD EXPO", "Intel XMP 3.0"],
      tested: ["AMD Ryzen 7000", "Intel 12th/13th Gen"],
      warranty: "Lifetime",
      brand: "Corsair",
      model: "Vengeance DDR5-5600",
    },
  },
  {
    name: "EVGA SuperNOVA 750W 80+ Platinum",
    slug: "evga-supernova-750w-platinum",
    description:
      "High-efficiency 80+ Platinum certified power supply with fully modular cables and exceptional build quality. Features premium Japanese capacitors and silent operation.",
    price: 119.99,
    featured: false,
    pCategoryName: "Power Supplies",
    pSubCategoryName: "Modular",
    specifications: {
      wattage: "750W",
      efficiency: "80+ Platinum",
      modular: "Fully Modular",
      fanSize: "135mm",
      fanBearing: "Double Ball Bearing",
      protections: ["OVP", "UVP", "OCP", "OPP", "SCP", "OTP"],
      warranty: "10 years",
      brand: "EVGA",
      model: "SuperNOVA 750 P2",
      capacitors: "Japanese",
    },
  },
  {
    name: "Fractal Design Define 7 Full Tower",
    slug: "fractal-design-define-7-full-tower",
    description:
      "Premium full tower case with sound dampening, modular design, and extensive storage options. Ideal for high-end workstations and silent builds with exceptional build quality and cable management.",
    price: 169.99,
    featured: true,
    pCategoryName: "Cases",
    pSubCategoryName: "Full Tower",
    specifications: {
      formFactor: "Full Tower",
      motherboardSupport: ["ATX", "E-ATX", "Micro ATX", "Mini ITX"],
      dimensions: "543 x 240 x 475 mm",
      weight: "12.5 kg",
      materials: ["Steel", "Tempered Glass"],
      soundDampening: true,
      frontPorts: ["2x USB 3.0", "2x USB 2.0", "Audio Jack"],
      expansionSlots: 7,
      driveCapacity: {
        "2.5inch": 6,
        "3.5inch": 6,
      },
      maxCpuCoolerHeight: "185mm",
      maxGpuLength: "440mm",
      brand: "Fractal Design",
      model: "Define 7",
    },
  },
  {
    name: "G.Skill Trident Z5 DDR5-6000 16GB Kit (8GB x2)",
    slug: "gskill-trident-z5-ddr5-6000-16gb",
    description:
      "Premium DDR5 memory with high-speed performance and RGB lighting. Ideal for enthusiast gaming builds with superior overclocking capabilities and stunning aesthetics.",
    price: 129.99,
    featured: false,
    pCategoryName: "Memory",
    pSubCategoryName: "DDR5",
    specifications: {
      capacity: "16GB",
      configuration: "2x8GB",
      type: "DDR5",
      speed: "6000 MHz",
      timings: "36-36-36-96",
      voltage: "1.35V",
      heatspreader: "Aluminum",
      rgb: true,
      compatibility: ["Intel XMP 3.0", "AMD EXPO"],
      warranty: "Lifetime",
      brand: "G.Skill",
      model: "Trident Z5",
    },
  },
  {
    name: "Intel Core i7-13700K",
    slug: "intel-core-i7-13700k",
    description:
      "16-core hybrid architecture processor with 8 P-cores and 8 E-cores. Perfect balance of gaming and productivity performance with Intel's latest Raptor Lake technology and excellent overclocking potential.",
    price: 419.99,
    featured: true,
    pCategoryName: "CPU's",
    pSubCategoryName: "Intel",
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
      cache: {
        l2: "24 MB",
        l3: "30 MB",
      },
      memorySupport: "DDR5-5600, DDR4-3200",
      integratedGraphics: "Intel UHD Graphics 770",
      brand: "Intel",
      model: "Core i7-13700K",
    },
  },
  {
    name: "Linux",
    slug: "linux-os",
    description:
      "Open-source operating system offering flexibility, security, and customization. Perfect for developers, enthusiasts, and users who want complete control over their system with extensive software repositories.",
    price: 49.99,
    featured: false,
    pCategoryName: "Operating Systems",
    pSubCategoryName: "Linux",
    specifications: {
      type: "Operating System",
      architecture: ["x64", "x86"],
      license: "Open Source",
      kernelType: "Monolithic",
      fileSystem: ["ext4", "Btrfs", "ZFS", "XFS"],
      packageManager: "Multiple (APT, YUM, Pacman)",
      desktop: ["GNOME", "KDE", "XFCE", "Others"],
      minRam: "2GB",
      recommendedRam: "4GB+",
      storage: "20GB+",
      brand: "Various Distributions",
      model: "Linux Kernel",
    },
  },
  {
    name: "Logitech G Pro X Mechanical Keyboard",
    slug: "logitech-g-pro-x-mechanical-keyboard",
    description:
      "Tournament-grade mechanical gaming keyboard with hot-swappable switches and customizable RGB lighting. Perfect for esports and gaming with professional-grade build quality and precision.",
    price: 149.99,
    featured: true,
    pCategoryName: "Peripherals",
    pSubCategoryName: "Keyboards",
    specifications: {
      type: "Mechanical Gaming Keyboard",
      switches: "GX Blue Clicky (Hot-swappable)",
      layout: "Tenkeyless",
      keycaps: "PBT",
      hotSwappable: true,
      rgb: "LIGHTSYNC RGB",
      connectivity: "USB-A (Detachable)",
      features: ["Tournament Mode", "Game Mode", "Media Controls"],
      dimensions: "361 x 153 x 34 mm",
      weight: "980g",
      warranty: "2 years",
      brand: "Logitech",
      model: "G Pro X",
    },
  },
  {
    name: "MSI MPG Z790 Carbon WiFi",
    slug: "msi-mpg-z790-carbon-wifi",
    description:
      "High-end Intel Z790 motherboard with DDR5, PCIe 5.0, WiFi 6E, and premium components for Intel 13th gen processors. Features robust power delivery and advanced overclocking capabilities.",
    price: 449.99,
    featured: true,
    pCategoryName: "Motherboards",
    pSubCategoryName: "Intel Socket",
    specifications: {
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memorySlots: 4,
      maxMemory: "128GB",
      memoryType: "DDR5",
      memorySpeed: "DDR5-7200+ (OC)",
      pcie: {
        "5.0_x16": 1,
        "4.0_x16": 2,
        "3.0_x1": 3,
      },
      storage: {
        m2Slots: 4,
        sataConnectors: 6,
      },
      networking: ["2.5Gb Ethernet", "WiFi 6E", "Bluetooth 5.3"],
      audio: "Audio Boost 5",
      brand: "MSI",
      model: "MPG Z790 Carbon WiFi",
    },
  },
  {
    name: "NVIDIA GeForce RTX 4070 Ti",
    slug: "nvidia-rtx-4070-ti",
    description:
      "High-performance graphics card with Ada Lovelace architecture, DLSS 3, and ray tracing capabilities. Excellent for 1440p gaming and content creation with exceptional power efficiency.",
    price: 799.99,
    featured: true,
    pCategoryName: "Graphics Cards",
    pSubCategoryName: "Nvidia",
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
      outputs: ["3x DisplayPort 1.4a", "1x HDMI 2.1"],
      directX: "12 Ultimate",
      rayTracing: "3rd Gen RT Cores",
      dlss: "DLSS 3",
      brand: "NVIDIA",
      model: "GeForce RTX 4070 Ti",
    },
  },
  {
    name: "NZXT H5 Flow Mid Tower Case",
    slug: "nzxt-h5-flow-mid-tower-case",
    description:
      "The NZXT H5 Flow is a premium mid-tower case featuring excellent airflow design, tempered glass side panel, and tool-free installation. Perfect for gaming and enthusiast builds with modern aesthetics.",
    price: 89.99,
    featured: true,
    pCategoryName: "Cases",
    pSubCategoryName: "Mid Tower",
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
      maxCpuCoolerHeight: "165mm",
      maxGpuLength: "365mm",
      preInstalledFans: "2x 140mm",
      brand: "NZXT",
      model: "H5 Flow",
    },
  },
  {
    name: "Noctua NH-D15 Air Cooler",
    slug: "noctua-nh-d15-air-cooler",
    description:
      "Premium dual-tower air cooler with exceptional cooling performance and ultra-quiet operation. Compatible with most modern sockets and renowned for legendary reliability and performance.",
    price: 99.99,
    featured: true,
    pCategoryName: "CPU Cooling",
    pSubCategoryName: "Air Coolers",
    specifications: {
      type: "Air Cooler",
      height: "165mm",
      width: "150mm",
      depth: "161mm",
      weight: "1320g",
      fans: "2x NF-A15 140mm",
      fanSpeed: "300-1500 RPM",
      airflow: "82.5 CFM",
      noiseLevel: "24.6 dB(A)",
      sockets: ["AM4", "AM5", "LGA1700", "LGA1200", "LGA1151"],
      tdpRating: "250W",
      warranty: "6 years",
      brand: "Noctua",
      model: "NH-D15",
    },
  },
  {
    name: "Samsung 980 PRO 2TB NVMe SSD",
    slug: "samsung-980-pro-2tb-nvme",
    description:
      "Premium NVMe SSD with PCIe 4.0 interface, delivering exceptional performance for gaming and professional applications. Features advanced thermal management and Samsung's latest V-NAND technology.",
    price: 199.99,
    featured: true,
    pCategoryName: "SSD Storage",
    pSubCategoryName: "Nvme M2",
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
      encryption: "AES 256-bit",
      thermalThrottling: "Dynamic Thermal Guard",
      brand: "Samsung",
      model: "980 PRO",
    },
  },
  {
    name: "SteelSeries Rival 600 Gaming Mouse",
    slug: "steelseries-rival-600-gaming-mouse",
    description:
      "High-precision gaming mouse with dual optical sensors and customizable weight system for competitive gaming. Features advanced tracking technology and ergonomic design for extended gaming sessions.",
    price: 79.99,
    featured: false,
    pCategoryName: "Peripherals",
    pSubCategoryName: "Mice",
    specifications: {
      type: "Gaming Mouse",
      sensor: "TrueMove3+ Dual Sensor",
      dpi: "12,000",
      buttons: 7,
      weight: "96g (base) + weights",
      weightSystem: "Adjustable (4g x 8)",
      rgb: "RGB Illumination",
      connectivity: "USB Wired",
      cableLength: "2m",
      dimensions: "131 x 69 x 43 mm",
      warranty: "1 year",
      brand: "SteelSeries",
      model: "Rival 600",
    },
  },
  {
    name: "WD Black SN850X 1TB NVMe SSD",
    slug: "wd-black-sn850x-1tb-nvme",
    description:
      "High-performance gaming SSD with PCIe Gen4 technology and advanced thermal management for sustained peak performance. Optimized for gaming with excellent random read/write speeds.",
    price: 109.99,
    featured: false,
    pCategoryName: "SSD Storage",
    pSubCategoryName: "Nvme M2",
    specifications: {
      capacity: "1TB",
      interface: "PCIe 4.0 x4",
      formFactor: "M.2 2280",
      sequentialRead: "7,300 MB/s",
      sequentialWrite: "6,600 MB/s",
      randomRead: "1,200,000 IOPS",
      randomWrite: "1,100,000 IOPS",
      endurance: "600 TBW",
      warranty: "5 years",
      gaming: "Game Mode 2.0",
      heatsink: "Optional",
      brand: "Western Digital",
      model: "Black SN850X",
    },
  },
  {
    name: "Windows 11",
    slug: "windows-11",
    description:
      "Microsoft's latest operating system with modern interface, enhanced security, and productivity features. Perfect for gaming and professional use with DirectX 12 Ultimate support and improved performance.",
    price: 119.99,
    featured: true,
    pCategoryName: "Operating Systems",
    pSubCategoryName: "Windows",
    specifications: {
      type: "Operating System",
      edition: "Home/Pro",
      architecture: "x64",
      license: "Digital License",
      fileSystem: "NTFS",
      directX: "DirectX 12 Ultimate",
      minRam: "4GB",
      recommendedRam: "8GB+",
      storage: "64GB+",
      tpm: "TPM 2.0 Required",
      secureboot: "Required",
      processor: "8th Gen Intel or AMD Ryzen 2000+",
      warranty: "Support Lifecycle",
      brand: "Microsoft",
      model: "Windows 11",
    },
  },
];

async function getCategoryId(categoryName) {
  try {
    const response = await api.get(
      `/categories?filters[name][$eq]=${encodeURIComponent(categoryName)}`
    );
    if (response.data.data.length > 0) {
      return response.data.data[0].id;
    }
    console.warn(`⚠️  Category not found: ${categoryName}`);
    return null;
  } catch (error) {
    console.error(
      `❌ Error finding category ${categoryName}:`,
      error.response?.data?.error?.message || error.message
    );
    return null;
  }
}

async function getSubCategoryId(subCategoryName, categoryId) {
  try {
    const response = await api.get(
      `/sub-categories?filters[name][$eq]=${encodeURIComponent(subCategoryName)}&filters[category][id][$eq]=${categoryId}`
    );
    if (response.data.data.length > 0) {
      return response.data.data[0].id;
    }
    console.warn(`⚠️  SubCategory not found: ${subCategoryName}`);
    return null;
  } catch (error) {
    console.error(
      `❌ Error finding subcategory ${subCategoryName}:`,
      error.response?.data?.error?.message || error.message
    );
    return null;
  }
}

async function seedProducts() {
  try {
    console.log("🛍️  Starting products seeding...");
    console.log(`📡 Target URL: ${STRAPI_URL}`);
    console.log(`🔑 Using API Token: ${API_TOKEN ? "SET" : "NOT SET"}`);

    let createdCount = 0;
    let updatedCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    console.log("\n📦 STEP 1: Processing Products...");
    console.log("═".repeat(60));

    for (const product of products) {
      try {
        console.log(`\n🔄 Processing product: ${product.name}`);

        // Get category ID
        const categoryId = await getCategoryId(product.pCategoryName);
        if (!categoryId) {
          console.log(
            `   ❌ Skipping - category ${product.pCategoryName} not found`
          );
          errorCount++;
          continue;
        }

        // Get subcategory ID
        const subCategoryId = await getSubCategoryId(
          product.pSubCategoryName,
          categoryId
        );
        if (!subCategoryId) {
          console.log(
            `   ❌ Skipping - subcategory ${product.pSubCategoryName} not found`
          );
          errorCount++;
          continue;
        }

        // Check if product already exists
        const existingProducts = await api.get(
          `/products?filters[slug][$eq]=${product.slug}`
        );

        if (existingProducts.data.data.length > 0) {
          const existingProduct = existingProducts.data.data[0];

          // Check if update is needed
          const needsUpdate =
            existingProduct.name !== product.name ||
            existingProduct.price !== product.price ||
            existingProduct.featured !== product.featured ||
            existingProduct.description !== product.description ||
            JSON.stringify(existingProduct.specifications) !==
              JSON.stringify(product.specifications) ||
            existingProduct.pCategory?.id !== categoryId ||
            existingProduct.pSubCategory?.id !== subCategoryId;

          if (needsUpdate) {
            console.log(`   🔄 Updating existing product...`);

            const updateData = {
              name: product.name,
              slug: product.slug,
              description: product.description,
              specifications: product.specifications,
              price: product.price,
              featured: product.featured,
              pCategory: categoryId,
              pSubCategory: subCategoryId,
            };

            const updatedProduct = await api.put(
              `/products/${existingProduct.id}`,
              {
                data: updateData,
              }
            );

            console.log(
              `   ✅ Updated: ${product.name} (ID: ${existingProduct.id})`
            );
            console.log(`      └─ Price: $${product.price}`);
            console.log(`      └─ Featured: ${product.featured}`);
            console.log(`      └─ Category: ${product.pCategoryName}`);
            console.log(`      └─ SubCategory: ${product.pSubCategoryName}`);
            console.log(
              `      └─ Description: ${product.description ? "Updated" : "Not set"}`
            );
            console.log(
              `      └─ Specifications: ${product.specifications ? "Updated" : "Not set"}`
            );
            updatedCount++;
          } else {
            console.log(
              `   ✅ Already up to date: ${product.name} (ID: ${existingProduct.id})`
            );
            skipCount++;
          }
        } else {
          // Create new product
          console.log(`   🆕 Creating new product...`);

          const productData = {
            name: product.name,
            slug: product.slug,
            description: product.description,
            specifications: product.specifications,
            price: product.price,
            featured: product.featured,
            pCategory: categoryId,
            pSubCategory: subCategoryId,
          };

          const response = await api.post("/products", { data: productData });
          console.log(
            `   ✅ Created: ${product.name} (ID: ${response.data.data.id})`
          );
          console.log(`      └─ Price: $${product.price}`);
          console.log(`      └─ Featured: ${product.featured}`);
          console.log(`      └─ Category: ${product.pCategoryName}`);
          console.log(`      └─ SubCategory: ${product.pSubCategoryName}`);
          console.log(
            `      └─ Description: ${product.description ? "Added" : "Not set"}`
          );
          console.log(
            `      └─ Specifications: ${product.specifications ? "Added" : "Not set"}`
          );
          createdCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 150));
      } catch (error) {
        console.error(
          `   ❌ Error with product ${product.name}:`,
          error.response?.data?.error?.message || error.message
        );
        errorCount++;
      }
    }

    // Step 2: Verify products by category
    console.log("\n🔍 STEP 2: Verifying products by category...");
    console.log("═".repeat(60));

    const categoryStats = {};

    try {
      const allProducts = await api.get(
        "/products?populate=pCategory,pSubCategory"
      );
      const productsByCategory = {};

      allProducts.data.data.forEach((product) => {
        const categoryName = product.pCategory?.name || "No Category";
        if (!productsByCategory[categoryName]) {
          productsByCategory[categoryName] = [];
        }
        productsByCategory[categoryName].push(product);
      });

      Object.keys(productsByCategory).forEach((categoryName) => {
        const products = productsByCategory[categoryName];
        const featuredCount = products.filter((p) => p.featured).length;
        const withDescriptions = products.filter((p) => p.description).length;
        const withSpecs = products.filter((p) => p.specifications).length;
        console.log(
          `✅ ${categoryName}: ${products.length} products (${featuredCount} featured, ${withDescriptions} with descriptions, ${withSpecs} with specs)`
        );
        categoryStats[categoryName] = {
          total: products.length,
          featured: featuredCount,
          withDescriptions,
          withSpecs,
        };
      });
    } catch (error) {
      console.error("❌ Error verifying products:", error.message);
    }

    // Final Summary
    console.log("\n🎉 PRODUCTS SEEDING FINISHED!");
    console.log("═".repeat(60));
    console.log(`📊 FINAL SUMMARY:`);
    console.log(`   📦 Products:`);
    console.log(`      ✅ Created: ${createdCount}`);
    console.log(`      🔄 Updated: ${updatedCount}`);
    console.log(`      ⏭️  Skipped (up to date): ${skipCount}`);
    console.log(`      ❌ Errors: ${errorCount}`);
    console.log(`      📋 Total processed: ${products.length}`);

    // Display products by category
    console.log("\n📋 PRODUCTS BY CATEGORY:");
    console.log("═".repeat(80));
    Object.keys(categoryStats).forEach((categoryName) => {
      const stats = categoryStats[categoryName];
      console.log(
        `📁 ${categoryName}: ${stats.total} products (${stats.featured} featured, ${stats.withDescriptions} with descriptions, ${stats.withSpecs} with specs)`
      );
    });

    // Display featured products
    console.log("\n⭐ FEATURED PRODUCTS:");
    console.log("═".repeat(80));
    const featuredProducts = products.filter((p) => p.featured);
    featuredProducts.forEach((product) => {
      console.log(
        `⭐ ${product.name} - $${product.price} (${product.pCategoryName})`
      );
    });
  } catch (error) {
    console.error(
      "💥 Products seeding failed:",
      error.response?.data || error.message
    );
  }
}

// Run the products seeding
seedProducts();
