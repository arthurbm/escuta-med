import React from "react";
import { Icon } from "@/lib/iconMapper";
import { type SectionHeaderProps } from "./section-types";
import { cn } from "@/lib/utils";

// Map of color strings to Tailwind classes
const bgColorMap: Record<string, string> = {
  "blue-100": "bg-blue-100",
  "red-100": "bg-red-100",
  "orange-100": "bg-orange-100",
  "emerald-100": "bg-emerald-100",
  "amber-100": "bg-amber-100",
  "indigo-100": "bg-indigo-100",
  "teal-100": "bg-teal-100",
  "green-100": "bg-green-100",
  "purple-100": "bg-purple-100",
  // Add more as needed
};

const textColorMap: Record<string, string> = {
  "blue-600": "text-blue-600",
  "red-600": "text-red-600",
  "orange-600": "text-orange-600",
  "emerald-600": "text-emerald-600",
  "amber-600": "text-amber-600",
  "indigo-600": "text-indigo-600",
  "teal-600": "text-teal-600",
  "green-600": "text-green-600",
  "purple-600": "text-purple-600",
  // Add more as needed
};

export function SectionHeader({ section }: SectionHeaderProps) {
  // Get the background and text color classes
  const bgColorClass = bgColorMap[section.colorLight] ?? "bg-gray-100";
  const textColorClass = textColorMap[section.color] ?? "text-gray-600";

  return (
    <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
      <div className={cn("rounded-lg p-2", bgColorClass)}>
        <Icon name={section.icon} className={cn("h-5 w-5", textColorClass)} />
      </div>
      {section.title}
    </h2>
  );
}
