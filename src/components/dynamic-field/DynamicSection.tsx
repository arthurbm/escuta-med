"use client";

import React from "react";
import { type SectionConfig } from "@/config/specialtyConfig";
import { DynamicField } from "./DynamicField";
import { Icon, type IconName } from "@/lib/iconMapper";

interface DynamicSectionProps {
  sectionConfig: SectionConfig;
  data: Record<string, unknown>;
}

export function DynamicSection({ sectionConfig, data }: DynamicSectionProps) {
  const { title, icon, color, colorLight, fields, id } = sectionConfig;

  // Verificar se o objeto tem dados para esta seção
  const sectionData = data[id] as Record<string, unknown> | undefined;
  if (!sectionData) return null;

  return (
    <section>
      <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
        <div className={`rounded-lg bg-${colorLight} p-2`}>
          <Icon name={icon as IconName} className={`h-5 w-5 text-${color}`} />
        </div>
        {title}
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {fields.map((fieldConfig) => {
          const value = sectionData[fieldConfig.id];

          // Se o campo tiver uma condição, verificar se deve ser exibido
          if (fieldConfig.condition) {
            const [conditionField, conditionValue] =
              fieldConfig.condition.split(":");
            // Garantir que conditionField não é undefined
            if (conditionField) {
              const fieldValue = sectionData[conditionField];
              let shouldRender = false;

              // Handle empty values
              if (fieldValue === null || fieldValue === undefined) {
                shouldRender = conditionValue === "";
              }
              // Handle primitive values
              else if (
                typeof fieldValue === "string" ||
                typeof fieldValue === "number" ||
                typeof fieldValue === "boolean"
              ) {
                shouldRender = String(fieldValue) === conditionValue;
              }
              // We don't try to compare objects with string conditions

              if (!shouldRender) {
                return null;
              }
            }
          }

          // Se o valor for undefined/null e o campo não for obrigatório, não exibir
          if (
            (value === undefined || value === null) &&
            !fieldConfig.required
          ) {
            return null;
          }

          return (
            <DynamicField
              key={fieldConfig.id}
              fieldConfig={fieldConfig}
              value={value as string | boolean | string[] | null | undefined}
            />
          );
        })}
      </div>
    </section>
  );
}
