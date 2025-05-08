import { CheckCircle, MapPin, FileText, Search } from "lucide-react";

export default function TipsForRenters() {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Tips for Renters
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Advice on finding and renting the right house.
        </p>

        {/* Tips List */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all border border-teal-500">
            <div className="flex justify-center items-center mb-4">
              <CheckCircle className="text-teal-500 h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Set Your Budget
            </h3>
            <p className="text-gray-700">
              Know how much you can afford monthly before you begin your search.
              Factor in rent, utilities, and any extra fees.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all border border-teal-500">
            <div className="flex justify-center items-center mb-4">
              <MapPin className="text-teal-500 h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Choose the Right Location
            </h3>
            <p className="text-gray-700">
              Look for areas with easy access to work, school, and transport.
              Check safety and nearby facilities like markets or hospitals.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all border border-teal-500">
            <div className="flex justify-center items-center mb-4">
              <Search className="text-teal-500 h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Inspect Before You Rent
            </h3>
            <p className="text-gray-700">
              Visit the property in person if possible. Check water,
              electricity, ventilation, and ask about maintenance
              responsibilities.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all border border-teal-500">
            <div className="flex justify-center items-center mb-4">
              <FileText className="text-teal-500 h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Read the Lease Carefully
            </h3>
            <p className="text-gray-700">
              Understand your rental agreement fully. Look for hidden charges,
              notice periods, and deposit terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
