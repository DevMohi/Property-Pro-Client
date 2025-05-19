'use client';
import Image from 'next/image';
import { Check } from 'lucide-react';

export default function FeaturedSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <div className="relative w-full h-64 sm:h-80 lg:h-[360px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1600585153490-76fb20a32601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8cHJvcGVydGllc3x8MHx8fHwxNjI4ODIzMzQw&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Property Image"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* TEXT CONTENT */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center lg:text-left">
              Find Your Perfect Home with PropertyPro
            </h2>
            <div className="w-20 h-1 bg-teal-600 mb-6 mx-auto "></div>
            <p className="text-gray-600 leading-relaxed mb-8">
              At PropertyPro, we make finding a rental home easy, reliable, and
              stress-free. Whether you’re looking for a cozy apartment or a
              spacious house, our platform is designed to connect you with your
              ideal living space quickly and securely.
            </p>

            {/* Always show list; add horizontal padding on mobile */}
            <ul className="space-y-4 px-4 sm:px-0 hidden lg:block">
              {[
                'Wide selection of verified rental properties across prime locations',
                'Easy-to-use search filters to match your lifestyle and budget',
                'Direct communication with trusted property owners and managers',
                'Transparent pricing with no hidden charges',
                '24/7 customer support to assist you at every step',
              ].map((text) => (
                <li key={text} className="flex items-start gap-3 text-sm sm:text-base">
                  <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
