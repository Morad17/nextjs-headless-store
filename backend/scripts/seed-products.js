// backend/scripts/seed-products.js
require("dotenv").config();
const axios = require("axios");

// ✅ Local development configuration
const STRAPI_URL = "http://localhost:1337";
const STRAPI_API_TOKEN =
  "d0998661e68d4f3ee1ae03f4a12af962d940e91101071904045d0e661a0f39c4d8fc167a823afddd7a6c9f33afbe1c12189a31768cd9d9c39333f386a3eccbb952fe3d8c3f88d4c3494f75f8cdc7d2b7c39dc3476c1a8de894e68b7f0e4273f7eaed0d4a07ea403e35c4a8360bf382f0c9c1d32d871986f3d764e2bcda85baac";

// ✅ Add better error handling for debugging
const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397297/nzxt-tower_xn5yvf.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397297/fractal-tower_xkhrrx.png",
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
    imgaeUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/mini-itx-board_rozrun.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ryzen9_mill47.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397297/i7_lq9ok9.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ryzen5_o0wekv.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/4070_sshcec.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/7800XT_vptqm6.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/asus-rog0-mb_newqsv.png",
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
    imgaeUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/msi-board_hgm3og.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
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
    imgaeUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/samsung-ssd_ixflnz.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/wd-memory_l4eked.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397301/corsair-psu_qkutap.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/evga-psu_clwpel.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397298/noctua-fan_yn4jxo.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/corsair-aio_sb5efg.png",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397298/logiKeyboard_ukomtc.png",
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
    name: "Linux",
    slug: "linux-os",
    description:
      "Open-source operating system offering flexibility, security, and customization. Perfect for developers, enthusiasts, and users who want complete control over their system with extensive software repositories.",
    price: 49.99,
    stock: 45,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397297/linux_bbff2p.png",
    categorySlug: "operating-systems",
    subCategorySlug: "linux",
    specifications: {
      type: "Operating System",
      brand: "Various Distributions",
      model: "Linux Kernel",
      minRam: "2GB",
      desktop: ["GNOME", "KDE", "XFCE", "Others"],
      license: "Open Source",
      storage: "20GB+",
      fileSystem: ["ext4", "Btrfs", "ZFS", "XFS"],
      kernelType: "Monolithic",
      architecture: ["x64", "x86"],
      packageManager: "Multiple (APT, YUM, Pacman)",
      recommendedRam: "4GB+",
    },
  },
  {
    name: "Windows 11",
    slug: "windows-os",
    description:
      "Microsoft's latest operating system with modern interface, enhanced security, and productivity features. Perfect for gaming and professional use with DirectX 12 Ultimate support and improved performance.",
    price: 119.99,
    stock: 45,
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761398344/win11_qjwrye.png",
    categorySlug: "operating-systems",
    subCategorySlug: "linux",
    specifications: {
      tpm: "TPM 2.0 Required",
      type: "Operating System",
      brand: "Microsoft",
      model: "Windows 11",
      minRam: "4GB",
      directX: "DirectX 12 Ultimate",
      edition: "Home/Pro",
      license: "Digital License",
      storage: "64GB+",
      warranty: "Support Lifecycle",
      processor: "8th Gen Intel or AMD Ryzen 2000+",
      fileSystem: "NTFS",
      secureboot: "Required",
      architecture: "x64",
      recommendedRam: "8GB+",
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
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397298/mouse-steel_mfv2v4.png",
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
// const sampleProducts = [
//   {
//     name: "NZXT H5 Flow Mid Tower Case",
//     slug: "nzxt-h5-flow-mid-tower-case",
//     description:
//       "The NZXT H5 Flow is a premium mid-tower case featuring excellent airflow design, tempered glass side panel, and tool-free installation. Perfect for gaming and enthusiast builds with support for ATX, Micro ATX, and Mini ITX motherboards.",
//     price: 89.99,
//     stock: 25,
//     featured: true,
//     imageUrl:
//       "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397297/nzxt-tower_xn5yvf.png",
//     categorySlug: "cases",
//     subCategorySlug: "mid-tower",
//     specifications: {
//       formFactor: "Mid Tower",
//       motherboardSupport: ["ATX", "Micro ATX", "Mini ITX"],
//       dimensions: "435 x 230 x 480 mm",
//       weight: "7.2 kg",
//       materials: ["Steel", "Tempered Glass"],
//       frontPorts: ["2x USB 3.2", "1x USB-C", "Audio Jack"],
//       expansionSlots: 7,
//       driveCapacity: {
//         "2.5inch": 4,
//         "3.5inch": 2,
//       },
//       brand: "NZXT",
//       model: "H5 Flow",
//     },
//   },
//   // Add more products here...
// ];

async function getCategoryId(categorySlug) {
  try {
    console.log(`🔍 Looking for category with slug: "${categorySlug}"`);
    const response = await api.get(
      `/categories?filters[slug][$eq]=${categorySlug}`
    );

    console.log(`📊 Categories API response:`, {
      total: response.data.data.length,
      categories: response.data.data.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })),
    });

    if (response.data.data.length > 0) {
      const category = response.data.data[0];
      console.log(`✅ Found category: ${category.name} (ID: ${category.id})`);
      return category.id;
    }

    console.warn(`⚠️  Category not found: ${categorySlug}`);

    // Let's check what categories actually exist
    const allCategoriesResponse = await api.get("/categories");
    console.log(
      "📋 Available categories:",
      allCategoriesResponse.data.data.map((cat) => `${cat.name} (${cat.slug})`)
    );

    return null;
  } catch (error) {
    console.error(`❌ Error finding category ${categorySlug}:`);
    throw error;
  }
}

async function getSubCategoryId(subCategorySlug, categoryId) {
  try {
    console.log(
      `🔍 Looking for sub-category "${subCategorySlug}" in category ID ${categoryId}`
    );

    // ✅ For one-way relations, we need to filter properly
    const response = await api.get(
      `/sub-categories?filters[slug][$eq]=${subCategorySlug}&filters[category][id][$eq]=${categoryId}&populate=category`
    );

    console.log(`📊 Sub-categories API response:`, {
      total: response.data.data.length,
      subCategories: response.data.data.map((sub) => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        categoryId: sub.category?.id,
      })),
    });

    if (response.data.data.length > 0) {
      const subCategory = response.data.data[0];
      console.log(
        `✅ Found sub-category: ${subCategory.name} (ID: ${subCategory.id})`
      );
      return subCategory.id;
    }

    console.warn(
      `⚠️  Sub-category not found: ${subCategorySlug} for category ID ${categoryId}`
    );

    // Let's check what sub-categories exist for this category
    const allSubCategoriesResponse = await api.get(
      `/sub-categories?filters[category][id][$eq]=${categoryId}&populate=category`
    );
    console.log(
      `📋 Available sub-categories for category ${categoryId}:`,
      allSubCategoriesResponse.data.data.map(
        (sub) => `${sub.name} (${sub.slug})`
      )
    );

    return null;
  } catch (error) {
    console.error(`❌ Error finding sub-category ${subCategorySlug}:`);
    throw error;
  }
}

async function findExistingProduct(slug) {
  try {
    console.log(`🔍 Looking for existing product with slug: "${slug}"`);
    const response = await api.get(
      `/products?filters[slug][$eq]=${slug}&populate[pCategory]=*&populate[pSubCategory]=*`
    );

    const product =
      response.data.data.length > 0 ? response.data.data[0] : null;

    if (product) {
      console.log(
        `📦 Found existing product: ${product.name} (ID: ${product.id})`
      );
      console.log(
        `   Current category: ${product.pCategory?.name || "None"} (ID: ${product.pCategory?.id || "None"})`
      );
      console.log(
        `   Current sub-category: ${product.pSubCategory?.name || "None"} (ID: ${product.pSubCategory?.id || "None"})`
      );
      console.log(`   Has image: ${product.imageUrl ? "Yes" : "No"}`);
    } else {
      console.log(`❌ Product not found: ${slug}`);
    }

    return product;
  } catch (error) {
    console.error(`❌ Error finding product ${slug}:`);
    throw error;
  }
}

async function createOrUpdateProduct(productData) {
  try {
    console.log(`\n🔄 Processing: ${productData.name}`);
    console.log("─".repeat(50));

    // Get category and subcategory IDs
    const categoryId = await getCategoryId(productData.categorySlug);
    if (!categoryId) {
      throw new Error(`Category not found: ${productData.categorySlug}`);
    }

    const subCategoryId = productData.subCategorySlug
      ? await getSubCategoryId(productData.subCategorySlug, categoryId)
      : null;

    if (productData.subCategorySlug && !subCategoryId) {
      throw new Error(`SubCategory not found: ${productData.subCategorySlug}`);
    }

    // Check if product already exists
    const existingProduct = await findExistingProduct(productData.slug);

    // ✅ Fix imageUrl field (handle typos)
    const imageUrl = productData.imageUrl || productData.imgaeUrl || null;

    // ✅ Build update data for one-way relations
    const updateData = {
      name: productData.name,
      slug: productData.slug,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      featured: productData.featured || false,
      imageUrl: imageUrl,
      specifications: productData.specifications,
      // ✅ For one-way relations, just pass the ID directly
      pCategory: categoryId,
      pSubCategory: subCategoryId,
    };

    console.log(`📝 Update data:`, {
      name: updateData.name,
      slug: updateData.slug,
      price: updateData.price,
      imageUrl: imageUrl ? "SET" : "MISSING",
      pCategory: categoryId,
      pSubCategory: subCategoryId,
    });

    if (existingProduct) {
      // ✅ UPDATE existing product
      console.log(`🔄 Updating existing product (ID: ${existingProduct.id})`);

      const response = await api.put(`/products/${existingProduct.id}`, {
        data: updateData,
      });

      console.log(`✅ UPDATED: ${productData.name}`);
      console.log(`   └─ Image: ${imageUrl ? "✅ Added" : "❌ Missing"}`);
      console.log(
        `   └─ Category: ${productData.categorySlug} (ID: ${categoryId}) ✅`
      );
      console.log(
        `   └─ SubCategory: ${productData.subCategorySlug} (ID: ${subCategoryId}) ✅`
      );

      return { action: "updated", data: response.data };
    } else {
      // ✅ CREATE new product
      console.log(`🆕 Creating new product`);

      const response = await api.post("/products", {
        data: updateData,
      });

      console.log(`✅ CREATED: ${productData.name}`);
      console.log(`   └─ Image: ${imageUrl ? "✅ Added" : "❌ Missing"}`);
      console.log(
        `   └─ Category: ${productData.categorySlug} (ID: ${categoryId}) ✅`
      );
      console.log(
        `   └─ SubCategory: ${productData.subCategorySlug} (ID: ${subCategoryId}) ✅`
      );

      return { action: "created", data: response.data };
    }
  } catch (error) {
    console.error(`💥 Failed to process product ${productData.name}:`);
    console.error(
      `   Error: ${error.response?.data?.error?.message || error.message}`
    );

    if (error.response?.data?.error?.details) {
      console.error(
        `   Details:`,
        JSON.stringify(error.response.data.error.details, null, 2)
      );
    }

    throw error;
  }
}

async function debugStrapiStructure() {
  console.log("\n🔍 DEBUGGING STRAPI STRUCTURE");
  console.log("═".repeat(60));

  try {
    // Check categories
    const categoriesResponse = await api.get("/categories");
    console.log(`📁 Categories (${categoriesResponse.data.data.length}):`);
    categoriesResponse.data.data.forEach((cat) => {
      console.log(`   - ${cat.name} (slug: ${cat.slug}, ID: ${cat.id})`);
    });

    // Check sub-categories
    const subCategoriesResponse = await api.get(
      "/sub-categories?populate=category"
    );
    console.log(
      `\n📂 Sub-Categories (${subCategoriesResponse.data.data.length}):`
    );
    subCategoriesResponse.data.data.forEach((sub) => {
      console.log(
        `   - ${sub.name} (slug: ${sub.slug}, ID: ${sub.id}) → Category: ${sub.category?.name || "None"}`
      );
    });

    // Check existing products
    const productsResponse = await api.get(
      "/products?populate[pCategory]=*&populate[pSubCategory]=*"
    );
    console.log(
      `\n📦 Existing Products (${productsResponse.data.data.length}):`
    );
    productsResponse.data.data.slice(0, 5).forEach((product) => {
      console.log(`   - ${product.name}`);
      console.log(`     Category: ${product.pCategory?.name || "None"}`);
      console.log(`     SubCategory: ${product.pSubCategory?.name || "None"}`);
      console.log(`     Image: ${product.imageUrl ? "Yes" : "No"}`);
    });

    if (productsResponse.data.data.length > 5) {
      console.log(
        `   ... and ${productsResponse.data.data.length - 5} more products`
      );
    }
  } catch (error) {
    console.error("❌ Error debugging structure:", error.message);
  }
}

async function seedProducts() {
  console.log("🛍️  FORCE UPDATING PRODUCTS WITH IMAGES & CATEGORIES");
  console.log(`📡 Target: ${STRAPI_URL}`);
  console.log(`🔑 API Token: ${STRAPI_API_TOKEN ? "SET" : "NOT SET"}`);
  console.log("═".repeat(80));

  // ✅ Debug Strapi structure first
  await debugStrapiStructure();

  let createdCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  console.log("\n🔄 PROCESSING PRODUCTS...");
  console.log("═".repeat(60));

  try {
    for (const product of sampleProducts) {
      try {
        const result = await createOrUpdateProduct(product);

        switch (result.action) {
          case "created":
            createdCount++;
            break;
          case "updated":
            updatedCount++;
            break;
        }
      } catch (error) {
        console.error(`❌ ERROR: ${product.name} - ${error.message}`);
        errorCount++;
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log("\n🎉 SEEDING COMPLETED!");
    console.log("═".repeat(80));
    console.log(`📊 FINAL SUMMARY:`);
    console.log(`   🆕 Created: ${createdCount} products`);
    console.log(`   🔄 Updated: ${updatedCount} products`);
    console.log(`   ❌ Errors: ${errorCount} products`);

    if (updatedCount > 0 || createdCount > 0) {
      console.log(`\n🎉 SUCCESS! Products processed successfully!`);
    }

    if (errorCount > 0) {
      console.log(
        `\n⚠️  ${errorCount} errors occurred. Check the output above for details.`
      );
    }
  } catch (error) {
    console.error("\n❌ Product seeding failed:", error.message);
  }
}

// Run the seeding
if (require.main === module) {
  seedProducts();
}

module.exports = seedProducts;
