import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

interface FAQ {
  question: string;
  answer: string;
}

interface DetailFAQProps {
  items?: FAQ[];
  faqs?: FAQ[];
  heading?: string;
  title?: string;
  description?: string;
}

export function DetailFAQ({ items, faqs, heading = "Frequently Asked Questions", title, description }: DetailFAQProps) {
  const resolved = items ?? faqs ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="detail-faq-heading">
      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <h2
            id="detail-faq-heading"
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[#101828]"
          >
            {title ?? heading}
          </h2>
          {description ? <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#273244]">{description}</p> : null}
          <div className="mt-8 border-t border-[#E4E7EC] sm:mt-10">
            {resolved.map((item, index) => {
              const open = openIndex === index;
              const buttonId = `detail-faq-btn-${index}`;
              const panelId = `detail-faq-panel-${index}`;
              return (
                <div key={item.question} className="border-b border-[#E4E7EC]">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#155DFC] sm:py-6"
                    >
                      <span className="text-[15px] font-semibold leading-7 text-[#11124D] sm:text-[17px]">
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full border border-[#D0D5DD] text-[#11124D] transition-transform duration-300 motion-reduce:transition-none",
                          open && "rotate-180 border-[#155DFC]/30 bg-[#F5F8FF] text-[#155DFC]",
                        )}
                        aria-hidden="true"
                      >
                        <ChevronDown className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-6 pr-10 text-[14px] leading-7 text-[#273244] sm:text-[15px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
