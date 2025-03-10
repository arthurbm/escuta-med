import React from "react";
import { DynamicField } from "@/components/dashboard/dynamic-field";
import { type FieldsSectionProps } from "../section-types";
import { formatValue } from "@/lib/value-formatter";

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
