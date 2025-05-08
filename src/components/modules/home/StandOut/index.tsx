import { CheckCircle, Home, Shield, LifeBuoy } from "lucide-react";
import Image from "next/image";

export default function StandOutSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        {/* What Makes Us Stand Out */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800">
            What Makes Us <span className="text-teal-500">Stand Out</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Discover flexible rental options, modern amenities, and hassle-free
            living experiences designed just for you.
          </p>
        </div>

        {/* Two Columns Section */}
        <div className="lg:flex lg:gap-16 border-t-4 border-teal-500 pt-6">
          {/* Left Column (Text and Features) */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 px-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Why Choose Our Rental Homes?
            </h3>
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-teal-500" />
                Fully Furnished Options: Move in with ease! Select properties
                come fully furnished with stylish interiors and essential
                appliances.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-teal-500" />
                Flexible Lease Terms: Choose the lease duration that fits your
                needs — short-term stays or long-term contracts are available.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-teal-500" />
                Prime Locations: Live close to shopping centers, public
                transport, schools, and parks — making your everyday life
                convenient.
              </li>
            </ul>
          </div>

          {/* Right Column (Image) */}
          <div className="lg:w-1/2">
            <Image
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Living room"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Experience Comfort Section */}
        <div className="mt-16 text-center px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Experience Comfort Like Never Before
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Our rentals are designed with modern living in mind — offering both
            luxury and affordability, all in one place.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all">
              <LifeBuoy className="h-8 w-8 text-teal-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold text-gray-800">
                24/7 Maintenance Support
              </h4>
              <p className="text-gray-700">
                Our dedicated support team is ready to assist you anytime,
                ensuring a worry-free rental experience.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all">
              <Home className="h-8 w-8 text-teal-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold text-gray-800">
                Pet-Friendly Homes
              </h4>
              <p className="text-gray-700">
                Bring your furry friends along! Many of our rental homes welcome
                pets with open arms.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all">
              <Shield className="h-8 w-8 text-teal-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold text-gray-800">
                Energy-Efficient Designs
              </h4>
              <p className="text-gray-700">
                Save on utility bills with our eco-friendly homes featuring
                modern insulation and energy-efficient appliances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
