import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { features } from "../data/features";
import cta from "../data/cta.json";
import Icon from "../components/icon";
import { StartNow } from "~/components/home/start-now";
import { CurrentUserContext } from "~/contexts/current-user";
import { useContext } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "GetDoa" },
    {
      name: "description",
      content:
        "Browse Doa / Prayers and Create your custom arrangements of Doa / prayers",
    },
    {
      name: "keywords",
      content:
        "doa, prayer, solat, muslim, doa selepas solat, doa majlis, doa kenduri, doa kesyukuran, doa mohon rezeki, doa minta kesihatan, doa minta kebahagiaan, doa minta keberkatan, doa minta kejayaan, doa minta perlindungan, doa minta pertolongan, doa minta petunjuk, doa minta kejayaan, after solat prayer, event prayer, thanksgiving prayer, prayer for sustenance, prayer for health, prayer for happiness, prayer for blessings, prayer for success, prayer for protection, prayer for help, prayer for guidance, prayer for success",
    },
  ];
};

export default function Index() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="min-h-screen">
      <header className="bg-blue-100/40 flex justify-between p-4 px-6 md:p-10 md:px-20 sticky top-0 backdrop-blur-2xl z-10">
        <Link to="/">
          <img src="/logo.svg" alt="GetDoa Logo" className="h-auto w-full" />
        </Link>
        <div className="space-x-4 py-2">
          {currentUser ? (
            <div className="flex items-center gap-x-4">
              <p>{currentUser.email.split("@")[0]}</p>
              <Link
                to="/logout"
                className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
              >
                Logout
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="text-gray-700 hover:text-gray-900"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>
      <main id="hero" className="bg-blue-50 flex justify-center py-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center md:gap-20 px-10 md:px-20 w-full max-w-screen-lg">
          {/* Left Text Section */}
          <div
            id="hero-left"
            className="max-w-lg flex flex-col gap-4 items-start"
          >
            <h1 className="text-4xl md:text-6xl font-semibold text-teal-800">
              Custom better{" "}
              <span className="text-teal-600 font-bold">دعاء</span> for your
            </h1>
            <h2 className="text-teal-600 text-4xl">solat/life/events/</h2>
            <p className="text-gray-600">
              As humans, we frequently pray for the things we desire and want.{" "}
              <span className="italic text-gray-400 line-through">
                Occasionally, we fail to pray in a comprehensive manner.
              </span>
            </p>
            <div className="flex gap-4">
              <StartNow />
              <Link
                to="/all-doa"
                className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition duration-200"
              >
                See all Doa →
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div id="hero-right" className="mt-8 md:mt-0 pb-8 pr-0 md:pb-0">
            <div className="relative">
              <img
                src="/people_berdoa.svg"
                alt="Praying illustration"
                className="w-96"
              />
            </div>
          </div>
        </div>
      </main>

      <section
        id="objectives"
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 w-full max-w-screen-lg items-center px-10 md:px-20 py-10 mx-auto"
      >
        <div className="col-span-2 md:col-span-1 bg-objective-left aspect-square w-full max-w-64 bg-cover justify-self-center flex items-center justify-center text-2xl text-center text-balance">
          Is it necessary to pray in Arabic?
        </div>
        <div className="col-span-2 flex flex-col items-center gap-4">
          <p>
            When we get into our vehicle, we may pray for our safety and smooth
            journey. However, when we read the dua for riding a vehicle that is
            already in the Quran, we will realize that the dua is more
            comprehensive.
          </p>
          <div className="border border-[#78CAD4] p-4 rounded-lg max-w-96 text-center flex flex-col gap-2">
            <p className="text-2xl">
              سُبْحَانَ الَّذِى سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ
              مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ
            </p>
            <p className="text-sm">(Al-Zukhruf:13-14)</p>
            <p className="text-sm">
              &ldquo;Glory be to the One Who has made this subservient to us,
              and we were not capable of that, and surely to our Lord we shall
              return.&rdquo;
            </p>
          </div>
          <p>
            By reading this dua, we indirectly remind ourselves that we will
            return to Allah when the time comes. Moreover, what are the chances
            that we will pray in such detail when riding a vehicle?
          </p>
        </div>
      </section>

      <section
        id="features"
        className="flex flex-col justify-center px-10 md:px-20 py-12 text-center w-full max-w-screen-lg mx-auto text-pretty gap-4"
      >
        <h2 className="text-4xl">Exciting features</h2>
        <p>
          By reading this dua, we indirectly remind ourselves that we will
          return to Allah when the time comes. Moreover, what are the chances
          that we will pray in such detail when riding a vehicle?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-left mt-8">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-8 py-4">
            <h3 className="text-teal-600 underline underline-offset-8 decoration-2">
              Public feature,
            </h3>
            <div className="flex flex-col gap-4">
              {features.public.map((feature, index) => (
                <div key={`public-${index}`} className="flex gap-2 items-start">
                  {/* TODO: Icons will be replaced */}
                  <div className="size-4 bg-black m-1"></div>
                  <div className="flex-1">
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-[#4B5563] font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 border border-black/10 p-4 rounded-md flex flex-col gap-8 items-center">
            <h3 className="text-teal-600 underline underline-offset-8 decoration-2">
              Upon Sign Up,
            </h3>

            <div className="flex flex-wrap gap-4">
              {features.sign_up.map((feature, index) => (
                <div
                  key={`public-${index}`}
                  className="flex gap-2 items-start flex-1 min-w-[200px]"
                >
                  {/* TODO: Icons will be replaced */}
                  <div className="size-4 bg-black m-1"></div>
                  <div className="flex-1">
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-[#4B5563] font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to=""
              className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 mt-auto"
            >
              Sign up now
            </Link>
          </div>
        </div>
      </section>

      {/* TODO: Complete partners section */}
      <section id="partners"></section>

      <footer className="flex flex-col-reverse md:flex-row justify-between gap-4 w-full max-w-screen-lg px-10 md:px-20 py-6 mx-auto">
        <p className="w-fit">
          &copy; GetDoa.com {new Date().getFullYear()}. All rights reserved.
        </p>
        <div className="flex items-center">
          {cta.map((item) => (
            <a href={item.link} key={item.id} className="p-2">
              <Icon name={item.id} className="size-4" />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
