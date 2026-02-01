import React from "react";

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionTag: React.FC<SectionTagProps> = ({
  children,
  className = "",
}) => {
  return <span className={`section-tag ${className}`.trim()}>{children}</span>;
};
