// scripts/navBar.js

const { useState, useEffect, useRef } = React;

// --- Data Definitions ---
const navItems = [
    { name: "Home", href: "homePage.html", dropdown: false },
    {
        name: "Products",
        href: "#",
        dropdown: true,
        items: [
            {
                name: "Solutions",
                href: "#",
                dropdown: true,
                items: [
                    { name: "In-Store Solutions", href: "pos.html" },
                    { name: "Online Solutions", href: "online.html" }
                ]
            },
            {
                name: "Terminals",
                href: "#terminals",
                dropdown: true,
                items: [
                    { name: "S1F2A", href: "product1.html" },
                    { name: "MINI", href: "product2.html" },
                    { name: "S1F1", href: "product3.html" }
                ]
            }
        ]
    },
    { name: "Pricing", href: "pricing.html", dropdown: false },
    { name: "About Us", href: "about.html", dropdown: false },
    { name: "Helpdesk & Support", href: "support.html", dropdown: false }
];

const socialLinks = [
    { icon: (<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.258 1H.742C.333 1 0 1.333 0 1.742v20.516C0 22.667.333 23 .742 23h21.516c.409 0 .742-.333.742-.742V1.742C23 1.333 22.667 1 22.258 1zM7.227 20.315H3.725V9.45H7.227v10.865zM5.47 7.97a1.99 1.99 0 110-3.98 1.99 1.99 0 010 3.98zM20.315 20.315h-3.502V14.88c0-1.32-.47-2.228-1.666-2.228-1.282 0-2.04.87-2.378 1.71v5.953h-3.502V9.45h3.502v1.53c.465-.795 1.503-1.928 3.14-1.928 2.296 0 4.02 1.5 4.02 4.74v6.523z"/></svg>), href: "#" }, 
    { icon: (<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.708 3.125 8.718 7.423 9.924.54.102.738-.236.738-.523 0-.256-.01-1.05-.015-1.957-3.04.66-3.68-.807-3.68-1.564-.632-1.61-.154-2.257.478-2.613 1.096-.28 2.275.29 2.593 1.13.97 1.666 2.57 1.18 3.208.895.098-.7.378-1.18.687-1.45-2.435-.27-4.994-1.218-4.994-5.405 0-1.19.42-2.17.11-2.93-.112-.28.114-1.33.268-2.18.423-.13 1.285.04 2.53.978.8-.22 1.637-.33 2.5-.33.863 0 1.7.11 2.5.33 1.245-.938 2.107-1.108 2.53-.978.154.85.38 1.895.268 2.18.068.76.11 1.74.11 2.93 0 4.195-2.56 5.13-5.004 5.405.39.335.74.995.74 2.01 0 1.45-.014 2.62-.014 2.97 0 .287.198.625.742.523C18.875 20.718 22 16.708 22 12c0-5.523-4.477-10-10-10z" /></svg>), href: "#" }, 
    { icon: (<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-2zm-6 0h-8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM4 6H2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>), href: "#" }
];

const getProductLinks = () => {
    const productItem = navItems.find(item => item.name === "Products");
    let links = [
        navItems.find(item => item.name === "Home"),
        navItems.find(item => item.name === "Pricing"),
        navItems.find(item => item.name === "Helpdesk & Support")
    ].filter(Boolean).map(item => ({ name: item.name, href: item.href }));

    if (productItem && productItem.dropdown) {
        const solutions = productItem.items.find(item => item.name === "Solutions");
        const terminals = productItem.items.find(item => item.name === "Terminals");
        
        if (solutions && solutions.dropdown) {
            links.push(...solutions.items.map(item => ({ name: item.name, href: item.href })));
        }
        if (terminals && terminals.dropdown) {
            links.push(...terminals.items.map(item => ({ name: item.name, href: item.href })));
        }
    }
    return links;
};

const getCompanyLinks = () => {
    return [
        { name: "About Us", href: "about.html" },
        { name: "Contact Us", href: "contacts.html" },
        { name: "Helpdesk & Support", href: "support.html" },
    ];
};

// --- Components ---
const NestedDropdownItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);
    const navItemClasses = "block px-4 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-colors duration-200";

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    if (item.dropdown) {
        return (
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href={item.href} className={`${navItemClasses} flex items-center justify-between`}>
                    <span>{item.name}</span>
                    <svg className={`h-3 w-3 ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
                <div className={`absolute top-0 left-full mt-0 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50 transition-all duration-300 transform origin-left ${isOpen ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} style={{ marginLeft: '0.5rem' }}>
                    {item.items.map((subItem, index) => (
                        <a key={index} href={subItem.href} className="block px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-colors duration-200">
                            {subItem.name}
                        </a>
                    ))}
                </div>
            </div>
        );
    }
    return (<a href={item.href} className={navItemClasses}>{item.name}</a>);
};

const DropdownItem = ({ name, items, href, isShrunk }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);
    const navItemClasses = isShrunk
        ? "p-2 font-medium text-xs rounded-md hover:bg-white/20 transition-colors duration-200"
        : "p-2 font-medium text-xs rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200";

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a href={href} className={`${navItemClasses} flex items-center space-x-1 p-2`}>
                <span>{name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </a>
            <div className={`absolute top-full left-0 pt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50 transition-all duration-300 transform origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
                {items.map((sub, index) => (<NestedDropdownItem key={index} item={sub} isShrunk={isShrunk} />))}
            </div>
        </div>
    );
};

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const shrinkThreshold = 50;
            setIsShrunk(window.scrollY > shrinkThreshold);
        };
        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('scroll', handleScroll); };
    }, []);

    const navbarClasses = `fixed top-0 left-0 w-full z-50 shadow-lg transition-[padding,background-color,color] duration-300 ease-in-out ${isShrunk ? 'bg-red-500 text-white py-2 lg:py-4' : 'bg-white text-gray-800 py-4 lg:py-6'}`;
    const navItemClasses = isShrunk ? "p-2 font-medium text-xs rounded-md hover:bg-white/20 transition-colors duration-200" : "p-2 font-medium text-xs rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200";
    const logoClasses = `transition-[height,width] duration-300 ease-in-out ${isShrunk ? 'h-8 sm:h-10' : 'h-10 sm:h-12'}`;
    const contactButtonClasses = `font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${isShrunk ? 'bg-white text-red-500 hover:bg-gray-200' : 'bg-red-500 text-white hover:bg-red-600'}`;

    return (
        <nav className={navbarClasses}>
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={isShrunk ? "resources/castlesalt.png" : "resources/logocastles.png"} onError="this.onerror=null;this.src='https://placehold.co/100x40/ffffff/000000?text=Logo';" alt="Castles Logo" className={logoClasses} />
                </div>
                <div className="hidden lg:flex flex-1 justify-center items-center space-x-8">
                    {navItems.map((item, index) => item.dropdown ? (<DropdownItem key={index} name={item.name} items={item.items} href={item.href} isShrunk={isShrunk} />) : (<a key={index} href={item.href || "#"} className={navItemClasses}>{item.name}</a>))}
                </div>
                <div className="flex items-center space-x-4">
                    <div className="hidden lg:flex items-center">
                        <a href="contacts.html" className={contactButtonClasses}>Contact Us</a>
                    </div>
                    <div className="lg:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="lg:hidden mt-4 space-y-2">
                    <a href="contacts.html" className="block p-2 font-bold rounded-md text-sm text-center bg-red-500 text-white hover:bg-red-600 transition-colors">Contact Us</a>
                    {navItems.map((item, index) => (item.dropdown ? (<DropdownItem key={index} name={item.name} items={item.items} href={item.href} isShrunk={isShrunk} />) : (<a key={index} href={item.href || "#"} className="block p-2 text-gray-800 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm">{item.name}</a>)))}
                </div>
            )}
        </nav>
    );
};

// Expose Navbar and helper functions globally for use in the main script block
window.Navbar = Navbar;
window.getProductLinks = getProductLinks;
window.getCompanyLinks = getCompanyLinks;
window.socialLinks = socialLinks;