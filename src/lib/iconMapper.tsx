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
  type LucideIcon,
} from "lucide-react";

// Definindo os tipos de ícones disponíveis
export type IconName =
  | "fileText"
  | "stethoscope"
  | "brain"
  | "heart"
  | "eye"
  | "activity"
  | "alertCircle"
  | "clipboard"
  | "thermometer"
  | "pill"
  | "droplet"
  | "dna"
  | "baby"
  | "shrub"
  | "microscope";

// Mapeamento dos nomes de ícones para os componentes do Lucide
const iconMap: Record<IconName, LucideIcon> = {
  fileText: FileText,
  stethoscope: Stethoscope,
  brain: Brain,
  heart: Heart,
  eye: Eye,
  activity: Activity,
  alertCircle: AlertCircle,
  clipboard: Clipboard,
  thermometer: Thermometer,
  pill: Pill,
  droplet: Droplet,
  dna: Dna,
  baby: BabyIcon,
  shrub: Shrub,
  microscope: Microscope,
};

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

// Componente Icon que renderiza o ícone apropriado
export function Icon({ name, className, size = 24 }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} size={size} />;
}
