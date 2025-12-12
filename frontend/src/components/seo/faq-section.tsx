"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  profession?: string;
}

export function FAQSection({ faqs, profession = "professionals" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Default FAQs if none provided
  const defaultFaqs: FAQ[] = [
    {
      question: "Is MaxMate free to use?",
      answer:
        "Yes, generating your personalized AI toolkit is completely free. Individual tools in your kit may have their own pricing models (free, freemium, or paid).",
    },
    {
      question: `Why are these specific tools recommended for ${profession}?`,
      answer: `Our MaxMate SmartMatch™ technology analyzes your professional role and personal interests to curate tools that specifically address the pain points and workflows common to ${profession}. Each tool is selected based on relevance, user ratings, and integration capabilities.`,
    },
    {
      question: "Can I customize my toolkit?",
      answer:
        "Absolutely! After generating your initial toolkit, you can swap tools, add new ones from our catalog, or remove tools that don't fit your needs. Your personalized kit can evolve as your requirements change.",
    },
    {
      question: "How often is the toolkit updated?",
      answer:
        "We continuously update our tool database with new AI solutions. Your kit recommendations are refreshed based on the latest tool releases, user feedback, and industry trends.",
    },
  ];

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section
      id="faq"
      className="mt-12"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {displayFaqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <h3
                itemProp="name"
                className="text-base font-semibold text-slate-900 dark:text-white pr-4"
              >
                {faq.question}
              </h3>
              <span
                className={`material-symbols-outlined text-gray-500 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <p
                itemProp="text"
                className="p-4 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed"
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

