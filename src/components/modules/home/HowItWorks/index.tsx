export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-teal-50 container mx-auto">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold mb-4">How PropertyPro Works</h2>
        <p className="text-lg text-gray-600">
          Renting a property with PropertyPro is simple and straightforward.
          Here&#39;s how it works:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 px-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold">1</span>
          </div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Browse Listings
          </h3>
          <p className="text-gray-600 text-center">
            Explore available rental properties in your desired location with
            detailed information and images.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold">2</span>
          </div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Request Rentals From Landlords
          </h3>
          <p className="text-gray-600 text-center">
            Reach out directly to property owners and managers to inquire about
            availability and schedule viewings.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold">3</span>
          </div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Complete Your Lease On Approval
          </h3>
          <p className="text-gray-600 text-center">
            Finalize the terms and sign the lease online. Move in and enjoy your
            new home!
          </p>
        </div>
      </div>
    </section>
  );
}
