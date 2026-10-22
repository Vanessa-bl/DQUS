import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  type Locale,
} from "@/lib/blog";
import { BlogPost } from "@/src/screens/BlogPost";

type Params = { locale: string; slug: string };

const SITE_URL = "https://www.devqueens.us";

const copyByLocale: Record<string, {
  blogLabel: string;
  directAnswerLabel: string;
  publishedLabel: string;
  updatedLabel: string;
  readingTimeSuffix: string;
  relatedLabel: string;
  ctaDescription: string;
  ctaButton: string;
}> = {
  en: {
    blogLabel: "Blog",
    directAnswerLabel: "Direct answer",
    publishedLabel: "Published",
    updatedLabel: "Updated",
    readingTimeSuffix: "min read",
    relatedLabel: "Related reads",
    ctaDescription: "Want this applied to your business? Talk to us.",
    ctaButton: "See the service",
  },
  es: {
    blogLabel: "Blog",
    directAnswerLabel: "Respuesta directa",
    publishedLabel: "Publicado",
    updatedLabel: "Actualizado",
    readingTimeSuffix: "min de lectura",
    relatedLabel: "Lecturas relacionadas",
    ctaDescription: "¿Querés esto aplicado a tu negocio? Hablá con nosotros.",
    ctaButton: "Ver el servicio",
  },
};

export async function generateStaticParams(): Promise<Params[]> {
  const out: Params[] = [];
  for (const locale of ["en", "es"] as const) {
    for (const post of getAllPosts(locale)) {
      out.push({ locale, slug: post.slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const post = getPostBySlug(slug, safeLocale);
  if (!post) return {};

  const path =
    safeLocale === "en" ? `/blog/${slug}` : `/${safeLocale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: path,
      languages: {
        en: `/blog/${slug}`,
        es: `/es/blog/${slug}`,
        "x-default": `/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const post = getPostBySlug(slug, safeLocale);
  if (!post) notFound();
  const related = getRelatedPosts(slug, safeLocale, 2);
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;

  const url =
    safeLocale === "en"
      ? `${SITE_URL}/blog/${slug}`
      : `${SITE_URL}/${safeLocale}/blog/${slug}`;
  const ogImageUrl = `${url}/opengraph-image`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
        description: post.author.bio,
        jobTitle: post.author.role,
      },
      publisher: {
        "@type": "Organization",
        name: "DevQueens",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.svg`,
        },
      },
      image: ogImageUrl,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: post.category,
      keywords: post.tags.join(", "),
      inLanguage: safeLocale,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: safeLocale === "es" ? "Inicio" : "Home",
          item: safeLocale === "en" ? SITE_URL : `${SITE_URL}/${safeLocale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item:
            safeLocale === "en"
              ? `${SITE_URL}/blog`
              : `${SITE_URL}/${safeLocale}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: url,
        },
      ],
    },
  ];

  if (post.faq && post.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  return (
    <>
      {jsonLd.map((obj, i) => (
        <Script
          key={i}
          id={`blog-jsonld-${i}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <BlogPost locale={safeLocale} post={post} related={related} copy={copy} />
    </>
  );
}
