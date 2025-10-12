export function getStrapiImageUrl(imageData: any): string {
  // Client-side debugging
  if (typeof window !== "undefined") {
    console.log("[IMAGE_UTILS] Processing image data:", imageData);

    const debugLog = JSON.parse(localStorage.getItem("imageDebug") || "[]");
    debugLog.push({
      timestamp: new Date().toISOString(),
      imageData: imageData,
      location: "getStrapiImageUrl",
    });
    localStorage.setItem("imageDebug", JSON.stringify(debugLog.slice(-20))); // Keep last 20 entries
  }

  if (!imageData) {
    console.log("[IMAGE_UTILS] No image data, returning placeholder");
    return "/assets/images/placeholder-product.jpg";
  }

  let imageUrl = "";

  // Handle different possible structures
  if (typeof imageData === "string") {
    imageUrl = imageData;
    console.log("[IMAGE_UTILS] String URL:", imageUrl);
  } else if (imageData.data?.attributes?.url) {
    // Strapi v4 format
    imageUrl = imageData.data.attributes.url;
    console.log("[IMAGE_UTILS] Strapi v4 format URL:", imageUrl);
  } else if (imageData.attributes?.url) {
    // Direct attributes
    imageUrl = imageData.attributes.url;
    console.log("[IMAGE_UTILS] Attributes URL:", imageUrl);
  } else if (imageData.url) {
    // Direct URL
    imageUrl = imageData.url;
    console.log("[IMAGE_UTILS] Direct URL:", imageUrl);
  } else {
    console.log("[IMAGE_UTILS] Unknown image data structure:", imageData);
  }

  if (!imageUrl) {
    console.log("[IMAGE_UTILS] No URL found, returning placeholder");
    return "/assets/images/placeholder-product.jpg";
  }

  // If URL is already absolute, return as is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    console.log("[IMAGE_UTILS] Absolute URL:", imageUrl);
    return imageUrl;
  }

  // If URL is relative, prepend Strapi URL
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://pc-builder-strapi-backend.onrender.com";
  const finalUrl = `${strapiUrl}${imageUrl}`;
  console.log("[IMAGE_UTILS] Final constructed URL:", finalUrl);

  return finalUrl;
}

export function getOptimizedImageUrl(
  imageData: any,
  size: "thumbnail" | "small" | "medium" | "large" = "medium"
): string {
  const baseUrl = getStrapiImageUrl(imageData);

  // If it's a placeholder, return as is
  if (baseUrl.includes("placeholder")) {
    return baseUrl;
  }

  // For Strapi images, you can add size parameters if your Strapi supports it
  return baseUrl;
}
