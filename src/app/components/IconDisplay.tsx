import { Info, FileText, CircleCheck } from "lucide-react";
import { IconTypes } from "./PageButton"; // Or move this type to a shared types file

interface IconDisplayProps {
  iconType: IconTypes | undefined;
  size?: number;
  selected?: boolean;
}

export const IconDisplay = ({
  iconType,
  size = 16,
  selected,
}: IconDisplayProps) => {
  const selectedColor = selected ? "#F59D0E" : "#8C93A1";

  switch (iconType) {
    case "info":
      return <Info color={selectedColor} size={size} />;

    case "circle-check":
      return <CircleCheck color={selectedColor} size={size} />;
    default:
      return <FileText color={selectedColor} size={size} />;
  }
};
