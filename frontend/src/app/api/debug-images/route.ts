import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[DEBUG_IMAGES] Starting debug...");
    console.log(
      "[DEBUG_IMAGES] STRAPI_URL:",
      process.env.NEXT_PUBLIC_STRAPI_URL
    );
    console.log(
      "[DEBUG_IMAGES] Has token:",
      !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
    );

    // Test connection to Strapi
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*&pagination[limit]=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("[DEBUG_IMAGES] Response status:", response.status);

    const data = await response.json();
    console.log("[DEBUG_IMAGES] Response data:", JSON.stringify(data, null, 2));

    if (data.data && data.data.length > 0) {
      const product = data.data[0];

      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        product: {
          id: product.id,
          name: product.name,
          rawImageData: product.image,
          attributes: product.attributes,
          fullProduct: product,
        },
        environment: {
          strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
          hasToken: !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
          tokenPreview:
            process.env.NEXT_PUBLIC_STRAPI_API_TOKEN?.substring(0, 20) + "...",
        },
        responseInfo: {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        },
      });
    }

    return NextResponse.json({
      success: false,
      message: "No products found",
      rawData: data,
      environment: {
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
        hasToken: !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[DEBUG_IMAGES] Error:", errorMessage, error);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
        environment: {
          strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
          hasToken: !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
        },
      },
      { status: 500 }
    );
  }
}
