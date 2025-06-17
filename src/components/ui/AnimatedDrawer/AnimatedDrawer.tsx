import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusLock from "react-focus-lock";
import { X } from "lucide-react";
type Orientation = "left" | "right" | "top" | "bottom";

interface AccessibleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orientation?: Orientation;
  size?: string;
  backdropOpacity?: number;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedDrawer: React.FC<AccessibleDrawerProps> = ({
  isOpen,
  onClose,
  orientation = "right",
  size = "300px",
  backdropOpacity = 0.5,
  children,
  className = "",
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        drawerRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && openerRef.current) {
      openerRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const drawerVariants = {
    hidden: (() => {
      switch (orientation) {
        case "left":
          return { x: "-100%" };
        case "right":
          return { x: "100%" };
        case "top":
          return { y: "-100%" };
        case "bottom":
          return { y: "100%" };
        default:
          return { x: "100%" };
      }
    })(),
    visible: { x: 0, y: 0 },
  };

  const drawerStyle: React.CSSProperties = (() => {
    if (orientation === "left" || orientation === "right") {
      return { width: size, height: "100%", top: 0, [orientation]: 0 };
    } else {
      return { height: size, width: "100%", left: 0, [orientation]: 0 };
    }
  })();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: backdropOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
              zIndex: 1000,
            }}
            aria-hidden="true"
          />

          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            ref={drawerRef}
            tabIndex={-1}
            style={{
              position: "fixed",
              zIndex: 1001,
              backgroundColor: "var(--drawer-bg)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              overflowY:
                orientation === "left" || orientation === "right"
                  ? "auto"
                  : "visible",
              overflowX:
                orientation === "top" || orientation === "bottom"
                  ? "auto"
                  : "visible",
              ...drawerStyle,
            }}
            className={className}
          >
            <h2
              id="drawer-title"
              style={{ position: "absolute", left: "-9999px" }}
            >
              Menú lateral
            </h2>

            <FocusLock returnFocus>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="button-header"
                  aria-label="Cerrar menú"
                  onClick={onClose}
                  style={{ position: "absolute", top: 10, right: 10 }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ padding: "1rem", marginTop: "2rem" }}>
                {children}
              </div>
            </FocusLock>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
