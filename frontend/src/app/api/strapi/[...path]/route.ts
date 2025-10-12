import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const searchParams = request.nextUrl.searchParams;

  const strapiUrl = `${
    process.env.NEXT_PUBLIC_STRAPI_URL
  }/api/${path}?${searchParams.toString()}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (process.env.NEXT_PUBLIC_STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(strapiUrl, { headers });
    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from Strapi" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  // Similar implementation for POST requests
  const path = params.path.join("/");
  const body = await request.json();

  const strapiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (process.env.NEXT_PUBLIC_STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(strapiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to post to Strapi" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
