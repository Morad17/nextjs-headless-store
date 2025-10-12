import { NextResponse } from 'next/server';
import { getStrapiImageUrl } from '@/utils/imageUtils';

export async function GET() {
  try {
    // Fetch a product to test
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*&pagination[limit]=1`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    console.log('[DEBUG_IMAGES] Raw Strapi response:', JSON.stringify(data, null, 2));

    if (data.data && data.data.length > 0) {
      const product = data.data[0];
      console.log('[DEBUG_IMAGES] First product:', JSON.stringify(product, null, 2));
      
      const imageUrl = getStrapiImageUrl(product.image);
      console.log('[DEBUG_IMAGES] Generated image URL:', imageUrl);

      return NextResponse.json({
        success: true,
        product: {
          id: product.id,
          name: product.name,
          rawImageData: product.image,
          generatedImageUrl: imageUrl,
        },
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
        hasToken: !!process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      });
    }

    return NextResponse.json({
      success: false,
      message: 'No products found',
      data: data,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[DEBUG_IMAGES] Error:', errorMessage);
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
    });
  }
}