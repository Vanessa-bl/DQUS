import type { Locale } from "./index";

export const getLocaleFromPath = (pathname: string): Locale => {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
};

export const toLocalePath = (pathname: string, locale: Locale): string => {
  const stripped = pathname.startsWith("/es/")
    ? pathname.slice(3)
    : pathname === "/es"
      ? "/"
      : pathname;

  if (locale === "es") {
    return stripped === "/" ? "/es" : `/es${stripped}`;
  }

  return stripped;
};
