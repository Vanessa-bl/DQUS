import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug, type Locale } from "@/lib/blog";

export const runtime = "nodejs";
export const alt = "DevQueens blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = [];
  for (const locale of ["en", "es"] as const) {
    for (const post of getAllPosts(locale)) {
      out.push({ locale, slug: post.slug });
    }
  }
  return out;
}

export default async function Image({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const safeLocale: Locale = params.locale === "es" ? "es" : "en";
  const post = getPostBySlug(params.slug, safeLocale);
  const title = post?.title ?? "DevQueens";
  const category = post?.category ?? "Blog";
  const author = post?.author.name ?? "DevQueens";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(233,51,112,0.35) 0%, transparent 55%), radial-gradient(circle at 85% 90%, rgba(255,145,75,0.25) 0%, transparent 55%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 56,
                height: 56,
                background: "#000",
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              DQ
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: -0.5,
              }}
            >
              DevQueens
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(233,51,112,0.18)",
              color: "#ff6b9a",
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            by {author}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#ff6b9a",
              fontWeight: 700,
            }}
          >
            devqueens.us/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
