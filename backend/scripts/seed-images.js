// backend/scripts/update-product-images.js
require("dotenv").config();
const axios = require("axios");

const STRAPI_URL = "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_LOCAL_TOKEN;

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Simple mapping of product slug to imageUrl
const productImages = {
  "noctua-nh-d15-air-cooler":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397298/noctua-fan_yn4jxo.png",
  "be-quiet-dark-rock-pro-4":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_1_v1s5ev.png",
  "cooler-master-hyper-212-rgb":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_1_v1s5ev.png",
  "scythe-fuma-2-rev-b":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_1_v1s5ev.png",
  "nzxt-kraken-x63-280mm-rgb-aio":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/pngegg_11_cwssfd.png",
  "corsair-icue-h150i-elite-capellix":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/corsair-aio_sb5efg.png",
  "corsair-h100i-rgb-platinum-aio":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/corsair-aio_sb5efg.png",
  "arctic-liquid-freezer-ii-280mm":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/pngegg_10_cxbjtw.png",
  "nzxt-h5-flow-mid-tower-case":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397297/nzxt-tower_xn5yvf.png",
  "seagate-barracuda-2tb-7200rpm-hdd":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112525/pngegg_13_o6zfou.png",
  "western-digital-blue-1tb-5400rpm-hdd":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112525/pngegg_13_o6zfou.png",
  "fractal-design-define-7-full-tower":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397297/fractal-tower_xkhrrx.png",
  "cooler-master-masterbox-q300l-mini-itx":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/mini-itx-board_rozrun.png",
  "lian-li-pc-o11-dynamic-evo":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112525/lian-li-dynamic-evo-rgb-white-removebg-preview_dctt7x.png",
  "thermaltake-core-p3":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112532/thermal-removebg-preview_v7stbh.png",
  "phanteks-enthoo-pro-2":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112532/Screenshot_2025-11-02_191715-removebg-preview_yvkxsn.png",
  "corsair-4000d-airflow":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112532/cors-removebg-preview_spwjh5.png",
  "be-quiet-pure-base-500dx":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112533/bequiet-removebg-preview_pfvgct.png",
  "amd-ryzen-9-7900x":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112735/ryzen-removebg-preview_jt4xrs.png",
  "intel-core-i7-13700k":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397297/i7_lq9ok9.png",
  "amd-ryzen-5-7600x":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ryzen5_o0wekv.png",
  "amd-ryzen-7-7700x":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/pngegg_9_epfo9k.png",
  "intel-core-i5-13600k":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112533/pngegg_6_yeyqna.png",
  "amd-ryzen-9-7950x":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112735/ryzen-removebg-preview_jt4xrs.png",
  "intel-core-i9-13900k":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/pngegg_8_hxijfu.png",
  "amd-ryzen-5-7500f":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ryzen5_o0wekv.png",
  "intel-core-i3-13100f":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/pngegg_7_cz3lmn.png",
  "nvidia-rtx-4070-ti":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/4070_sshcec.png",
  "amd-radeon-rx-7800-xt":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/7800XT_vptqm6.png",
  "nvidia-rtx-4060-ti":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761924285/pngegg_cspvfq.png",
  "amd-radeon-rx-7600-xt":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/raedongpu_fyniix.png",
  "nvidia-rtx-4090":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112524/nvidia-geforce-rtx-4090-fe-featured-removebg-preview_umveem.png",
  "amd-radeon-rx-7900-xtx":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/raedongpu_fyniix.png",
  "nvidia-rtx-4070":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/rtx-removebg-preview_d1kfhd.png",
  "intel-arc-a770":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1762112523/arc-pro-a60-graphics-elevated.png.rendition.intel.web.1648.927_kyrzfw.png",
  "asus-rog-strix-b650e-e-gaming-wifi":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/asus-rog0-mb_newqsv.png",
  "msi-mpg-z790-carbon-wifi":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/msi-board_hgm3og.png",
  "corsair-vengeance-ddr5-5600-32gb":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
  "gskill-trident-z5-ddr5-6000-16gb":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/ram-sticks-2_wsaflx.png",
  "samsung-980-pro-2tb-nvme":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/samsung-ssd_ixflnz.png",
  "wd-black-sn850x-1tb-nvme":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397299/wd-memory_l4eked.png",
  "corsair-rm850x-850w-modular-psu":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397301/corsair-psu_qkutap.png",
  "evga-supernova-750w-platinum":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397300/evga-psu_clwpel.png",
  "logitech-g-pro-x-mechanical-keyboard":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397298/logiKeyboard_ukomtc.png",
  "linux-os":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397297/linux_bbff2p.png",
  "windows-os":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761398344/win11_qjwrye.png",
  "steelseries-rival-600-gaming-mouse":
    "https://res.cloudinary.com/dssghzcbp/image/upload/v1761397298/mouse-steel_mfv2v4.png",
};

async function updateProductImages() {
  console.log("🖼️  UPDATING PRODUCT IMAGES");
  console.log(`📡 Target: ${STRAPI_URL}`);
  console.log("═".repeat(60));

  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  try {
    // Get all products
    console.log("🔍 Fetching all products...");
    const response = await api.get("/products?pagination[limit]=200");
    const products = response.data.data;

    console.log(`📦 Found ${products.length} products`);

    for (const product of products) {
      try {
        const imageUrl = productImages[product.slug];

        if (imageUrl) {
          console.log(`\n🔄 Updating: ${product.name}`);
          console.log(`   Slug: ${product.slug}`);
          console.log(`   New Image: ${imageUrl.substring(0, 50)}...`);

          // Simple update - just the imageUrl
          await api.put(`/products/${product.id}`, {
            data: {
              imageUrl: imageUrl,
            },
          });

          console.log(`   ✅ Updated successfully!`);
          updatedCount++;
        } else {
          console.log(
            `⚠️  No image found for: ${product.name} (${product.slug})`
          );
          skippedCount++;
        }

        // Rate limiting
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`❌ Failed to update ${product.name}: ${error.message}`);
        errorCount++;
      }
    }

    console.log("\n🎉 UPDATE COMPLETED!");
    console.log("═".repeat(60));
    console.log(`📊 SUMMARY:`);
    console.log(`   ✅ Updated: ${updatedCount} products`);
    console.log(`   ⚠️  Skipped: ${skippedCount} products (no image mapping)`);
    console.log(`   ❌ Errors: ${errorCount} products`);
  } catch (error) {
    console.error("\n❌ Script failed:", error.message);
  }
}

// Run the script
if (require.main === module) {
  updateProductImages();
}

module.exports = updateProductImages;
