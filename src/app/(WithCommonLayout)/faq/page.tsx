"use client";
import { useState } from "react";

const faqData = [
  {
    question: "How do I post a rental property as a landlord?",
    answer:
      "To post a rental property, register as a landlord, go to your dashboard, and click on 'Post Rental House Info'. Fill out the required fields and submit the listing.",
  },
  {
    question: "How do I request to rent a house?",
    answer:
      "Tenants can search and view listings. Once you find a suitable house, click on 'View Details' and then click the 'Request Rental' button to submit your move-in details.",
  },
  {
    question: "Do I need to pay to use Property-Pro?",
    answer:
      "Currently, Property Pro is free for both tenants and landlords. However, certain premium features may be introduced in the future.",
  },
  {
    question: "How do I contact a landlord?",
    answer:
      "Once a rental request is approved, the landlord's contact details (phone number) will be shared with the tenant through the platform.",
  },
  {
    question: "Can I edit or delete my house listing?",
    answer:
      "Yes, landlords can edit or delete their listings anytime from their dashboard under 'My Listings'.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="min-h-screen bg-gray-50 py-16 ">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-gray-800 font-medium">
                  {faq.question}
                </span>
                <span className="text-gray-500 text-2xl">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
