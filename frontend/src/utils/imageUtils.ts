export function getStrapiImageUrl(imageData: any): string {
  // This will show in Vercel function logs
  console.log(
    "[IMAGE_UTILS] Processing image data:",
    JSON.stringify(imageData, null, 2)
  );

  if (!imageData) {
    console.log("[IMAGE_UTILS] No image data, returning placeholder");
    return "/assets/images/placeholder-product.jpg";
  }

  let imageUrl = "";

  if (typeof imageData === "string") {
    imageUrl = imageData;
    console.log("[IMAGE_UTILS] String URL:", imageUrl);
  } else if (imageData.url) {
    imageUrl = imageData.url;
    console.log("[IMAGE_UTILS] Direct URL:", imageUrl);
  } else if (imageData.data?.attributes?.url) {
    imageUrl = imageData.data.attributes.url;
    console.log("[IMAGE_UTILS] Strapi v4 format URL:", imageUrl);
  } else if (imageData.attributes?.url) {
    imageUrl = imageData.attributes.url;
    console.log("[IMAGE_UTILS] Attributes URL:", imageUrl);
  }

  if (!imageUrl) {
    console.log("[IMAGE_UTILS] No URL found, returning placeholder");
    return "/assets/images/placeholder-product.jpg";
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    console.log("[IMAGE_UTILS] Absolute URL:", imageUrl);
    return imageUrl;
  }

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://pc-builder-strapi-backend.onrender.com";
  const finalUrl = `${strapiUrl}${imageUrl}`;
  console.log("[IMAGE_UTILS] Final constructed URL:", finalUrl);

  return finalUrl;
}
