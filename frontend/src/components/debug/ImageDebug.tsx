"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageDebug() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Test the debug API
    fetch("/api/debug-images")
      .then((res) => res.json())
      .then((data) => {
        console.log("Debug API response:", data);
        setDebugData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Debug API error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading debug info...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>Image Debug Information</h2>

      <div
        style={{ background: "#f5f5f5", padding: "15px", marginBottom: "20px" }}
      >
        <h3>Environment</h3>
        <p>
          <strong>Strapi URL:</strong> {debugData?.strapiUrl}
        </p>
        <p>
          <strong>Has Token:</strong> {debugData?.hasToken ? "Yes" : "No"}
        </p>
      </div>

      {debugData?.success ? (
        <div>
          <div
            style={{
              background: "#e8f5e8",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>Product Data</h3>
            <p>
              <strong>ID:</strong> {debugData.product.id}
            </p>
            <p>
              <strong>Name:</strong> {debugData.product.name}
            </p>
            <p>
              <strong>Generated Image URL:</strong>{" "}
              {debugData.product.generatedImageUrl}
            </p>
          </div>

          <div
            style={{
              background: "#f0f8ff",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>Raw Image Data from Strapi</h3>
            <pre
              style={{ overflow: "auto", background: "white", padding: "10px" }}
            >
              {JSON.stringify(debugData.product.rawImageData, null, 2)}
            </pre>
          </div>

          <div style={{ background: "#fff8f0", padding: "15px" }}>
            <h3>Image Test</h3>
            <p>Trying to load: {debugData.product.generatedImageUrl}</p>
            <Image
              src={debugData.product.generatedImageUrl}
              alt={debugData.product.name}
              width={200}
              height={150}
              onError={(e) => {
                console.error("Image failed to load:", e);
                alert("Image failed to load! Check console for details.");
              }}
              onLoad={() => {
                console.log("Image loaded successfully!");
              }}
            />
          </div>
        </div>
      ) : (
        <div style={{ background: "#ffe8e8", padding: "15px" }}>
          <h3>Error</h3>
          <p>{debugData?.error || "Unknown error"}</p>
          <pre>{JSON.stringify(debugData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
