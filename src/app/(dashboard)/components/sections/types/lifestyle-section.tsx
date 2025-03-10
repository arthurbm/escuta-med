import React from "react";
import { type FieldConfig } from "@/config/specialtyConfig";

import {
  type LifestyleSectionProps,
  type LifestyleData,
} from "@/config/section-types";
import {
  formatLifestyleValue,
  getLifestyleLabel,
} from "@/lib/lifestyle-formatter";
import { DynamicField } from "../../ui/dynamic-field";

export function LifestyleSection({ data }: LifestyleSectionProps) {
  const lifestyle = data as LifestyleData;

  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {["smoking", "alcohol", "drugs"].map((key) => {
        const value = formatLifestyleValue(key, lifestyle);
        if (!value) return null;

        const fieldConfig: FieldConfig = {
          id: key,
          label: getLifestyleLabel(key),
          type: "text",
          required: false,
          colSpan: 2,
        };

        return (
          <DynamicField key={key} fieldConfig={fieldConfig} value={value} />
        );
      })}
    </div>
  );
}
