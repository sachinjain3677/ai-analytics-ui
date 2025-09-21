"use client";

import * as React from "react";
import { TextLoop } from "./text-loop";

export function BasicDemo() {
  return (
    <div className="flex justify-center text-xl md:text-2xl text-gray-300 font-medium">
      <TextLoop>
        {[
          "Ask questions, get insights instantly",
          "Upload your data, unlock hidden stories",
          "From CSV to insights in seconds",
          "Your data, now conversational",
          "Talk to your data with voice queries",
          "No SQL needed — just natural language",
          "AI-powered visualizations at your fingertips",
          "Transform data into decisions",
          "Dashboards are old — meet conversational BI",
          "Data analysis made effortless with AI"
        ].map((text) => (
          <span key={text} className="block text-left">
            {text}
          </span>
        ))}
      </TextLoop>
    </div>
  );
}
