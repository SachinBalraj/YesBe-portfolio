import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Article, KnowledgeFAQ } from "@/knowledge/types";
import { generateFAQs } from "@/utils/generateFAQ";

interface FAQSectionProps {
  article?: Article;
  faq?: KnowledgeFAQ[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  article,
  faq,
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about this topic.",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const generatedFaqs = useMemo(() => {
    if (!article) return [];
    return generateFAQs(article.title, article.keywords);
  }, [article]);

  const items = faq ?? (article?.faq?.length ? article.faq : generatedFaqs);

  if (!items.length) return null;

  return (
    <section aria-label="Frequently asked questions" className="mt-16">
      <div className="mb-8 max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white shadow-lg shadow-[#1d4ed8]/10">
            <MessageCircleQuestion className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Frequently Asked Questions
            </p>
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={item.question}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-primary/30"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-foreground">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden px-6 pb-6"
                  >
                    <p className="text-sm leading-7 text-muted-foreground">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
