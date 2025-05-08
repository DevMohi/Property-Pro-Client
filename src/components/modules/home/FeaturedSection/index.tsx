import Image from "next/image";
import { Check } from "lucide-react";

export default function FeaturedSection() {
  return (
    <section className="py-16 bg-white container mx-auto text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative ">
          <Image
            src="https://images.unsplash.com/photo-1600585153490-76fb20a32601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8cHJvcGVydGllc3x8MHx8fHwxNjI4ODIzMzQw&ixlib=rb-1.2.1&q=80&w=1080" // Replace with actual image path
            alt="Property Image"
            width={650}
            height={300}
            className="rounded-xl shadow-lg"
      
          />
        </div>

        {/* Content Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Find Your Perfect Home with PropertyPro
          </h3>
          <p className="text-gray-600 mb-8">
            At PropertyPro, we make finding a rental home easy, reliable, and
            stress-free. Whether you are looking for a cozy apartment or a
            spacious house, our platform is designed to connect you with your
            ideal living space quickly and securely.
          </p>

          <ul className="space-y-4 text-lg text-gray-700">
            <li className="flex items-center gap-2">
              <Check className="text-teal-600" /> Wide selection of verified
              rental properties across prime locations
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-teal-600" /> Easy-to-use search filters to
              match your lifestyle and budget
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-teal-600" /> Direct communication with
              trusted property owners and managers
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-teal-600" /> Transparent pricing with no
              hidden charges
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-teal-600" /> 24/7 customer support to
              assist you at every step
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
