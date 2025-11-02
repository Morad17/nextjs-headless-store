// backend/scripts/seed-products.js
require("dotenv").config();
const axios = require("axios");

// ✅ Local development configuration
const STRAPI_URL = "https://nextjs-headless-store-production.up.railway.app";
const STRAPI_API_TOKEN =
  "48d25fee86712a59bdbb1b77b209942b235df1282faeeb7eefa425bd08b1954947ab55ae428a643089a0db6b6e5d056578b2b8c8b892f1792ba02bcca7bde494ee6b5a331d03d46737bebaa80dc1d6598b74d81d50a17033d3c36eb0f0406dffa9015328b39e62dcedcf02853f3d42715d4d3792c43557a386d226d9d121257f";

// ✅ Add better error handling for debugging
const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ✅ Add response interceptor for better error debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🚨 API Error Details:");
    console.error("- Status:", error.response?.status);
    console.error("- Status Text:", error.response?.statusText);
    console.error("- URL:", error.config?.url);
    console.error("- Method:", error.config?.method?.toUpperCase());

    if (error.response?.data?.error) {
      console.error("- Error Message:", error.response.data.error.message);
      console.error(
        "- Error Details:",
        JSON.stringify(error.response.data.error.details, null, 2)
      );
    }

    if (error.code) {
      console.error("- Error Code:", error.code);
    }

    throw error;
  }
);

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
    name: "Seagate Barracuda 2TB 7200 RPM HDD",
    slug: "seagate-barracuda-2tb-7200rpm-hdd",
    description:
      "Reliable 3.5-inch internal hard drive with 2TB capacity and 7200 RPM speed. Perfect for mass storage, gaming libraries, and backup solutions with proven Seagate reliability.",
    price: 54.99,
    stock: 75,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112525/pngegg_13_o6zfou.png",
    categorySlug: "hdd-storage",
    subCategorySlug: "3-5-inch",
    specifications: {
      capacity: "2TB",
      formFactor: "3.5 inch",
      interface: "SATA 6Gb/s",
      rotationalSpeed: "7200 RPM",
      cacheSize: "256MB",
      averageSeekTime: "8.5ms",
      dataTransferRate: "210 MB/s",
      powerConsumption: {
        idle: "4.1W",
        operating: "6.8W",
      },
      mtbf: "1,000,000 hours",
      warranty: "2 years",
      brand: "Seagate",
      model: "Barracuda ST2000DM008",
    },
  },
  {
    name: "Western Digital Blue 1TB 5400 RPM HDD",
    slug: "western-digital-blue-1tb-5400rpm-hdd",
    description:
      "Energy-efficient 2.5-inch laptop hard drive with 1TB capacity and 5400 RPM speed. Ideal for laptops, external enclosures, and low-power applications.",
    price: 42.99,
    stock: 60,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112525/pngegg_13_o6zfou.png",
    categorySlug: "hdd-storage",
    subCategorySlug: "2-5-inch",
    specifications: {
      capacity: "1TB",
      formFactor: "2.5 inch",
      interface: "SATA 6Gb/s",
      rotationalSpeed: "5400 RPM",
      cacheSize: "128MB",
      averageSeekTime: "12ms",
      dataTransferRate: "140 MB/s",
      thickness: "9.5mm",
      powerConsumption: {
        idle: "0.4W",
        operating: "1.4W",
      },
      mtbf: "600,000 hours",
      warranty: "2 years",
      brand: "Western Digital",
      model: "WD Blue WD10SPZX",
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
  {
    name: "Lian Li PC-O11 Dynamic EVO",
    slug: "lian-li-pc-o11-dynamic-evo",
    description:
      "Premium mid-tower case with dual-chamber design, excellent water cooling support, and stunning aesthetics. Perfect for custom loop builds.",
    price: 179.99,
    stock: 20,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112525/lian-li-dynamic-evo-rgb-white-removebg-preview_dctt7x.png",
    categorySlug: "cases",
    subCategorySlug: "mid-tower",
    specifications: {
      formFactor: "Mid Tower",
      motherboardSupport: ["ATX", "Micro ATX", "Mini ITX"],
      dimensions: "465 x 285 x 459 mm",
      weight: "11.5 kg",
      materials: ["Aluminum", "Tempered Glass"],
      brand: "Lian Li",
      model: "PC-O11 Dynamic EVO",
    },
  },
  {
    name: "Thermaltake Core P3",
    slug: "thermaltake-core-p3",
    description:
      "Open-frame ATX wall-mount case designed for showcasing high-end builds with maximum customization potential.",
    price: 159.99,
    stock: 15,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112532/thermal-removebg-preview_v7stbh.png",
    categorySlug: "cases",
    subCategorySlug: "mid-tower",
    specifications: {
      formFactor: "Open Frame ATX",
      motherboardSupport: ["ATX", "Micro ATX", "Mini ITX"],
      mounting: "Wall Mount / Desktop",
      brand: "Thermaltake",
      model: "Core P3",
    },
  },
  {
    name: "Phanteks Enthoo Pro 2",
    slug: "phanteks-enthoo-pro-2",
    description:
      "Ultra-spacious full tower case with modular interior and premium build quality for enthusiast builds.",
    price: 199.99,
    stock: 12,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112532/Screenshot_2025-11-02_191715-removebg-preview_yvkxsn.png",
    categorySlug: "cases",
    subCategorySlug: "full-tower",
    specifications: {
      formFactor: "Full Tower",
      motherboardSupport: ["E-ATX", "ATX", "Micro ATX", "Mini ITX"],
      dimensions: "575 x 235 x 550 mm",
      weight: "15.2 kg",
      brand: "Phanteks",
      model: "Enthoo Pro 2",
    },
  },
  {
    name: "Corsair 4000D Airflow",
    slug: "corsair-4000d-airflow",
    description:
      "Mid-tower case optimized for airflow with clean cable management and modern aesthetics.",
    price: 94.99,
    stock: 40,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112532/cors-removebg-preview_spwjh5.png",
    categorySlug: "cases",
    subCategorySlug: "mid-tower",
    specifications: {
      formFactor: "Mid Tower",
      motherboardSupport: ["ATX", "Micro ATX", "Mini ITX"],
      dimensions: "453 x 230 x 466 mm",
      brand: "Corsair",
      model: "4000D Airflow",
    },
  },
  {
    name: "SilverStone SG13",
    slug: "silverstone-sg13",
    description:
      "Compact Mini ITX case with excellent cooling potential in a small footprint. Perfect for HTPC builds.",
    price: 59.99,
    stock: 25,
    featured: false,
    imageUrl: "",
    categorySlug: "cases",
    subCategorySlug: "mini-itx",
    specifications: {
      formFactor: "Mini ITX",
      motherboardSupport: ["Mini ITX"],
      dimensions: "222 x 181 x 285 mm",
      weight: "2.5 kg",
      brand: "SilverStone",
      model: "SG13",
    },
  },
  {
    name: "be quiet! Pure Base 500DX",
    slug: "be-quiet-pure-base-500dx",
    description:
      "Silent mid-tower case with optimized airflow and sound dampening for quiet operation.",
    price: 109.99,
    stock: 30,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112533/bequiet-removebg-preview_pfvgct.png",
    categorySlug: "cases",
    subCategorySlug: "mid-tower",
    specifications: {
      formFactor: "Mid Tower",
      motherboardSupport: ["ATX", "Micro ATX", "Mini ITX"],
      soundDampening: true,
      brand: "be quiet!",
      model: "Pure Base 500DX",
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
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112735/ryzen-removebg-preview_jt4xrs.png",
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
  {
    name: "AMD Ryzen 7 7700X",
    slug: "amd-ryzen-7-7700x",
    description:
      "8-core, 16-thread processor with Zen 4 architecture. Excellent for gaming and content creation with high clock speeds.",
    price: 399.99,
    stock: 45,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/pngegg_9_epfo9k.png",
    categorySlug: "cpus",
    subCategorySlug: "amd-cpu",
    specifications: {
      cores: 8,
      threads: 16,
      baseClock: "4.5 GHz",
      boostClock: "5.4 GHz",
      architecture: "Zen 4",
      process: "5nm",
      socket: "AM5",
      tdp: "105W",
      brand: "AMD",
      model: "Ryzen 7 7700X",
    },
  },
  {
    name: "Intel Core i5-13600K",
    slug: "intel-core-i5-13600k",
    description:
      "14-core hybrid processor with excellent gaming performance and productivity capabilities.",
    price: 319.99,
    stock: 50,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112533/pngegg_6_yeyqna.png",
    categorySlug: "cpus",
    subCategorySlug: "intel-cpu",
    specifications: {
      cores: 14,
      threads: 20,
      pCores: 6,
      eCores: 8,
      baseClock: "3.5 GHz",
      boostClock: "5.1 GHz",
      architecture: "Raptor Lake",
      socket: "LGA1700",
      tdp: "125W",
      brand: "Intel",
      model: "Core i5-13600K",
    },
  },
  {
    name: "AMD Ryzen 9 7950X",
    slug: "amd-ryzen-9-7950x",
    description:
      "Flagship 16-core, 32-thread processor with ultimate performance for professional workloads and gaming.",
    price: 699.99,
    stock: 20,
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112735/ryzen-removebg-preview_jt4xrs.png",
    categorySlug: "cpus",
    subCategorySlug: "amd-cpu",
    specifications: {
      cores: 16,
      threads: 32,
      baseClock: "4.5 GHz",
      boostClock: "5.7 GHz",
      architecture: "Zen 4",
      process: "5nm",
      socket: "AM5",
      tdp: "170W",
      brand: "AMD",
      model: "Ryzen 9 7950X",
    },
  },
  {
    name: "Intel Core i9-13900K",
    slug: "intel-core-i9-13900k",
    description:
      "Top-tier 24-core processor with hybrid architecture for ultimate performance in gaming and productivity.",
    price: 589.99,
    stock: 25,
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/pngegg_8_hxijfu.png",
    categorySlug: "cpus",
    subCategorySlug: "intel-cpu",
    specifications: {
      cores: 24,
      threads: 32,
      pCores: 8,
      eCores: 16,
      baseClock: "3.0 GHz",
      boostClock: "5.8 GHz",
      architecture: "Raptor Lake",
      socket: "LGA1700",
      tdp: "125W",
      brand: "Intel",
      model: "Core i9-13900K",
    },
  },
  {
    name: "AMD Ryzen 5 7500F",
    slug: "amd-ryzen-5-7500f",
    description:
      "Budget-friendly 6-core processor without integrated graphics, perfect for dedicated GPU builds.",
    price: 179.99,
    stock: 60,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ryzen5_o0wekv.png",
    categorySlug: "cpus",
    subCategorySlug: "amd-cpu",
    specifications: {
      cores: 6,
      threads: 12,
      baseClock: "3.7 GHz",
      boostClock: "5.0 GHz",
      architecture: "Zen 4",
      socket: "AM5",
      tdp: "65W",
      integratedGpu: false,
      brand: "AMD",
      model: "Ryzen 5 7500F",
    },
  },
  {
    name: "Intel Core i3-13100F",
    slug: "intel-core-i3-13100f",
    description:
      "Entry-level 4-core processor without integrated graphics, ideal for budget gaming builds.",
    price: 109.99,
    stock: 70,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/pngegg_7_cz3lmn.png",
    categorySlug: "cpus",
    subCategorySlug: "intel-cpu",
    specifications: {
      cores: 4,
      threads: 8,
      baseClock: "3.4 GHz",
      boostClock: "4.5 GHz",
      architecture: "Raptor Lake",
      socket: "LGA1700",
      tdp: "58W",
      integratedGpu: false,
      brand: "Intel",
      model: "Core i3-13100F",
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
  {
    name: "NVIDIA GeForce RTX 4060 Ti",
    slug: "nvidia-rtx-4060-ti",
    description:
      "Mid-range graphics card with excellent 1080p and 1440p performance, featuring DLSS 3 and ray tracing.",
    price: 499.99,
    stock: 35,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_cspvfq.png",
    categorySlug: "graphics-cards",
    subCategorySlug: "nvidia-gpu",
    specifications: {
      architecture: "Ada Lovelace",
      process: "4nm",
      cudaCores: 4352,
      memory: "8GB GDDR6X",
      memoryBus: "128-bit",
      baseClock: "2310 MHz",
      boostClock: "2535 MHz",
      tdp: "160W",
      brand: "NVIDIA",
      model: "GeForce RTX 4060 Ti",
    },
  },
  {
    name: "AMD Radeon RX 7600 XT",
    slug: "amd-radeon-rx-7600-xt",
    description:
      "Solid 1080p gaming graphics card with RDNA 3 architecture and excellent price-to-performance ratio.",
    price: 329.99,
    stock: 40,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/raedongpu_fyniix.png",
    categorySlug: "graphics-cards",
    subCategorySlug: "amd-gpu",
    specifications: {
      architecture: "RDNA 3",
      process: "6nm",
      streamProcessors: 2048,
      memory: "8GB GDDR6",
      memoryBus: "128-bit",
      baseClock: "1755 MHz",
      boostClock: "2755 MHz",
      tdp: "165W",
      brand: "AMD",
      model: "Radeon RX 7600 XT",
    },
  },
  {
    name: "NVIDIA GeForce RTX 4090",
    slug: "nvidia-rtx-4090",
    description:
      "Flagship graphics card with uncompromising 4K gaming performance and professional content creation capabilities.",
    price: 1599.99,
    stock: 10,
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/nvidia-geforce-rtx-4090-fe-featured-removebg-preview_umveem.png",
    categorySlug: "graphics-cards",
    subCategorySlug: "nvidia-gpu",
    specifications: {
      architecture: "Ada Lovelace",
      process: "4nm",
      cudaCores: 16384,
      memory: "24GB GDDR6X",
      memoryBus: "384-bit",
      baseClock: "2230 MHz",
      boostClock: "2520 MHz",
      tdp: "450W",
      brand: "NVIDIA",
      model: "GeForce RTX 4090",
    },
  },
  {
    name: "AMD Radeon RX 7900 XTX",
    slug: "amd-radeon-rx-7900-xtx",
    description:
      "High-end graphics card with excellent 4K gaming performance and advanced ray tracing capabilities.",
    price: 999.99,
    stock: 15,
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/raedongpu_fyniix.png",
    categorySlug: "graphics-cards",
    subCategorySlug: "amd-gpu",
    specifications: {
      architecture: "RDNA 3",
      process: "5nm",
      streamProcessors: 6144,
      memory: "24GB GDDR6",
      memoryBus: "384-bit",
      baseClock: "1855 MHz",
      boostClock: "2500 MHz",
      tdp: "355W",
      brand: "AMD",
      model: "Radeon RX 7900 XTX",
    },
  },
  {
    name: "NVIDIA GeForce RTX 4070",
    slug: "nvidia-rtx-4070",
    description:
      "Well-balanced graphics card for 1440p gaming with ray tracing and DLSS 3 support.",
    price: 599.99,
    stock: 30,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/rtx-removebg-preview_d1kfhd.png",
    categorySlug: "graphics-cards",
    subCategorySlug: "nvidia-gpu",
    specifications: {
      architecture: "Ada Lovelace",
      process: "4nm",
      cudaCores: 5888,
      memory: "12GB GDDR6X",
      memoryBus: "192-bit",
      baseClock: "1920 MHz",
      boostClock: "2475 MHz",
      tdp: "200W",
      brand: "NVIDIA",
      model: "GeForce RTX 4070",
    },
  },
  {
    name: "Intel Arc A770",
    slug: "intel-arc-a770",
    description:
      "Intel's flagship discrete graphics card with competitive performance and excellent value for content creators.",
    price: 349.99,
    stock: 25,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/arc-pro-a60-graphics-elevated.png.rendition.intel.web.1648.927_kyrzfw.png",
    categorySlug: "graphics-cards",
    subCategorySlug: "intel-gpu",
    specifications: {
      architecture: "Xe HPG",
      process: "6nm",
      xeCores: 32,
      memory: "16GB GDDR6",
      memoryBus: "256-bit",
      baseClock: "2100 MHz",
      tdp: "225W",
      brand: "Intel",
      model: "Arc A770",
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
  {
    name: "MSI MAG B650 Tomahawk WiFi",
    slug: "msi-mag-b650-tomahawk-wifi",
    description:
      "Feature-rich B650 motherboard with WiFi 6E, DDR5 support, and excellent connectivity for AMD Ryzen builds.",
    price: 229.99,
    stock: 35,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/msi-board_hgm3og.png",
    categorySlug: "motherboards",
    subCategorySlug: "amd-socket-motherboard",
    specifications: {
      socket: "AM5",
      chipset: "B650",
      formFactor: "ATX",
      memorySlots: 4,
      maxMemory: "128GB",
      memoryType: "DDR5",
      brand: "MSI",
      model: "MAG B650 Tomahawk WiFi",
    },
  },
  {
    name: "ASUS Prime Z790-P WiFi",
    slug: "asus-prime-z790-p-wifi",
    description:
      "Reliable Z790 motherboard with essential features for Intel 13th gen processors and WiFi connectivity.",
    price: 199.99,
    stock: 40,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/asus-rog0-mb_newqsv.png",
    categorySlug: "motherboards",
    subCategorySlug: "intel-socket-motherboard",
    specifications: {
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memorySlots: 4,
      maxMemory: "128GB",
      memoryType: "DDR5",
      brand: "ASUS",
      model: "Prime Z790-P WiFi",
    },
  },
  {
    name: "Gigabyte B650M DS3H",
    slug: "gigabyte-b650m-ds3h",
    description:
      "Budget-friendly Micro ATX motherboard with essential features for AMD Ryzen builds.",
    price: 109.99,
    stock: 50,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/msi-board_hgm3og.png",
    categorySlug: "motherboards",
    subCategorySlug: "micro-atx-motherboard",
    specifications: {
      socket: "AM5",
      chipset: "B650",
      formFactor: "Micro ATX",
      memorySlots: 4,
      maxMemory: "128GB",
      memoryType: "DDR5",
      brand: "Gigabyte",
      model: "B650M DS3H",
    },
  },
  {
    name: "ASRock Z790M-ITX WiFi",
    slug: "asrock-z790m-itx-wifi",
    description:
      "Compact Mini ITX motherboard with premium features and WiFi for small form factor Intel builds.",
    price: 299.99,
    stock: 20,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/asus-rog0-mb_newqsv.png",
    categorySlug: "motherboards",
    subCategorySlug: "mini-itx-motherboard",
    specifications: {
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "Mini ITX",
      memorySlots: 2,
      maxMemory: "64GB",
      memoryType: "DDR5",
      brand: "ASRock",
      model: "Z790M-ITX WiFi",
    },
  },
  {
    name: "MSI PRO B760M-A WiFi",
    slug: "msi-pro-b760m-a-wifi",
    description:
      "Reliable Micro ATX motherboard with WiFi and solid features for Intel 13th gen processors.",
    price: 139.99,
    stock: 45,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/msi-board_hgm3og.png",
    categorySlug: "motherboards",
    subCategorySlug: "micro-atx-motherboard",
    specifications: {
      socket: "LGA1700",
      chipset: "B760",
      formFactor: "Micro ATX",
      memorySlots: 4,
      maxMemory: "128GB",
      memoryType: "DDR5",
      brand: "MSI",
      model: "PRO B760M-A WiFi",
    },
  },
  {
    name: "ASUS ROG Strix X670E-E Gaming WiFi",
    slug: "asus-rog-strix-x670e-e-gaming-wifi",
    description:
      "Premium X670E motherboard with top-tier features for high-end AMD Ryzen builds.",
    price: 499.99,
    stock: 15,
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/asus-rog0-mb_newqsv.png",
    categorySlug: "motherboards",
    subCategorySlug: "amd-socket-motherboard",
    specifications: {
      socket: "AM5",
      chipset: "X670E",
      formFactor: "ATX",
      memorySlots: 4,
      maxMemory: "128GB",
      memoryType: "DDR5",
      brand: "ASUS",
      model: "ROG Strix X670E-E Gaming WiFi",
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
  {
    name: "Kingston Fury Beast DDR5-5200 16GB Kit",
    slug: "kingston-fury-beast-ddr5-5200-16gb",
    description:
      "High-performance DDR5 memory with aggressive styling and optimized latencies for gaming builds.",
    price: 89.99,
    stock: 60,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
    categorySlug: "memory",
    subCategorySlug: "ddr5",
    specifications: {
      capacity: "16GB",
      configuration: "2x8GB",
      type: "DDR5",
      speed: "5200 MHz",
      timings: "40-40-40-80",
      voltage: "1.25V",
      brand: "Kingston",
      model: "Fury Beast DDR5-5200",
    },
  },
  {
    name: "Crucial DDR4-3200 32GB Kit",
    slug: "crucial-ddr4-3200-32gb",
    description:
      "Reliable DDR4 memory kit with excellent compatibility and stability for budget builds.",
    price: 79.99,
    stock: 80,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
    categorySlug: "memory",
    subCategorySlug: "ddr4",
    specifications: {
      capacity: "32GB",
      configuration: "2x16GB",
      type: "DDR4",
      speed: "3200 MHz",
      timings: "22-22-22-52",
      voltage: "1.2V",
      brand: "Crucial",
      model: "DDR4-3200",
    },
  },
  {
    name: "TeamGroup T-Force Delta RGB DDR5-6400 32GB",
    slug: "teamgroup-t-force-delta-rgb-ddr5-6400-32gb",
    description:
      "High-speed DDR5 memory with stunning RGB lighting and premium performance for enthusiast builds.",
    price: 249.99,
    stock: 25,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
    categorySlug: "memory",
    subCategorySlug: "ddr5",
    specifications: {
      capacity: "32GB",
      configuration: "2x16GB",
      type: "DDR5",
      speed: "6400 MHz",
      timings: "32-39-39-102",
      voltage: "1.4V",
      rgb: true,
      brand: "TeamGroup",
      model: "T-Force Delta RGB DDR5-6400",
    },
  },
  {
    name: "G.Skill Ripjaws V DDR4-3600 16GB Kit",
    slug: "gskill-ripjaws-v-ddr4-3600-16gb",
    description:
      "Popular DDR4 memory with excellent performance and reliability for mainstream gaming builds.",
    price: 54.99,
    stock: 100,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
    categorySlug: "memory",
    subCategorySlug: "ddr4",
    specifications: {
      capacity: "16GB",
      configuration: "2x8GB",
      type: "DDR4",
      speed: "3600 MHz",
      timings: "16-19-19-39",
      voltage: "1.35V",
      brand: "G.Skill",
      model: "Ripjaws V DDR4-3600",
    },
  },
  {
    name: "Corsair Dominator Platinum RGB DDR5-5600 64GB",
    slug: "corsair-dominator-platinum-rgb-ddr5-5600-64gb",
    description:
      "Premium DDR5 memory kit with luxurious design and top-tier performance for professional workstations.",
    price: 599.99,
    stock: 10,
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
    categorySlug: "memory",
    subCategorySlug: "ddr5",
    specifications: {
      capacity: "64GB",
      configuration: "4x16GB",
      type: "DDR5",
      speed: "5600 MHz",
      timings: "40-40-40-77",
      voltage: "1.25V",
      rgb: true,
      brand: "Corsair",
      model: "Dominator Platinum RGB DDR5-5600",
    },
  },
  {
    name: "Patriot Viper Steel DDR4-4400 16GB Kit",
    slug: "patriot-viper-steel-ddr4-4400-16gb",
    description:
      "High-speed DDR4 memory with aluminum heat spreaders for extreme overclocking performance.",
    price: 89.99,
    stock: 30,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
    categorySlug: "memory",
    subCategorySlug: "ddr4",
    specifications: {
      capacity: "16GB",
      configuration: "2x8GB",
      type: "DDR4",
      speed: "4400 MHz",
      timings: "19-19-19-39",
      voltage: "1.45V",
      brand: "Patriot",
      model: "Viper Steel DDR4-4400",
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
  {
    name: "Crucial P3 Plus 1TB NVMe SSD",
    slug: "crucial-p3-plus-1tb-nvme",
    description:
      "Affordable PCIe 4.0 NVMe SSD with solid performance for everyday computing and gaming.",
    price: 69.99,
    stock: 70,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/Pngtree_nvme_ssd_20485576_g4ka9f.png",
    categorySlug: "ssd-storage",
    subCategorySlug: "nvme-m2",
    specifications: {
      capacity: "1TB",
      interface: "PCIe 4.0 x4",
      formFactor: "M.2 2280",
      sequentialRead: "4,800 MB/s",
      sequentialWrite: "4,100 MB/s",
      endurance: "220 TBW",
      warranty: "5 years",
      brand: "Crucial",
      model: "P3 Plus",
    },
  },
  {
    name: "Kingston NV2 500GB NVMe SSD",
    slug: "kingston-nv2-500gb-nvme",
    description:
      "Budget-friendly NVMe SSD with decent performance for basic computing needs and OS installation.",
    price: 34.99,
    stock: 90,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/wd-memory_l4eked.png",
    categorySlug: "ssd-storage",
    subCategorySlug: "nvme-m2",
    specifications: {
      capacity: "500GB",
      interface: "PCIe 3.0 x4",
      formFactor: "M.2 2280",
      sequentialRead: "3,500 MB/s",
      sequentialWrite: "2,100 MB/s",
      endurance: "160 TBW",
      warranty: "3 years",
      brand: "Kingston",
      model: "NV2",
    },
  },
  {
    name: "Samsung 970 EVO Plus 1TB NVMe",
    slug: "samsung-970-evo-plus-1tb-nvme",
    description:
      "Popular NVMe SSD with excellent performance and reliability for gaming and professional applications.",
    price: 89.99,
    stock: 55,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/samsung-ssd_ixflnz.png",
    categorySlug: "ssd-storage",
    subCategorySlug: "nvme-m2",
    specifications: {
      capacity: "1TB",
      interface: "PCIe 3.0 x4",
      formFactor: "M.2 2280",
      controller: "Samsung Phoenix",
      memory: "3D V-NAND",
      sequentialRead: "3,500 MB/s",
      sequentialWrite: "3,300 MB/s",
      endurance: "600 TBW",
      warranty: "5 years",
      brand: "Samsung",
      model: "970 EVO Plus",
    },
  },
  {
    name: "Corsair MP600 PRO LPX 2TB",
    slug: "corsair-mp600-pro-lpx-2tb",
    description:
      "High-performance PCIe 4.0 SSD with low-profile design for PS5 compatibility and PC builds.",
    price: 179.99,
    stock: 30,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/wd-memory_l4eked.png",
    categorySlug: "ssd-storage",
    subCategorySlug: "nvme-m2",
    specifications: {
      capacity: "2TB",
      interface: "PCIe 4.0 x4",
      formFactor: "M.2 2280",
      sequentialRead: "7,100 MB/s",
      sequentialWrite: "6,500 MB/s",
      endurance: "1,200 TBW",
      ps5Compatible: true,
      brand: "Corsair",
      model: "MP600 PRO LPX",
    },
  },
  {
    name: "ADATA XPG SX8200 Pro 512GB",
    slug: "adata-xpg-sx8200-pro-512gb",
    description:
      "Solid mid-range NVMe SSD with good performance and value for budget-conscious builds.",
    price: 45.99,
    stock: 65,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/wd-memory_l4eked.png",
    categorySlug: "ssd-storage",
    subCategorySlug: "nvme-m2",
    specifications: {
      capacity: "512GB",
      interface: "PCIe 3.0 x4",
      formFactor: "M.2 2280",
      sequentialRead: "3,500 MB/s",
      sequentialWrite: "3,000 MB/s",
      endurance: "320 TBW",
      warranty: "5 years",
      brand: "ADATA",
      model: "XPG SX8200 Pro",
    },
  },
  {
    name: "TeamGroup MP34 1TB NVMe SSD",
    slug: "teamgroup-mp34-1tb-nvme",
    description:
      "Reliable PCIe 3.0 NVMe SSD with graphene heat spreader and solid performance for everyday use.",
    price: 59.99,
    stock: 50,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/wd-memory_l4eked.png",
    categorySlug: "ssd-storage",
    subCategorySlug: "nvme-m2",
    specifications: {
      capacity: "1TB",
      interface: "PCIe 3.0 x4",
      formFactor: "M.2 2280",
      sequentialRead: "3,400 MB/s",
      sequentialWrite: "3,000 MB/s",
      heatSpreader: "Graphene",
      endurance: "600 TBW",
      brand: "TeamGroup",
      model: "MP34",
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
  {
    name: "Seasonic Focus GX-650 650W 80+ Gold",
    slug: "seasonic-focus-gx-650-650w-gold",
    description:
      "Reliable 80+ Gold power supply with fully modular cables and excellent build quality.",
    price: 89.99,
    stock: 40,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/evga-psu_clwpel.png",
    categorySlug: "power-supplies",
    subCategorySlug: "modular-psu",
    specifications: {
      wattage: "650W",
      efficiency: "80+ Gold",
      modular: true,
      fanSize: "120mm",
      warranty: "10 years",
      brand: "Seasonic",
      model: "Focus GX-650",
    },
  },
  {
    name: "be quiet! Pure Power 11 600W",
    slug: "be-quiet-pure-power-11-600w",
    description:
      "Silent power supply with 80+ Gold efficiency and quiet operation for noise-sensitive builds.",
    price: 79.99,
    stock: 45,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_2_lqxr8d.png",
    categorySlug: "power-supplies",
    subCategorySlug: "non-modular-psu",
    specifications: {
      wattage: "600W",
      efficiency: "80+ Gold",
      modular: false,
      fanSize: "120mm",
      noiseLevel: "Very Low",
      warranty: "3 years",
      brand: "be quiet!",
      model: "Pure Power 11",
    },
  },
  {
    name: "Thermaltake Toughpower GF1 750W",
    slug: "thermaltake-toughpower-gf1-750w",
    description:
      "Fully modular 80+ Gold power supply with RGB fan and premium sleeved cables.",
    price: 109.99,
    stock: 35,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/evga-psu_clwpel.png",
    categorySlug: "power-supplies",
    subCategorySlug: "modular-psu",
    specifications: {
      wattage: "750W",
      efficiency: "80+ Gold",
      modular: true,
      fanSize: "140mm",
      rgb: true,
      warranty: "10 years",
      brand: "Thermaltake",
      model: "Toughpower GF1",
    },
  },
  {
    name: "EVGA BR 500W 80+ Bronze",
    slug: "evga-br-500w-bronze",
    description:
      "Budget-friendly 80+ Bronze power supply for basic builds with reliable performance.",
    price: 49.99,
    stock: 60,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_2_lqxr8d.png",
    categorySlug: "power-supplies",
    subCategorySlug: "non-modular-psu",
    specifications: {
      wattage: "500W",
      efficiency: "80+ Bronze",
      modular: false,
      fanSize: "120mm",
      warranty: "3 years",
      brand: "EVGA",
      model: "BR 500W",
    },
  },
  {
    name: "Corsair HX1000 1000W 80+ Platinum",
    slug: "corsair-hx1000-1000w-platinum",
    description:
      "High-wattage 80+ Platinum power supply for extreme builds and multi-GPU setups.",
    price: 199.99,
    stock: 15,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_2_lqxr8d.png",
    categorySlug: "power-supplies",
    subCategorySlug: "modular-psu",
    specifications: {
      wattage: "1000W",
      efficiency: "80+ Platinum",
      modular: true,
      fanSize: "135mm",
      warranty: "10 years",
      brand: "Corsair",
      model: "HX1000",
    },
  },
  {
    name: "MSI MPG A750GF 750W 80+ Gold",
    slug: "msi-mpg-a750gf-750w-gold",
    description:
      "Gaming-focused power supply with RGB lighting and fully modular design.",
    price: 119.99,
    stock: 30,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/evga-psu_clwpel.png",
    categorySlug: "power-supplies",
    subCategorySlug: "modular-psu",
    specifications: {
      wattage: "750W",
      efficiency: "80+ Gold",
      modular: true,
      fanSize: "135mm",
      rgb: true,
      warranty: "10 years",
      brand: "MSI",
      model: "MPG A750GF",
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
  {
    name: "Arctic Liquid Freezer II 280mm",
    slug: "arctic-liquid-freezer-ii-280mm",
    description:
      "High-performance 280mm AIO cooler with excellent cooling capacity and value.",
    price: 119.99,
    stock: 35,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/pngegg_10_cxbjtw.png",
    categorySlug: "cpu-cooling",
    subCategorySlug: "aio-liquid",
    specifications: {
      type: "AIO Liquid Cooler",
      radiatorSize: "280mm",
      fans: "2x 140mm",
      pumpSpeed: "800-2000 RPM",
      warranty: "6 years",
      brand: "Arctic",
      model: "Liquid Freezer II 280",
    },
  },
  {
    name: "be quiet! Dark Rock Pro 4",
    slug: "be-quiet-dark-rock-pro-4",
    description:
      "Premium dual-tower air cooler with excellent cooling performance and near-silent operation.",
    price: 89.99,
    stock: 40,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_1_v1s5ev.png",
    categorySlug: "cpu-cooling",
    subCategorySlug: "air-coolers",
    specifications: {
      type: "Air Cooler",
      height: "162.8mm",
      fans: "2x 120mm/135mm",
      tdpRating: "250W",
      noiseLevel: "12.8 dB(A)",
      brand: "be quiet!",
      model: "Dark Rock Pro 4",
    },
  },
  {
    name: "Cooler Master Hyper 212 RGB",
    slug: "cooler-master-hyper-212-rgb",
    description:
      "Popular budget air cooler with RGB lighting and solid cooling performance.",
    price: 39.99,
    stock: 80,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_1_v1s5ev.png",
    categorySlug: "cpu-cooling",
    subCategorySlug: "air-coolers",
    specifications: {
      type: "Air Cooler",
      height: "158.8mm",
      fans: "1x 120mm",
      tdpRating: "150W",
      rgb: true,
      brand: "Cooler Master",
      model: "Hyper 212 RGB",
    },
  },
  {
    name: "NZXT Kraken X63 280mm RGB AIO",
    slug: "nzxt-kraken-x63-280mm-rgb-aio",
    description:
      "Premium 280mm AIO cooler with customizable RGB lighting and advanced pump design.",
    price: 149.99,
    stock: 25,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/pngegg_11_cwssfd.png",
    categorySlug: "cpu-cooling",
    subCategorySlug: "aio-liquid",
    specifications: {
      type: "AIO Liquid Cooler",
      radiatorSize: "280mm",
      fans: "2x 140mm",
      rgb: true,
      smartDevice: true,
      warranty: "6 years",
      brand: "NZXT",
      model: "Kraken X63",
    },
  },
  {
    name: "Scythe Fuma 2 Rev.B",
    slug: "scythe-fuma-2-rev-b",
    description:
      "Excellent dual-tower air cooler with asymmetrical design and outstanding price-to-performance ratio.",
    price: 64.99,
    stock: 50,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_1_v1s5ev.png",
    categorySlug: "cpu-cooling",
    subCategorySlug: "air-coolers",
    specifications: {
      type: "Air Cooler",
      height: "154.5mm",
      fans: "2x 120mm",
      tdpRating: "250W",
      brand: "Scythe",
      model: "Fuma 2 Rev.B",
    },
  },
  {
    name: "Corsair iCUE H150i Elite Capellix",
    slug: "corsair-icue-h150i-elite-capellix",
    description:
      "High-end 360mm AIO cooler with Capellix RGB LEDs and advanced iCUE integration.",
    price: 189.99,
    stock: 20,
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/corsair-aio_sb5efg.png",
    categorySlug: "cpu-cooling",
    subCategorySlug: "aio-liquid",
    specifications: {
      type: "AIO Liquid Cooler",
      radiatorSize: "360mm",
      fans: "3x 120mm",
      rgb: "Capellix RGB",
      software: "iCUE",
      warranty: "5 years",
      brand: "Corsair",
      model: "iCUE H150i Elite Capellix",
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
  {
    name: "Razer DeathAdder V3 Pro",
    slug: "razer-deathadder-v3-pro",
    description:
      "Flagship wireless gaming mouse with Focus Pro 30K sensor and HyperSpeed technology.",
    price: 149.99,
    stock: 40,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112525/pngegg_17_or6e3a.png",
    categorySlug: "peripherals",
    subCategorySlug: "mice",
    specifications: {
      type: "Wireless Gaming Mouse",
      sensor: "Focus Pro 30K",
      dpi: "30,000",
      buttons: 8,
      battery: "90 hours",
      wireless: "HyperSpeed",
      brand: "Razer",
      model: "DeathAdder V3 Pro",
    },
  },
  {
    name: "Corsair K70 RGB MK.2",
    slug: "corsair-k70-rgb-mk2",
    description:
      "Premium mechanical gaming keyboard with Cherry MX switches and per-key RGB lighting.",
    price: 169.99,
    stock: 30,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397298/logiKeyboard_ukomtc.png",
    categorySlug: "peripherals",
    subCategorySlug: "keyboards",
    specifications: {
      type: "Mechanical Gaming Keyboard",
      switches: "Cherry MX Red",
      rgb: "Per-key RGB",
      connectivity: "USB",
      features: ["Media Controls", "Aluminum Frame"],
      brand: "Corsair",
      model: "K70 RGB MK.2",
    },
  },
  {
    name: 'ASUS TUF Gaming VG27AQ 27" 1440p',
    slug: "asus-tuf-gaming-vg27aq-27-1440p",
    description:
      "27-inch 1440p gaming monitor with 165Hz refresh rate and adaptive sync technology.",
    price: 329.99,
    stock: 25,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/pngegg_14_xgva70.png",
    categorySlug: "peripherals",
    subCategorySlug: "monitors",
    specifications: {
      size: "27 inches",
      resolution: "2560x1440",
      refreshRate: "165Hz",
      panelType: "IPS",
      responseTime: "1ms",
      adaptiveSync: "G-Sync Compatible",
      brand: "ASUS",
      model: "TUF Gaming VG27AQ",
    },
  },
  {
    name: "SteelSeries Arctis 7P+",
    slug: "steelseries-arctis-7p-plus",
    description:
      "Wireless gaming headset with lossless 2.4GHz connection and excellent audio quality.",
    price: 169.99,
    stock: 35,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112525/pngegg_16_zrqce2.png",
    categorySlug: "peripherals",
    subCategorySlug: "headsets",
    specifications: {
      type: "Wireless Gaming Headset",
      connectivity: "2.4GHz Wireless",
      battery: "30 hours",
      microphone: "ClearCast Gen 2",
      compatibility: ["PC", "PlayStation", "Nintendo Switch"],
      brand: "SteelSeries",
      model: "Arctis 7P+",
    },
  },
  {
    name: "Logitech Z623 2.1 Speaker System",
    slug: "logitech-z623-21-speaker-system",
    description:
      "THX-certified 2.1 speaker system with powerful subwoofer for immersive audio experience.",
    price: 149.99,
    stock: 30,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/pngegg_15_bdpfot.png",
    categorySlug: "peripherals",
    subCategorySlug: "speakers",
    specifications: {
      type: "2.1 Speaker System",
      power: "200W RMS",
      certification: "THX",
      connectivity: ["3.5mm", "RCA"],
      subwoofer: "Included",
      brand: "Logitech",
      model: "Z623",
    },
  },
  {
    name: "HyperX Alloy FPS Pro",
    slug: "hyperx-alloy-fps-pro",
    description:
      "Compact tenkeyless mechanical gaming keyboard with Cherry MX switches and solid build quality.",
    price: 89.99,
    stock: 45,
    featured: false,
    imageUrl:
      "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397298/logiKeyboard_ukomtc.png",
    categorySlug: "peripherals",
    subCategorySlug: "keyboards",
    specifications: {
      type: "Tenkeyless Mechanical Keyboard",
      switches: "Cherry MX Red",
      layout: "87-key",
      connectivity: "USB",
      features: ["Detachable Cable", "Compact Design"],
      brand: "HyperX",
      model: "Alloy FPS Pro",
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

    // ✅ Simple population without nested relations
    const response = await api.get(
      `/sub-categories?filters[slug][$eq]=${subCategorySlug}&filters[category][id][$eq]=${categoryId}`
    );

    console.log(`📊 Sub-categories API response:`, {
      total: response.data.data.length,
      subCategories: response.data.data.map((sub) => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
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
    return null;
  } catch (error) {
    console.error(`❌ Error finding sub-category ${subCategorySlug}:`);
    throw error;
  }
}

async function findExistingProduct(slug) {
  try {
    console.log(`🔍 Looking for existing product with slug: "${slug}"`);

    // ✅ Fix: Use simple population syntax without nested relations
    const response = await api.get(
      `/products?filters[slug][$eq]=${slug}&populate=pCategory&populate=pSubCategory`
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

    // ✅ Build update data - try different relation formats
    const updateData = {
      name: productData.name,
      slug: productData.slug,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      featured: productData.featured || false,
      imageUrl: imageUrl,
      specifications: productData.specifications,
    };

    // ✅ Try different ways to set relations
    console.log(
      `🔗 Setting relations: Category=${categoryId}, SubCategory=${subCategoryId}`
    );

    if (existingProduct) {
      // ✅ UPDATE existing product - try multiple approaches
      console.log(`🔄 Updating existing product (ID: ${existingProduct.id})`);

      try {
        // Method 1: Direct ID assignment
        const response1 = await api.put(`/products/${existingProduct.id}`, {
          data: {
            ...updateData,
            pCategory: categoryId,
            pSubCategory: subCategoryId,
          },
        });

        console.log(`✅ UPDATED (Method 1): ${productData.name}`);
        return { action: "updated", data: response1.data };
      } catch (error1) {
        console.log(`⚠️ Method 1 failed, trying Method 2...`);

        try {
          // Method 2: Connect format
          const response2 = await api.put(`/products/${existingProduct.id}`, {
            data: {
              ...updateData,
              pCategory: { connect: [categoryId] },
              pSubCategory: { connect: [subCategoryId] },
            },
          });

          console.log(`✅ UPDATED (Method 2): ${productData.name}`);
          return { action: "updated", data: response2.data };
        } catch (error2) {
          console.log(`⚠️ Method 2 failed, trying Method 3...`);

          try {
            // Method 3: Set format
            const response3 = await api.put(`/products/${existingProduct.id}`, {
              data: {
                ...updateData,
                pCategory: { set: [categoryId] },
                pSubCategory: { set: [subCategoryId] },
              },
            });

            console.log(`✅ UPDATED (Method 3): ${productData.name}`);
            return { action: "updated", data: response3.data };
          } catch (error3) {
            console.log(
              `⚠️ Method 3 failed, trying separate relation updates...`
            );

            // Method 4: Update product first, then relations separately
            const response4 = await api.put(`/products/${existingProduct.id}`, {
              data: updateData,
            });

            // Update relations separately
            if (categoryId) {
              await api.put(`/products/${existingProduct.id}`, {
                data: { pCategory: categoryId },
              });
            }

            if (subCategoryId) {
              await api.put(`/products/${existingProduct.id}`, {
                data: { pSubCategory: subCategoryId },
              });
            }

            console.log(`✅ UPDATED (Method 4): ${productData.name}`);
            return { action: "updated", data: response4.data };
          }
        }
      }
    } else {
      // ✅ CREATE new product
      console.log(`🆕 Creating new product`);

      try {
        // Method 1: Direct ID assignment
        const response = await api.post("/products", {
          data: {
            ...updateData,
            pCategory: categoryId,
            pSubCategory: subCategoryId,
          },
        });

        console.log(`✅ CREATED: ${productData.name}`);
        return { action: "created", data: response.data };
      } catch (createError) {
        console.log(
          `⚠️ Create with relations failed, trying without relations first...`
        );

        // Create without relations first
        const response = await api.post("/products", {
          data: updateData,
        });

        const newProductId = response.data.data.id;

        // Add relations separately
        if (categoryId) {
          await api.put(`/products/${newProductId}`, {
            data: { pCategory: categoryId },
          });
        }

        if (subCategoryId) {
          await api.put(`/products/${newProductId}`, {
            data: { pSubCategory: subCategoryId },
          });
        }

        console.log(
          `✅ CREATED (with separate relations): ${productData.name}`
        );
        return { action: "created", data: response.data };
      }
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
    // ✅ Simple queries without complex population
    const categoriesResponse = await api.get("/categories");
    console.log(`📁 Categories (${categoriesResponse.data.data.length}):`);
    categoriesResponse.data.data.forEach((cat) => {
      console.log(`   - ${cat.name} (slug: ${cat.slug}, ID: ${cat.id})`);
    });

    // ✅ Simple sub-categories query
    const subCategoriesResponse = await api.get("/sub-categories");
    console.log(
      `\n📂 Sub-Categories (${subCategoriesResponse.data.data.length}):`
    );
    subCategoriesResponse.data.data.forEach((sub) => {
      console.log(`   - ${sub.name} (slug: ${sub.slug}, ID: ${sub.id})`);
    });

    // ✅ Simple products query
    const productsResponse = await api.get("/products");
    console.log(
      `\n📦 Existing Products (${productsResponse.data.data.length}):`
    );
    productsResponse.data.data.slice(0, 5).forEach((product) => {
      console.log(`   - ${product.name} (slug: ${product.slug})`);
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
      await new Promise((resolve) => setTimeout(resolve, 300));
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
