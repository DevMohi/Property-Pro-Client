"use client";

import React from "react";

const sections = [
  {
    title: "Introduction",
    content:
      "This Privacy Policy explains how BasaFinder collects, uses, and protects your personal information when you use our platform. By accessing BasaFinder, you agree to the practices described in this policy.",
  },
  {
    title: "Information We Collect",
    list: [
      "Personal information such as name, email, and phone number",
      "Property listings and rental preferences",
      "Usage data such as search history and interactions",
      "Payment-related details (securely handled via third-party services)",
    ],
  },
  {
    title: "How We Use Your Information",
    list: [
      "Provide and manage our services",
      "Match tenants with suitable properties",
      "Improve user experience",
      "Send notifications and updates",
      "Ensure compliance with our Terms of Use",
    ],
  },
  {
    title: "Information Sharing",
    content:
      "We do not sell or rent your personal data. We may share information with trusted service providers who help us operate the platform (e.g., hosting, payments), or when legally required.",
  },
  {
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect your data from unauthorized access, loss, or misuse.",
  },
  {
    title: "Your Rights",
    list: [
      "Access and update your personal information",
      "Request deletion of your account",
      "Withdraw consent for data processing",
    ],
  },
  {
    title: "Cookies",
    content:
      "We use cookies to improve functionality and analyze usage patterns. You can manage cookies through your browser settings.",
  },
  {
    title: "Updates to this Policy",
    content:
      "We may update this Privacy Policy from time to time. We encourage you to review this page periodically for any changes.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at:",
    contact: "privacy@basafinder.com",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-teal-600 mb-6 sm:mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center bg-teal-100 text-teal-600 font-semibold rounded-full mr-2 sm:mr-3">
                  {idx + 1}
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-teal-600">
                  {section.title}
                </h2>
              </div>
              {section.content && (
                <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                  {section.content}{" "}
                  {section.contact && (
                    <a
                      href={`mailto:${section.contact}`}
                      className="text-teal-600 hover:underline"
                    >
                      {section.contact}
                    </a>
                  )}
                </p>
              )}
              {section.list && (
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
