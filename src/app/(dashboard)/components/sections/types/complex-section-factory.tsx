import React from "react";
import { LifestyleSection } from "./lifestyle-section";
import { type ComplexSectionFactoryProps } from "@/config/section-types";

/**
 * Factory component that renders the appropriate complex section based on the section ID
 * This makes it easy to add new complex section types in the future
 */
export function ComplexSectionFactory({
  sectionId,
  data,
}: ComplexSectionFactoryProps) {
  // Map section IDs to their respective components
  switch (sectionId) {
    case "lifestyle":
      return <LifestyleSection data={data} />;
    // Add more complex section types here as needed
    default:
      return null;
  }
}
