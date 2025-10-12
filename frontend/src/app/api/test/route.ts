import { NextResponse } from "next/server";

export async function GET() {
  console.log("TEST API - Environment variables:");
  console.log("STRAPI_URL:", process.env.NEXT_PUBLIC_STRAPI_URL);
  console.log("TOKEN exists:", !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      status: response.status,
      data: data,
      env: {
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
        hasToken: !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      },
    });
  } catch (error) {
    // Fix: Properly handle the unknown error type
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json({
      success: false,
      error: errorMessage,
      env: {
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
        hasToken: !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      },
    });
  }
}
