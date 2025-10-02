const { useState, useEffect, useRef } = React;

const TestimonialsSection = () => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsViewable, setCardsViewable] = useState(3);

    const testimonials = [
        { text: "The seamless integration with our existing system made the transition effortless. Our checkout process is faster than ever.", name: "Allan Collins", title: "Store Owner", initial: "A.C" },
        { text: "I Love It", name: "Lebron James", title: "NBA Hall of Famer", initial: "L.B.J" },
        { text: "I was worried about the learning curve, but the system is so intuitive. My staff learned it in an afternoon.", name: "Clay Washington", title: "Restaurant Manager", initial: "C.W" },
        { text: "The detailed analytics have been a game-changer. I can make informed decisions and optimize our sales more effectively.", name: "Tanya Grant", title: "Retail Entrepreneur", initial: "T.G" },
        { text: "The customer support is top-notch. Any question I have is answered promptly, ensuring our business never misses a beat.", name: "John Smith", title: "Small Business Owner", initial: "J.S" },
        { text: "The hardware is durable, and the software is incredibly reliable. I no longer worry about system crashes during peak hours.", name: "Sarah Kim", title: "Cafe Manager", initial: "S.K" },
        { text: "This POS system has transformed our inventory management. We can now track stock in real-time and prevent shortages.", name: "Michael Lee", title: "Boutique Owner", initial: "M.L" }
    ];

    const getCardsPerPage = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    useEffect(() => {
        const updateCardsViewable = () => setCardsViewable(getCardsPerPage());
        updateCardsViewable();
        window.addEventListener("resize", updateCardsViewable);
        return () => window.removeEventListener("resize", updateCardsViewable);
    }, []);

    const transformValue = -(100 / cardsViewable) * currentIndex;

    const handleNext = () => {
        if (currentIndex < testimonials.length - cardsViewable) setCurrentIndex(prev => prev + 1);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const cardStyle = { flex: `0 0 ${100 / cardsViewable}%`, maxWidth: `${100 / cardsViewable}%` };

    return (
        <section className="py-8 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-6">
                    <h3 className="text-sm text-gray-500 font-semibold mb-1 tracking-wide uppercase">SUCCESS STORIES</h3>
                    <h2 className="text-4xl sm:text-5xl font-bold text-red-500 leading-tight">
                        What our clients say about us.
                    </h2>
                </div>

                <div className="testimonial-carousel-wrapper relative overflow-hidden">
                    <div
                        ref={carouselRef}
                        className="flex transition-transform duration-500 ease-in-out gap-3"
                        style={{ transform: `translateX(${transformValue}%)` }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} style={cardStyle}>
                                <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col items-center text-center relative">
                                    <div className="absolute top-0 left-0 mt-3 ml-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-xs">{testimonial.initial}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 my-4 flex-grow pt-6 px-1">"{testimonial.text}"</p>
                                    <div className="flex flex-col items-center mt-1">
                                        <img
                                            src={`https://placehold.co/100x100/E5E7EB/4B5563?text=${testimonial.initial}`}
                                            alt="Client Testimonial"
                                            className="w-10 h-10 rounded-full mb-1 object-cover"
                                        />
                                        <p className="font-bold text-gray-800 text-xs">{testimonial.name}</p>
                                        <p className="text-xs text-red-500 mt-0">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 flex justify-center space-x-3">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className={`bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-full shadow-lg transition-colors text-sm ${
                                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                            }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= testimonials.length - cardsViewable}
                            className={`bg-red-500 text-white font-bold py-1 px-3 rounded-full shadow-lg transition-colors text-sm ${
                                currentIndex >= testimonials.length - cardsViewable ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
