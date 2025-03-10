"use client";

import React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { type TextSectionProps } from "@/config/section-types";

export function TextSection({ text }: TextSectionProps) {
  // Function to copy content to clipboard
  const copyToClipboard = () => {
    if (!text) return;

    void navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Conteúdo copiado para a área de transferência");
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
        toast.error("Erro ao copiar conteúdo");
      });
  };

  return (
    <div className="group relative mt-4 rounded-lg bg-secondary p-4 ring-0 transition-all duration-200 hover:shadow-sm hover:ring-1 hover:ring-primary">
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
        <p className="whitespace-pre-wrap text-foreground">{text}</p>
      </div>
    </div>
  );
}
