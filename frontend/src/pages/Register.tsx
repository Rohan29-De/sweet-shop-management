import React, { useState } from 'react';
import { api } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { email, password, role });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email might be taken.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-royal-cream font-sans">
            <div className="w-full max-w-md p-10 bg-white border border-royal-gold/30 shadow-2xl shadow-royal-maroon/10 text-center">
                <h2 className="text-4xl font-serif font-bold text-royal-maroon mb-2">Join Royalty</h2>
                <p className="text-royal-brown/60 mb-8 italic">Create your account</p>

                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div>
                        <label className="block text-xs font-bold text-royal-maroon uppercase tracking-widest mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-royal-gold/50 focus:outline-none focus:border-royal-maroon bg-royal-cream/10"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-royal-maroon uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-royal-gold/50 focus:outline-none focus:border-royal-maroon bg-royal-cream/10"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-royal-maroon uppercase tracking-widest mb-2">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-3 border border-royal-gold/50 focus:outline-none focus:border-royal-maroon bg-royal-cream/10"
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full py-3 bg-royal-maroon text-royal-gold font-bold uppercase tracking-widest hover:bg-primary-900 transition-colors">
                        Register
                    </button>
                </form>
                <div className="mt-8 text-sm">
                    <span className="text-royal-brown/60">Already have an account? </span>
                    <Link to="/login" className="text-royal-maroon font-bold hover:underline">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
