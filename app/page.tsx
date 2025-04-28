import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-violet-600">
            AI Content Generator
          </span>
        </div>
        <Link
          href="/(auth)/sign-in"  // Link to sign-in/signup page
          className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6.75a3 3 0 11-6 0 3 3 0 016 0zM4.5 18a6 6 0 1115 0H4.5z"
            />
          </svg>
          <span className="text-sm font-medium">Get Started</span>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="text-center bg-gradient-to-r from-violet-100 via-white to-indigo-100 py-20 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 leading-snug">
            Revolutionize Your Content Creation with AI
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Our AI-powered app delivers engaging, high-quality text in seconds.
          </p>
          <Link
            href="/(auth)/sign-in"  // Redirect to sign-in/signup page
            className="mt-6 inline-block bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-full text-lg shadow hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#7C3AED"
              d="M0,224L48,192C96,160,192,96,288,90.7C384,85,480,139,576,138.7C672,139,768,85,864,69.3C960,53,1056,75,1152,90.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{
              title: "25+ Templates",
              description: "Responsive, and mobile-first project on the web",
            },
            {
              title: "Customizable",
              description: "Components are easily customized and extendable",
            },
            {
              title: "Free to Use",
              description: "Every component and plugin is well documented",
            },
            {
              title: "24/7 Support",
              description: "Contact us 24 hours a day, 7 days a week",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} AI Content Generator. All Rights
          Reserved | Purushottam & Shashank
        </p>
      </footer>
    </div>
  );
}
