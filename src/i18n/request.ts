import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Phase 2a transition: next-intl is wired for URL routing, middleware
 * and the locale switcher only. Translations are still fetched via
 * react-intl's useT, which reads flat keys from LocaleProvider.
 *
 * We intentionally return empty messages here because the current
 * flat-key JSON has 25 parent/child collisions (for example
 * `footer.services` and `footer.services.all`) that next-intl's nested
 * namespace model rejects. The migration to useTranslations will
 * rename those keys and populate this with the real messages.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {},
  };
});
