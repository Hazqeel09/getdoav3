import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "GetDoa" },
    {
      name: "description",
      content: "Create your custom arrangements of Doa / prayers",
    },
  ];
};

export default function Index() {
  return (
    <div className="bg-blue-50 min-h-screen">
      <header className="flex justify-between p-4 px-6 md:p-10 md:px-20">
        <Link to="/">
          <img src="/logo.svg" alt="GetDoa Logo" className="h-auto w-full " />
        </Link>
        <div className="space-x-4 py-2">
          <a href="/" className="text-gray-700 hover:text-gray-900">
            Log in
          </a>
          <button className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800">
            Sign up
          </button>
        </div>
      </header>

      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-20 pb-8 md:px-96 md:py-16">
        {/* Left Text Section */}
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-6xl font-semibold text-teal-800 mb-4">
            Custom better <span className="text-teal-600 font-bold">دعاء</span>{" "}
            for your
          </h1>
          <h2 className="text-teal-600 text-4xl mb-4">solat/life/events/</h2>
          <p className="text-gray-600 mb-6">
            As humans, we frequently pray for the things we desire and want.{" "}
            <span className="italic text-gray-400 line-through">
              Occasionally, we fail to pray in a comprehensive manner.
            </span>
          </p>
          <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition duration-200">
            Start now →
          </button>
        </div>

        {/* Right Illustration */}
        <div className="mt-8 md:mt-0 pb-8 pr-0 md:pb-0">
          <div className="relative">
            <img
              src="/people_berdoa.svg"
              alt="Praying illustration"
              className="w-96"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
