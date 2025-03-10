import React from "react";
import { type FieldsSectionProps } from "@/config/section-types";
import { formatValue } from "@/lib/value-formatter";
import { DynamicField } from "../../ui/dynamic-field";

export function FieldsSection({ fields, data }: FieldsSectionProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {fields.map((fieldConfig) => {
        const rawValue = data?.[fieldConfig.id];
        const formattedValue = formatValue(rawValue, fieldConfig.id);

        if (formattedValue === null) {
          return null;
        }

        return (
          <DynamicField
            key={fieldConfig.id}
            fieldConfig={fieldConfig}
            value={formattedValue}
          />
        );
      })}
    </div>
  );
}
