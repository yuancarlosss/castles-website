import React from 'react';

const ShowcaseSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="showcase">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className="text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Discover Our Smart POS Terminals
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-md">
              Experience the future of payments with our advanced Android POS terminals, designed for speed, security, and seamless integration.
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Fast Transactions:</strong> Process payments in seconds with our high-speed terminals.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Secure Payments:</strong> Built-in encryption and compliance with global security standards.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Versatile Integration:</strong> Supports a wide range of apps and payment networks for ultimate flexibility.</span>
              </li>
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-block px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
              Learn More
            </a>
          </div>
          <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src="resources/vidcast.mp4"
              onError={(e) => { e.target.poster = 'https://placehold.co/600x400/2c2c2c/ffffff?text=Video+Not+Found'; }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;