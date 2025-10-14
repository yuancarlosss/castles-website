const { useState } = React;

// Access global helper functions exposed by navBar.js
const getProductLinks = window.getProductLinks;
const getCompanyLinks = window.getCompanyLinks;

const SocialIcon = ({ href, children }) => (
    <a href={href} 
       target="_blank" 
       rel="noopener noreferrer"
       className="text-white hover:text-red-500 transition-colors p-2 rounded-full border border-gray-700 hover:border-red-500"
    >
        {children}
    </a>
);

const Footer = () => {
    // Check if the helper functions are available before calling them
    const productLinks = getProductLinks ? getProductLinks() : [];
    const companyLinks = getCompanyLinks ? getCompanyLinks() : [];
    
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Log the subscription attempt instead of using alert()
        console.log('Attempting to subscribe email:', email); 
        
        // Display a temporary success message on the UI
        setMessage('Thank you for subscribing! Check the console for details.');
        setEmail('');

        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    // Footer color setup: Black background, white text
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-4 shadow-inner border-t border-gray-800 font-sans">
            <div className="container mx-auto px-4">
                
                {/* Logo Section */}
                <div className="mb-8">
                    {/* Placeholder image adjusted for dark background */}
                    <img
                        src="resources/castlesalt.png"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://placehold.co/250x60/374151/FFFFFF?text=CASTLES+TECH';
                        }}
                        alt="Company Logo"
                        className="h-16 w-auto object-contain" 
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700 pb-8">
                    
                    {/* Column 1: Products & Pages */}
                    <div className="space-y-4">
                        <p className="font-bold uppercase text-xs tracking-widest text-red-500">PRODUCTS & PAGES</p>
                        <ul className="space-y-2 text-sm">
                            {productLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-gray-300 hover:text-red-500 transition-colors">
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
                                    <a href={link.href} className="text-gray-300 hover:text-red-500 transition-colors">
                                        {link.name}
                                    </a>
                                
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 & 4 (Combined): Newsletter Signup and Social Media */}
                    <div className="space-y-6 col-span-1 lg:col-span-2">
                        
                        {/* Newsletter Signup */}
                        <div className="space-y-4">
                            <p className="font-bold uppercase text-xs tracking-widest text-red-500">
                                STAY IN THE LOOP
                            </p>
                            
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email address to receive updates" 
                                    className="flex-grow p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex-shrink-0 shadow-lg"
                                >
                                    Subscribe
                                </button>
                            </form>
                            {message && (
                                <p className="text-sm text-green-400 mt-2 transition-opacity duration-500 ease-in-out">
                                    {message}
                                </p>
                            )}
                        </div>

                        {/* Social Media Section */}
                        <div className="space-y-3">
                            <p className="font-bold uppercase text-xs tracking-widest text-red-500">
                                FOLLOW US ON:
                            </p>
                            <div className="flex space-x-4">
                                {/* Facebook Icon */}
                                <SocialIcon href="https://www.facebook.com/profile.php?id=61563477383291">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.196 3.782 9.52 8.707 10.37V14.12H8.47V12h2.237V9.38c0-2.203 1.343-3.41 3.324-3.41.948 0 1.76.07 1.996.102v2.3H14.71c-1.085 0-1.295.516-1.295 1.27v1.68h2.56l-.414 2.12H13.41v8.25C18.218 21.603 22 17.279 22 12 22 6.477 17.523 2 12 2z"/></svg>
                                </SocialIcon>

                                {/* LinkedIn Icon */}
                                <SocialIcon href="https://www.instagram.com/castles.technology/">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8 8H5v9h3V8zm5 0h-3v9h3v-4.5c0-1.24.83-1.63 1.17-1.78l-.17.18V8zM7.5 5.5a1 1 0 100 2 1 1 0 000-2z"/></svg>
                                </SocialIcon>

                                {/* Instagram Icon */}
                                <SocialIcon href="https://www.linkedin.com/company/castles-technology-emea/posts/?feedView=all">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM16.5 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                                </SocialIcon>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 text-center text-xs text-gray-400">
                    Copyright © 2025 Castles Technology. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

// Expose the Footer component globally
window.Footer = Footer;
