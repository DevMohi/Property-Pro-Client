export default function WhyChooseUsSection() {
  return (
    <section className="py-16 bg-white container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold mb-4">
          Why Choose PropertyPro?
        </h2>
        <p className="text-lg text-gray-600">
          We make renting simple, efficient, and secure. Here&#39;s why
          PropertyPro stands out:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <div className="bg-white p-6 rounded-lg border shadow-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold">✔</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
          <p className="text-gray-600">
            All our properties are verified, ensuring you get access to quality
            homes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold">💬</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
          <p className="text-gray-600">
            Connect directly with property owners or managers to get answers to
            your queries instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold">🔐</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
          <p className="text-gray-600">
            Make secure payments directly on our platform for peace of mind
            throughout the process.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold">🚚</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Fast Moves</h3>
          <p className="text-gray-600">
            Move in quickly with simplified procedures and speedy leasing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold">📞</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600">
            Our customer support team is always available to help you with your
            rental needs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold">🏠</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Wide Range of Properties
          </h3>
          <p className="text-gray-600">
            Find a variety of rental options that suit your lifestyle, budget,
            and needs.
          </p>
        </div>
      </div>
    </section>
  );
}
