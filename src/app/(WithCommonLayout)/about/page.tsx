import Image from 'next/image';

const AboutUs = () => {
  const team = [
    {
      name: 'Aisha Patel',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'James Turner',
      role: 'Lead Developer',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
      name: 'Leila Ahmed',
      role: 'Community Manager',
      image: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
  ];

  return (
    <div>
      <section className="container mx-auto my-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-5">
            About <span className="text-teal-500">Us</span>
          </h2>
   
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🔑 For Landlords
              </h3>
              <p className="text-gray-600">
                Post, manage, and update rental listings with ease. Approve
                rental requests and securely connect with tenants after
                approval.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🏠 For Tenants
              </h3>
              <p className="text-gray-600">
                Search for homes, request rentals, and unlock secure payment
                options after landlord approval. Contact landlords directly for
                details.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🛡️ Admin Oversight
              </h3>
              <p className="text-gray-600">
                The admin ensures platform integrity by managing users,
                verifying listings, and resolving disputes — keeping the
                experience safe and fair for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 container mx-auto">
        {/* Team Section */}
        <div className="py-20 container mx-auto px-10">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Meet Our <span className="text-teal-500">Dynamic Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {team.map((member, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={600}
                  height={480}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
