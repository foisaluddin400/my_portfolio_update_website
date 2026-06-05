// @/components/HomePage/VisitorTracker.jsx
"use client";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

const BASE_URL = "http://192.168.0.100:5000/api/v1";

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // LocalStorage থেকে deviceId নাও, না থাকলে নতুন বানাও
        let deviceId = localStorage.getItem("deviceId");
        if (!deviceId) {
          deviceId = uuidv4();
          localStorage.setItem("deviceId", deviceId);
        }

        // Token আগে থেকে থাকলে আর API call করবো না
        const existingToken = localStorage.getItem("visitorToken");
        if (existingToken) return;

        const res = await fetch(`${BASE_URL}/visitors/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceId }),
        });

        const data = await res.json();

        if (data?.success && data?.data?.token) {
          localStorage.setItem("visitorToken", data.data.token);
        }
      } catch (error) {
        console.error("Visitor tracking failed:", error);
      }
    };

    trackVisitor();
  }, []);

  return null; // UI কিছু render করে না
}