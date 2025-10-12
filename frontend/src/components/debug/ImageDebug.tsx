"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageDebug() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Test both the debug API and direct product fetch
    Promise.all([
      fetch("/api/debug-images")
        .then((res) => res.json())
        .catch((err) => ({ error: err.message })),
      fetch("/api/strapi/products?populate=*&pagination[limit]=3")
        .then((res) => res.json())
        .catch((err) => ({ error: err.message })),
    ]).then(([debugResponse, productsResponse]) => {
      console.log("Debug API response:", debugResponse);
      console.log("Products API response:", productsResponse);

      setDebugData(debugResponse);
      setProducts(productsResponse.data || []);
      setLoading(false);
    });
  }, []);

  if (loading)
    return <div style={{ padding: "20px" }}>Loading debug info...</div>;

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "monospace",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1>Image Debug Information</h1>

      {/* Environment Info */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      >
        <h2>Environment</h2>
        <p>
          <strong>NODE_ENV:</strong> {process.env.NODE_ENV}
        </p>
        <p>
          <strong>NEXT_PUBLIC_STRAPI_URL:</strong>{" "}
          {process.env.NEXT_PUBLIC_STRAPI_URL}
        </p>
      </div>

      {/* Debug API Results */}
      <div
        style={{
          background: debugData?.success ? "#e8f5e8" : "#ffe8e8",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      >
        <h2>Debug API Results</h2>
        <pre
          style={{
            overflow: "auto",
            background: "white",
            padding: "10px",
            borderRadius: "3px",
          }}
        >
          {JSON.stringify(debugData, null, 2)}
        </pre>
      </div>

      {/* Products from Direct API */}
      <div
        style={{
          background: "#f0f8ff",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      >
        <h2>Products from Direct API</h2>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product.id || index}
              style={{
                background: "white",
                padding: "15px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <h3>{product.name}</h3>
              <p>
                <strong>ID:</strong> {product.id}
              </p>
              <p>
                <strong>Raw Image Data:</strong>
              </p>
              <pre
                style={{
                  background: "#f9f9f9",
                  padding: "10px",
                  borderRadius: "3px",
                  fontSize: "12px",
                }}
              >
                {JSON.stringify(product.image, null, 2)}
              </pre>

              {/* Try to display the image */}
              {product.image && (
                <div style={{ marginTop: "10px" }}>
                  <p>
                    <strong>Attempting to load image:</strong>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Try different URL constructions */}
                    {[
                      product.image?.data?.attributes?.url,
                      product.image?.url,
                      product.image,
                      `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.image?.data?.attributes?.url}`,
                      `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.image?.url}`,
                    ]
                      .filter(Boolean)
                      .map((url, urlIndex) => (
                        <div key={urlIndex} style={{ textAlign: "center" }}>
                          <p
                            style={{
                              fontSize: "12px",
                              marginBottom: "5px",
                            }}
                          >
                            URL {urlIndex + 1}: {String(url)}
                          </p>
                          <Image
                            src={String(url)}
                            alt={`${product.name} - attempt ${urlIndex + 1}`}
                            width={150}
                            height={120}
                            style={{ border: "2px solid #ddd" }}
                            onError={(e) => {
                              console.error(
                                `Image ${urlIndex + 1} failed:`,
                                url
                              );
                              (e.target as HTMLImageElement).style.border =
                                "2px solid red";
                            }}
                            onLoad={() => {
                              console.log(`Image ${urlIndex + 1} loaded:`, url);
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* LocalStorage Debug */}
      <div
        style={{
          background: "#fff8f0",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <h2>LocalStorage Debug</h2>
        <button
          onClick={() => {
            const debugLog = localStorage.getItem("imageDebug");
            alert(debugLog ? debugLog : "No debug data in localStorage");
          }}
          style={{ padding: "10px", marginRight: "10px" }}
        >
          Check LocalStorage
        </button>
        <button
          onClick={() => {
            localStorage.setItem(
              "imageDebug",
              JSON.stringify([
                { test: "data", timestamp: new Date().toISOString() },
              ])
            );
            alert("Test data added to localStorage");
          }}
          style={{ padding: "10px", marginRight: "10px" }}
        >
          Add Test Data
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("imageDebug");
            alert("LocalStorage cleared");
          }}
          style={{ padding: "10px" }}
        >
          Clear LocalStorage
        </button>
      </div>
    </div>
  );
}
