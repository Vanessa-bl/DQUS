type Orientation = "left" | "right" | "top" | "bottom";

export interface AnimatedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orientation?: Orientation;
  size?: string;
  backdropOpacity?: number;
  children: React.ReactNode;
  className?: string;
}
