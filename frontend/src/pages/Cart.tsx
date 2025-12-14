import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Plus, Minus } from 'lucide-react';

export default function Cart() {
    const { cart, removeFromCart, clearCart, getCartTotal, updateQuantity } = useAuth();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <h1 className="text-3xl font-serif font-bold text-[#a61c2e] mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Add some sweets to get started!</p>
                <Link to="/" className="bg-[#a61c2e] text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-[#8a1620] transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-[#a61c2e] text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 mb-4">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Store
                    </Link>
                    <h1 className="text-4xl font-serif font-bold text-[#fdf7ef]">Shopping Cart</h1>
                </div>
            </div>

            {/* Cart Items */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-6 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                    {/* Image */}
                                    {item.imageUrl && (
                                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                    )}

                                    {/* Details */}
                                    <div className="flex-1">
                                        <h3 className="font-serif text-lg font-bold text-[#a61c2e]">{item.name}</h3>
                                        <p className="text-gray-600 text-sm mb-2">Price: ₹{item.price.toFixed(2)} each</p>
                                        
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="bg-gray-200 hover:bg-gray-300 p-2 rounded transition-colors"
                                                title="Decrease quantity"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                disabled={item.quantity >= item.availableQuantity}
                                                className="bg-gray-200 hover:bg-gray-300 p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                                                title={item.quantity >= item.availableQuantity ? "Maximum quantity reached" : "Increase quantity"}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        
                                        <p className="text-gray-800 font-bold">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:bg-red-50 p-3 rounded transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="border border-gray-200 rounded-lg p-6 sticky top-6">
                            <h2 className="text-xl font-serif font-bold text-[#a61c2e] mb-6">Order Summary</h2>

                            <div className="space-y-4 border-b border-gray-200 pb-4 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Subtotal</span>
                                    <span className="font-bold">₹{getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Shipping</span>
                                    <span className="font-bold">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Tax</span>
                                    <span className="font-bold">Included</span>
                                </div>
                            </div>

                            <div className="flex justify-between mb-6">
                                <span className="text-lg font-bold text-[#a61c2e]">Total</span>
                                <span className="text-2xl font-bold text-[#bfa05f]">₹{getCartTotal().toFixed(2)}</span>
                            </div>

                            <button className="w-full bg-[#a61c2e] text-white font-bold uppercase tracking-widest py-3 hover:bg-[#8a1620] transition-colors mb-4">
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full border-2 border-red-500 text-red-500 font-bold uppercase tracking-widest py-3 hover:bg-red-50 transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
