"use client";

import React from "react";
import { type FieldConfig } from "@/config/specialtyConfig";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "sonner";

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

  // Function to copy content to clipboard
  const copyToClipboard = () => {
    let textToCopy = "";

    if (Array.isArray(value)) {
      textToCopy = value.join("\n");
    } else if (typeof value === "boolean") {
      textToCopy = value ? "Sim" : "Não";
    } else if (typeof value === "string") {
      textToCopy = value;
    } else if (typeof value === "number") {
      textToCopy = String(value);
    } else if (value) {
      textToCopy = "[Dados complexos]";
    } else {
      textToCopy = "-";
    }

    void navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Conteúdo copiado para a área de transferência");
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
        toast.error("Erro ao copiar conteúdo");
      });
  };

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
        "group relative rounded-lg bg-secondary p-3 ring-0 transition-all duration-200 hover:shadow-sm hover:ring-1 hover:ring-primary",
        colSpan === 2 ? "col-span-2" : "",
        className,
      )}
    >
      {/* Copy button positioned absolutely in the top right corner */}
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 z-10 rounded-md bg-secondary p-1.5 opacity-0 transition-all duration-200 hover:scale-110 hover:bg-muted hover:shadow-sm group-hover:opacity-100"
        title="Copiar conteúdo"
        aria-label="Copiar conteúdo"
      >
        <Copy className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="pr-7">
        {" "}
        {/* Add right padding to prevent content from overlapping with the button */}
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        {renderFieldContent()}
      </div>
    </div>
  );
}
