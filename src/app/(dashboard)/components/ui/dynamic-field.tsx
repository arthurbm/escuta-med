"use client";

import React from "react";
import { type FieldConfig } from "@/config/specialtyConfig";
import { cn } from "@/lib/utils";

interface DynamicFieldProps {
  fieldConfig: FieldConfig;
  value: string | boolean | string[] | null | undefined;
  className?: string;
}

export function DynamicField({
  fieldConfig,
  value,
  className,
}: DynamicFieldProps) {
  const { label, type, colSpan } = fieldConfig;

  // Função para renderizar o conteúdo com base no tipo de campo
  const renderFieldContent = () => {
    switch (type) {
      case "text":
        return <div className="mt-1 text-foreground">{value ?? "-"}</div>;

      case "longText":
        return (
          <div className="mt-1 whitespace-pre-wrap text-foreground">
            {value ?? "-"}
          </div>
        );

      case "boolean":
        return (
          <div className="mt-1 text-foreground">{value ? "Sim" : "Não"}</div>
        );

      case "list":
        return (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
            {Array.isArray(value) && value.length > 0 ? (
              value.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))
            ) : (
              <li className="text-gray-500">Nenhum registro</li>
            )}
          </ul>
        );

      default:
        return <div className="mt-1 text-foreground">{value ?? "-"}</div>;
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg bg-secondary p-3",
        colSpan === 2 ? "col-span-2" : "",
        className,
      )}
    >
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      {renderFieldContent()}
    </div>
  );
}
