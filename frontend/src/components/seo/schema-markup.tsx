interface Tool {
  name: string;
  description?: string;
  category?: string;
  price?: number;
  rating?: number;
}

interface Toolkit {
  userName: string;
  slug?: string;
  profession: string;
  professionSlug: string;
  workContext: string;
  lifeContext: string;
  description?: string;
  faq?: { question: string; answer: string }[];
}

interface SchemaMarkupProps {
  toolkit: Toolkit;
  tools: Tool[];
}

export function SchemaMarkup({ toolkit, tools }: SchemaMarkupProps) {
  const baseUrl = "https://maxmate.ai";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // CollectionPage - 工具集合
      {
        "@type": "CollectionPage",
        name: `${toolkit.userName}'s AI Stack: ${toolkit.workContext} & ${toolkit.lifeContext}`,
        description:
          toolkit.description ||
          `Personalized AI toolkit for ${toolkit.profession}s. Curated tools for work and life.`,
        url: `${baseUrl}/u/${toolkit.slug || toolkit.userName.toLowerCase()}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: tools.length,
          itemListElement: tools.map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "SoftwareApplication",
              name: tool.name,
              applicationCategory: tool.category || "BusinessApplication",
              description: tool.description,
              offers: {
                "@type": "Offer",
                price: tool.price || "0",
                priceCurrency: "USD",
              },
              aggregateRating: tool.rating
                ? {
                    "@type": "AggregateRating",
                    ratingValue: tool.rating,
                    ratingCount: 100,
                  }
                : undefined,
            },
          })),
        },
      },
      // FAQPage - 常见问题
      ...(toolkit.faq && toolkit.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: toolkit.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            },
          ]
        : []),
      // BreadcrumbList - 面包屑导航
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Personas",
            item: `${baseUrl}/personas`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: toolkit.profession,
            item: `${baseUrl}/personas/${toolkit.professionSlug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${toolkit.userName}'s Kit`,
          },
        ],
      },
      // Organization - 网站信息
      {
        "@type": "Organization",
        name: "MaxMate.ai",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description:
          "The AI Operating System for Your Work & Life. Generate personalized AI toolkits in seconds.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

