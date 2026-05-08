import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import "./Card.css";
import { ArrowUpRight } from "lucide-react";

type BaseProps = {
  areaService?: string;
  title?: string;
  content?: string;
  inverted?: boolean;
};

type LinkCardProps = BaseProps & HTMLMotionProps<"a"> & { href: string };
type DivCardProps = BaseProps & HTMLMotionProps<"div"> & { href?: undefined };
export type CardProps = LinkCardProps | DivCardProps;

export const Card: React.FC<CardProps> = (props) => {
  if ("href" in props && props.href) {
    const { areaService, title, content, href, inverted, ...linkProps } = props;
    return (
      <motion.a
        href={href}
        {...linkProps}
        className={`card${inverted ? " card--inverted" : ""}`}
        initial="initial"
        whileHover="hover"
        animate="initial"
        style={{
          overflow: "hidden",
          position: "relative",
          display: "block",
          textDecoration: "none",
        }}
      >
        <motion.span
          className="wave"
          variants={{
            initial: { transform: "translateX(-50%) scale(0)" },
            hover: {
              transform: "translateX(-50%) scale(1)",
              transition: { duration: 0.5, ease: "easeInOut" },
            },
          }}
        />
        <motion.div
          className="content-wrapper"
          variants={{
            initial: { color: "var(--card-text)" },
            hover: {
              color: "var(--card-bg)",
              transition: { duration: 0.5, ease: "easeInOut" },
            },
          }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="card-body">
            <div className="card-header">
              <div className="card-area">
                <p>{areaService}</p>
              </div>
              <div className="card-divider" />
              <div className="card-title">
                <h3>{title}</h3>
              </div>
            </div>
            <div className="card-content">{content}</div>
          </div>
          <motion.div
            className="card-footer"
            variants={{
              initial: { rotate: 45 },
              hover: {
                rotate: 0,
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowUpRight
              size={30}
              className="card-button-icon"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </motion.a>
    );
  } else {
    const { areaService, title, content, inverted, ...divProps } = props as DivCardProps;
    return (
      <motion.div
        {...divProps}
        className={`card${inverted ? " card--inverted" : ""}`}
        initial="initial"
        whileHover="hover"
        animate="initial"
        style={{
          overflow: "hidden",
          position: "relative",
          display: "block",
        }}
      >
        <motion.span
          className="wave"
          variants={{
            initial: { transform: "translateX(-50%) scale(0)" },
            hover: {
              transform: "translateX(-50%) scale(1)",
              transition: { duration: 0.5, ease: "easeInOut" },
            },
          }}
        />
        <motion.div
          className="content-wrapper"
          variants={{
            initial: { color: "var(--card-text)" },
            hover: {
              color: "var(--card-bg)",
              transition: { duration: 0.5, ease: "easeInOut" },
            },
          }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="card-body">
            <div className="card-header">
              <div className="card-area">
                <p>{areaService}</p>
              </div>
              <div className="card-divider" />
              <div className="card-title">
                <h3>{title}</h3>
              </div>
            </div>
            <div className="card-content">{content}</div>
          </div>
          <motion.div
            className="card-footer"
            variants={{
              initial: { rotate: 45 },
              hover: {
                rotate: 0,
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowUpRight
              size={30}
              className="card-button-icon"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
};
