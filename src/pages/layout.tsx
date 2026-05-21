import React, { type ReactNode } from "react";
import { Header } from "../components/ui/Header/Header";
import { useDrawer } from "../hooks/useDrawer";
import { AnimatedDrawer } from "../components/ui/AnimatedDrawer/AnimatedDrawer";
import { AnimatedLink } from "../components/ui/Link/AnimatedLink/AnimatedLink";
import Footer from "../components/ui/Footer/Footer";
import { useT } from "../i18n/useT";

interface LayoutProps {
  children: ReactNode;
  anchorNav?: { id: string; label: string }[];
  landingFooterLinks?: { id: string; label: string }[];
}

export const Layout: React.FC<LayoutProps> = ({ children, anchorNav, landingFooterLinks }) => {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const t = useT();

  return (
    <>
      <header>
        <Header onMenuClick={openDrawer} shrinkPointPx={200} anchorNav={anchorNav} />
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
                <AnimatedLink to="/" size="1.4rem" aria-label={t("header.nav.home", "Go to Home")}>
                  {t("header.home", "Home")}
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink
                  to="/services"
                  size="1.4rem"
                  aria-label={t("header.nav.services", "Go to Services")}
                >
                  {t("header.services", "Services")}
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink to="/about" size="1.4rem" aria-label={t("header.nav.about", "Go to About")}>
                  {t("header.about", "About")}
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink
                  to="/contact"
                  size="1.4rem"
                  aria-label={t("header.nav.contact", "Go to Contact")}
                >
                  {t("header.contact", "Contact")}
                </AnimatedLink>
              </li>
            </ul>
          </nav>
        </AnimatedDrawer>
      </header>

      <main>{children}</main>

      <Footer showLocaleSwitcher={!!landingFooterLinks} landingLinks={landingFooterLinks} />
    </>
  );
};
