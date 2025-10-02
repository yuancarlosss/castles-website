const { useState } = React;

// Access global helper functions exposed by navBar.js
const getProductLinks = window.getProductLinks;
const getCompanyLinks = window.getCompanyLinks;

const Footer = () => {
    // Check if the helper functions are available before calling them
    const productLinks = getProductLinks ? getProductLinks() : [];
    const companyLinks = getCompanyLinks ? getCompanyLinks() : [];
    
    // Simple state management for the newsletter form (optional but good practice)
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send 'email' to a server here.
        console.log('Subscribing email:', email);
        alert('Thank you for subscribing!'); 
        setEmail('');
    };

    // Footer color setup: white background, dark text
    return (
        <footer className="bg-white text-gray-800 pt-10 pb-4 shadow-inner border-t border-gray-100">
            <div className="container mx-auto px-4">
                
                {/* Logo Section */}
                <div className="mb-8">
                    <img
                        src="resources/logo-castl2.png"
                        onError="this.onerror=null;this.src='https://placehold.co/250x60/ffffff/000000?text=LOGO+HERE';"
                        alt="Company Logo"
                        className="h-16 w-auto object-contain" 
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-200 pb-8">
                    
                    {/* Column 1: Products & Pages */}
                    <div className="space-y-4">
                        <p className="font-bold uppercase text-xs tracking-widest text-red-500">PRODUCTS & PAGES</p>
                        <ul className="space-y-2 text-sm">
                            {productLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="hover:text-red-500 transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Company */}
                    <div className="space-y-4">
                        <p className="font-bold uppercase text-xs tracking-widest text-red-500">COMPANY</p>
                        <ul className="space-y-2 text-sm">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="hover:text-red-500 transition-colors">
                                        {link.name}
                                    </a>
                                
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 & 4 (Combined): Newsletter Signup */}
                    <div className="space-y-4 col-span-1 lg:col-span-2">
                        <p className="font-bold uppercase text-xs tracking-widest text-red-500">
                            STAY IN THE LOOP
                        </p>
                        
                        {/* Form with a wider input area */}
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full">
                            <input
                                type="email"
                                placeholder="Enter your email address to receive updates" 
                                className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500 text-gray-800"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex-shrink-0"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 text-center text-xs text-gray-500">
                    Copyright © 2025 Castles Technology. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

// Expose the Footer component globally
window.Footer = Footer;
