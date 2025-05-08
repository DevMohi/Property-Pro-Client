import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-teal-500 container mx-auto text-white">
      <div className=" text-center">
        <h2 className="text-xl md:text-3xl font-extrabold mb-4">
          Stay Updated with the Latest Listings
        </h2>
        <p className="text-xs md:text-lg mb-8  px-10 md:px-0">
          Be the first to know. Sign up for the newsletter today and receive
          updates on the best rental options!
        </p>

        <div className="flex justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-3 rounded-md w-50 md:w-72 text-white-800 border font-bold border-white"
          />
          <button className="flex items-center gap-2 bg-white text-teal-500 p-3 rounded-md font-semibold hover:bg-gray-100 transition-all">
            <Mail className="w-5 h-5" />
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
