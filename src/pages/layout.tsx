import React, { type ReactNode } from "react";
import { Header } from "../components/ui/Header/Header";
import { useDrawer } from "../hooks/useDrawer";
import { AnimatedDrawer } from "../components/ui/AnimatedDrawer/AnimatedDrawer";
import { AnimatedLink } from "../components/ui/Link/AnimatedLink/AnimatedLink";
import Footer from "../components/ui/Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <>
      <header>
        <Header onMenuClick={openDrawer} shrinkPointPx={200} />
        <AnimatedDrawer
          isOpen={isOpen}
          onClose={closeDrawer}
          orientation="top"
          size="40%"
          backdropOpacity={0.5}
        >
          <nav aria-label="Main menu">
            <h2 className="visually-hidden">DevQueens</h2>
            <ul className="header-drawer__list">
              <li>
                <AnimatedLink to="/" size="1.4rem" aria-label="Ir a Home">
                  Home
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink
                  to="/services"
                  size="1.4rem"
                  aria-label="Ir a Services"
                >
                  Services
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink to="/about" size="1.4rem" aria-label="Ir a About">
                  About
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink
                  to="/contact"
                  size="1.4rem"
                  aria-label="Ir a Contact"
                >
                  Contact
                </AnimatedLink>
              </li>
            </ul>
          </nav>
        </AnimatedDrawer>
      </header>

      <main>{children}</main>

      <Footer />
    </>
  );
};
