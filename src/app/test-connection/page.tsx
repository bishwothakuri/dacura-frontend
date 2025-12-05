// src/app/test-connection/page.tsx

"use client";

import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function TestConnection() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // FIX HERE: Change the fetch path to ONLY request the endpoint name.
    // The backend's router setup (app.include_router or API_PREFIX) handles /api/v1.
    fetch(`${baseUrl}/health`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Backend Connection Test</h1>
      <p>Backend URL: {process.env.NEXT_PUBLIC_API_BASE_URL}</p>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && (
        <pre
          style={{
            background: "#f0f0f0",
            padding: 20,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
