import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, useAuth } from '../context/AuthContext';
import { Search, ShoppingCart } from 'lucide-react';

interface Sweet {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

export default function Dashboard() {
    const { user, logout, cart, addToCart } = useAuth();
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSweets();
    }, [search, category]);

    const fetchSweets = async () => {
        setLoading(true);
        try {
            let endpoint = '/sweets';
            if (category) {
                endpoint = `/sweets/category/${category}`;
            } else if (search) {
                endpoint = `/sweets/search?q=${search}`;
            }
            const res = await api.get(endpoint);
            setSweets(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (sweet: Sweet) => {
        try {
            await api.post(`/sweets/${sweet.id}/purchase`);
            addToCart({
                id: sweet.id,
                name: sweet.name,
                price: sweet.price,
                quantity: 1,
                availableQuantity: sweet.quantity - 1,
                imageUrl: sweet.imageUrl
            });
            fetchSweets();
            alert('Added to cart!');
        } catch (err) {
            alert('Out of stock');
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            {/* Top Notification Bar */}
            <div className="bg-[#a61c2e] text-white text-xs py-2 text-center font-medium tracking-wide">
                Deliveries in Chandigarh University is Super Fast. For same day deliveries please order on Swiggy or Zomato.
            </div>

            {/* Navbar */}
            <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
                            {/* Simple text logo based on request */}
                            <div className="text-center">
                                <h1 className="text-2xl font-serif font-bold text-[#bfa05f] tracking-widest uppercase leading-none">Rajasthani</h1>
                                <span className="text-[10px] text-[#a61c2e] uppercase tracking-[0.3em] font-medium block mt-1">Sweets & Savouries</span>
                            </div>
                        </div>

                        {/* Nav Links (Hidden on small screens) */}
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                            <button onClick={() => setCategory('')} className={`hover:text-[#a61c2e] transition-colors ${!category ? 'text-[#a61c2e] font-bold' : ''}`}>Shop All</button>
                            <button onClick={() => setCategory('Sweets')} className={`hover:text-[#a61c2e] transition-colors ${category === 'Sweets' ? 'text-[#a61c2e] font-bold' : ''}`}>Sweets</button>
                            <button onClick={() => setCategory('Namkeen')} className={`hover:text-[#a61c2e] transition-colors ${category === 'Namkeen' ? 'text-[#a61c2e] font-bold' : ''}`}>Namkeen</button>
                            <button onClick={() => setCategory('Dry Fruits')} className={`hover:text-[#a61c2e] transition-colors ${category === 'Dry Fruits' ? 'text-[#a61c2e] font-bold' : ''}`}>Dry Fruits</button>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-6 text-gray-600">
                            {/* Search Icon (styled) */}
                            <div className="relative hidden md:block group">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-0 group-hover:w-32 focus:w-32 transition-all duration-300 border-b border-gray-300 focus:border-[#a61c2e] outline-none text-sm bg-transparent"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Search className="w-5 h-5 absolute right-0 top-0 cursor-pointer hover:text-[#a61c2e]" />
                            </div>

                            {/* Cart Icon */}
                            <Link to="/cart" className="relative flex items-center gap-1 cursor-pointer hover:text-[#a61c2e] transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#a61c2e] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>

                            <div className="flex items-center gap-1 cursor-pointer hover:text-[#a61c2e]">
                                <span className="text-xs uppercase font-bold hidden sm:block">{user?.role === 'ADMIN' && <a href="/admin">Admin</a>}</span>
                            </div>

                            <button onClick={logout} className="text-xs uppercase font-bold hover:text-[#a61c2e]">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative bg-[#fdf7ef] overflow-hidden">
                {/* Visual split background effect matching the image loosely */}
                <div className="absolute top-0 left-0 w-1/2 h-full bg-[#e0f2fe] skew-x-12 -translate-x-20 opacity-50 z-0"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left: Product Images Mockup */}
                        <div className="relative">
                            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                                {/* Banner Image */}
                                <div className="bg-white p-2 shadow-2xl rotate-3 border-4 border-[#bfa05f]/20">
                                    <img src="/images/banner.jpg" alt="Sweet Box Banner" className="h-64 w-full object-cover border border-white/30" />
                                </div>
                                {/* Badge */}
                                <div className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-xl border border-gray-100 flex flex-col items-center justify-center w-24 h-24 rotate-12">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold text-center leading-none">No Refined</span>
                                    <span className="text-lg font-bold text-[#2e4c79]">Sugar</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Text Content */}
                        <div className="text-right md:text-left">
                            <h2 className="text-[#2e4c79] text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
                                A LEGACY <br />
                                REIMAGINED!
                            </h2>
                            <p className="text-xl text-gray-600 mb-2 font-light">
                                Mysore Pak & Kaju Katli,
                            </p>
                            <p className="text-2xl text-gray-800 font-bold mb-8">
                                Now Made with <span className="text-[#a61c2e]">Pure Jaggery!</span>
                            </p>
                            <button className="bg-[#2e4c79] text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-[#1e3a5f] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section (Inventory) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <span className="text-[#a61c2e] uppercase tracking-[0.3em] text-xs font-bold">Shop Our Favorites</span>
                    <h2 className="text-4xl font-serif text-gray-800 mt-3 mb-6">Our Collection</h2>
                    <div className="w-16 h-0.5 bg-[#bfa05f] mx-auto"></div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-[#a61c2e] font-serif text-xl animate-pulse">Loading delicacies...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {sweets.map((sweet) => (
                            <div key={sweet.id} className="group bg-white rounded-none p-4 text-center hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#bfa05f]/20">
                                {/* Badge */}
                                {sweet.quantity === 0 && (
                                    <span className="absolute top-4 left-4 bg-gray-800 text-white text-[10px] uppercase font-bold px-3 py-1 tracking-widest z-20">
                                        Sold Out
                                    </span>
                                )}

                                {/* Image Area */}
                                <div className="h-64 bg-[#f9f9f9] mb-6 flex items-center justify-center text-gray-300 group-hover:bg-[#fdf7ef] transition-colors relative overflow-hidden">
                                    {sweet.imageUrl ? (
                                        <img src={sweet.imageUrl} alt={sweet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500">🍬</span>
                                    )}

                                    {/* Overlay Button */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button
                                            onClick={() => handlePurchase(sweet)}
                                            disabled={sweet.quantity === 0}
                                            className="bg-white text-gray-900 px-6 py-2 uppercase text-xs font-bold tracking-widest hover:bg-[#a61c2e] hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {sweet.quantity === 0 ? 'Notify Me' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] text-[#bfa05f] font-bold tracking-widest uppercase">{sweet.category}</p>
                                    <h3 className="font-serif text-xl text-gray-800 group-hover:text-[#a61c2e] transition-colors">
                                        {sweet.name}
                                    </h3>
                                    <p className="font-bold text-gray-900 text-lg">₹{sweet.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Simple */}
            <div className="bg-[#fcfcfc] border-t border-gray-100 py-12 text-center text-xs text-gray-400 uppercase tracking-widest">
                &copy; 2024 Rajasthani Sweets. All Rights Reserved.
            </div>
        </div>
    );
}
