import React from "react";
import "./SimpleCard.css";

interface SimpleCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title?: string;
  href?: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
}

export const SimpleCard: React.FC<SimpleCardProps> = ({
  title,
  href,
  description,
  target,
  rel,
  ...restLinkProps
}) => {
  return (
    <div className="simple-card">
      <h3 className="simple-card-title">
        <a
          href={href}
          target={target}
          rel={rel}
          className="simple-card-link"
          {...restLinkProps}
        >
          {title}
        </a>
      </h3>
      <p className="simple-card-description">{description}</p>
    </div>
  );
};
