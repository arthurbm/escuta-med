import React from "react";
import {
  FileText,
  Stethoscope,
  Brain,
  Heart,
  Eye,
  Activity,
  AlertCircle,
  Clipboard,
  Thermometer,
  Pill,
  Droplet,
  Dna,
  BabyIcon,
  Shrub,
  Microscope,
  User,
  ClipboardList,
  Calendar,
  type LucideIcon,
} from "lucide-react";

// Update to match string-based icon names in configuration
export type IconName =
  | "file-text"
  | "stethoscope"
  | "brain"
  | "heart"
  | "eye"
  | "activity"
  | "alert-circle"
  | "clipboard"
  | "thermometer"
  | "pill"
  | "droplet"
  | "dna"
  | "baby"
  | "shrub"
  | "microscope"
  | "user"
  | "clipboard-list"
  | "calendar";

// Mapeamento dos nomes de ícones para os componentes do Lucide
const iconMap: Record<string, LucideIcon> = {
  "file-text": FileText,
  fileText: FileText,
  stethoscope: Stethoscope,
  brain: Brain,
  heart: Heart,
  eye: Eye,
  activity: Activity,
  "alert-circle": AlertCircle,
  alertCircle: AlertCircle,
  clipboard: Clipboard,
  "clipboard-list": ClipboardList,
  thermometer: Thermometer,
  pill: Pill,
  droplet: Droplet,
  dna: Dna,
  baby: BabyIcon,
  shrub: Shrub,
  microscope: Microscope,
  user: User,
  calendar: Calendar,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

// Componente Icon que renderiza o ícone apropriado
export function Icon({ name, className, size = 24 }: IconProps) {
  const IconComponent = iconMap[name] ?? FileText;

  return <IconComponent className={className} size={size} />;
}
