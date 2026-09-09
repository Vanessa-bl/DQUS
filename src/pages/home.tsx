import React from "react";
import NewHero from "../components/ui/NewHero/NewHero";
import SplitHero from "../components/ui/SplitHero/SplitHero";
import "./pageStyles.css";
import "./HomeSections.css";
import { Card } from "../components/ui/card/Card";
import { TechCarousel } from "../components/ui/TechCarousel/TechCarousel";
import { Layout } from "./layout";
import { useT } from "../i18n/useT";

export const Home: React.FC = () => {
  const t = useT();

  return (
    <Layout transparentHeader>
      <SplitHero />
      <NewHero />

      <section className="hs-services" aria-labelledby="services-title">
        <div className="hs-services__header">
          <span className="hs__eyebrow">
            {t("home.services.eyebrow", "What We Do")}
          </span>
          <h2 id="services-title" className="hs__headline">
            {t("home.services.headline.line1", "Ecommerce that ships.")}<br />
            <span className="hs__headline-mark">
              {t("home.services.headline.line2", "Ops that keep it moving.")}
            </span>
          </h2>
          <p className="hs__desc">
            {t(
              "home.services.desc",
              "We're a small, senior team that fixes the parts of your commerce stack that leak money: storefronts, checkouts, and the shipping ops behind them. Founders, startups, and internal teams call us when something's broken and the quarter isn't waiting."
            )}
          </p>
        </div>

        <div className="hs-services__grid">
          <Card
            href="/servicio/diseno"
            inverted
            areaService={t("home.services.card1.area", "STOREFRONT PERFORMANCE")}
            title={t("home.services.card1.title", "Fix What's Quietly Killing Conversion")}
            content={t(
              "home.services.card1.content",
              "Shopify, Woo, or headless. We audit your storefront in five days and ship the fixes that move the needle: Core Web Vitals, mobile UX, and the checkout friction you stopped noticing months ago."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.services.card2.area", "CHECKOUT & CRO")}
            title={t("home.services.card2.title", "Stop Losing Carts at the Last Click")}
            content={t(
              "home.services.card2.content",
              "We rebuild checkouts, wire in Apple Pay, Shop Pay, and one-click flows, and run funnel experiments on the pages that actually move revenue. Most engagements pay for themselves inside 60 days."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.services.card3.area", "SHIPPING & FULFILLMENT")}
            title={t("home.services.card3.title", "Connect the Ops Layer")}
            content={t(
              "home.services.card3.content",
              "WMS, 3PL, carriers, ERP. The plumbing between your store and the box that lands on the customer's porch. We integrate ShipStation, EasyPost, Shippo, and your ERP so orders, inventory, and returns stop living in spreadsheets."
            )}
          />
          <Card
            inverted
            areaService={t("home.services.card4.area", "ON-CALL ENGINEERING")}
            title={t("home.services.card4.title", "When Something Breaks at 2am")}
            content={t(
              "home.services.card4.content",
              "Retainer support for commerce teams without a full ops org. Incident response, hotfixes, migrations, and the boring reliability work that keeps Q4 from turning into a group chat."
            )}
          />
        </div>
      </section>

      <section className="hs-work" aria-labelledby="work-title">
        <div className="hs-services__header">
          <span className="hs__eyebrow">
            {t("home.work.eyebrow", "Recent Work")}
          </span>
          <h2 id="work-title" className="hs__headline">
            {t("home.work.headline.line1", "Small team,")}<br />
            <span className="hs__headline-mark">
              {t("home.work.headline.line2", "receipts on the record.")}
            </span>
          </h2>
          <p className="hs__desc">
            {t(
              "home.work.desc",
              "Three engagements from the last twelve months. Real brands, real numbers, anonymized where the contract asked us to."
            )}
          </p>
        </div>

        <div className="hs-work__grid">
          <Card
            href="#"
            inverted
            areaService={t("home.work.card1.area", "DTC APPAREL / SHOPIFY PLUS")}
            title={t("home.work.card1.title", "Cut Storefront Load Time in Half")}
            content={t(
              "home.work.card1.content",
              "Rebuilt a bloated Shopify Plus theme into a headless Hydrogen storefront. LCP down from 4.1s to 1.6s. Mobile conversion up 34% in the first eight weeks."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.work.card2.area", "3PL / LOGISTICS SAAS")}
            title={t("home.work.card2.title", "Shipped a Carrier-API Layer in 6 Weeks")}
            content={t(
              "home.work.card2.content",
              "Built the integration layer between a growing 3PL and eight regional carriers. 90k+ labels a week, zero manual re-runs, and the ops team stopped opening tickets at 6am."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.work.card3.area", "MARKETPLACE / RESCUE")}
            title={t("home.work.card3.title", "Kept Their Black Friday Alive")}
            content={t(
              "home.work.card3.content",
              "Called in on a Tuesday. By Friday we'd rewritten a broken checkout queue, patched a Stripe webhook race, and held the site through a 7× traffic spike without a single rollback."
            )}
          />
        </div>
      </section>

      <div className="hs-tech">
        <TechCarousel aria-label="Technologies we work with" />
      </div>
    </Layout>
  );
};
