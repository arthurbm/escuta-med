import React from "react";
import { type TextSectionProps } from "../section-types";

export function TextSection({ text }: TextSectionProps) {
  return (
    <div className="mt-4 rounded-lg bg-secondary p-4">
      <p className="whitespace-pre-wrap text-foreground">{text}</p>
    </div>
  );
}
