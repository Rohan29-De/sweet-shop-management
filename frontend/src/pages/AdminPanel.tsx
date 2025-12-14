import React, { useEffect, useState } from 'react';
import { api, useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Sweet {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

export default function AdminPanel() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [form, setForm] = useState({ name: '', category: '', price: 0, quantity: 0, imageUrl: '' });
    const [isEditing, setIsEditing] = useState<string | null>(null);

    useEffect(() => {
        if (user?.role !== 'ADMIN') navigate('/');
        fetchSweets();
    }, [user]);

    const fetchSweets = async () => {
        const res = await api.get('/sweets');
        setSweets(res.data);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            await api.delete(`/sweets/${id}`);
            fetchSweets();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.patch(`/sweets/${isEditing}`, form);
            } else {
                await api.post('/sweets', form);
            }
            setForm({ name: '', category: '', price: 0, quantity: 0, imageUrl: '' });
            setIsEditing(null);
            fetchSweets();
        } catch (err) {
            alert('Operation failed');
        }
    };

    const handleEdit = (sweet: Sweet) => {
        setForm({ name: sweet.name, category: sweet.category, price: sweet.price, quantity: sweet.quantity, imageUrl: sweet.imageUrl || '' });
        setIsEditing(sweet.id);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target?.result as string;
                setForm({ ...form, imageUrl: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-royal-cream p-8 font-sans text-royal-brown">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-royal-gold/20 pb-4">
                    <h1 className="text-4xl font-serif font-bold text-royal-maroon">Admin Dashboard</h1>
                    <Link to="/" className="text-royal-gold font-bold uppercase tracking-widest hover:text-royal-maroon transition-colors text-sm">Back to Store</Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="bg-white p-8 border border-royal-gold/30 shadow-xl shadow-royal-maroon/5 h-fit">
                        <h2 className="text-2xl font-serif font-bold mb-6 text-royal-maroon flex items-center gap-2">
                            {isEditing ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            {isEditing ? 'Edit Sweet' : 'Add New Sweet'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-royal-maroon uppercase tracking-widest mb-1">Name</label>
                                <input required type="text" className="w-full border border-royal-gold/40 p-3 bg-royal-cream/10 focus:outline-none focus:border-royal-maroon transition-colors" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-royal-maroon uppercase tracking-widest mb-1">Category</label>
                                <select required className="w-full border border-royal-gold/40 p-3 bg-royal-cream/10 focus:outline-none focus:border-royal-maroon transition-colors cursor-pointer" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    <option value="">Select Category</option>
                                    <option value="Sweets">Sweets</option>
                                    <option value="Namkeen">Namkeen</option>
                                    <option value="Dry Fruits">Dry Fruits</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-royal-maroon uppercase tracking-widest mb-1">Price</label>
                                    <input required type="number" step="0.01" className="w-full border border-royal-gold/40 p-3 bg-royal-cream/10 focus:outline-none focus:border-royal-maroon transition-colors" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-royal-maroon uppercase tracking-widest mb-1">Quantity</label>
                                    <input required type="number" className="w-full border border-royal-gold/40 p-3 bg-royal-cream/10 focus:outline-none focus:border-royal-maroon transition-colors" value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-royal-maroon uppercase tracking-widest mb-1">Image URL or Upload</label>
                                <input type="text" placeholder="https://example.com/image.jpg" className="w-full border border-royal-gold/40 p-3 bg-royal-cream/10 focus:outline-none focus:border-royal-maroon transition-colors mb-2" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                                <div className="text-center text-xs text-gray-500 mb-2">OR</div>
                                <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full border border-royal-gold/40 p-3 bg-royal-cream/10 focus:outline-none focus:border-royal-maroon transition-colors text-xs" />
                                {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="w-full h-24 object-cover mt-2 border border-royal-gold/40" />}
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="flex-1 bg-royal-maroon text-royal-gold font-bold uppercase tracking-widest py-3 hover:bg-primary-900 transition-colors">{isEditing ? 'Update' : 'Create'}</button>
                                {isEditing && (
                                    <button type="button" onClick={() => { setIsEditing(null); setForm({ name: '', category: '', price: 0, quantity: 0 }); }} className="px-4 py-2 border border-royal-maroon text-royal-maroon font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-2 bg-white p-8 border border-royal-gold/30 shadow-xl shadow-royal-maroon/5">
                        <h2 className="text-2xl font-serif font-bold mb-6 text-royal-maroon">Inventory</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-royal-gold/20 text-royal-brown/60 text-xs uppercase tracking-widest">
                                        <th className="pb-4 font-bold">Name</th>
                                        <th className="pb-4 font-bold">Category</th>
                                        <th className="pb-4 font-bold">Price</th>
                                        <th className="pb-4 font-bold">Stock</th>
                                        <th className="pb-4 text-right font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {sweets.map(sweet => (
                                        <tr key={sweet.id} className="group hover:bg-royal-cream/20 transition-colors">
                                            <td className="py-4 font-serif text-lg text-royal-maroon">{sweet.name}</td>
                                            <td className="py-4 text-sm text-gray-500">{sweet.category}</td>
                                            <td className="py-4 font-bold text-royal-gold text-lg">₹{sweet.price}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest border ${sweet.quantity < 5 ? 'border-red-500 text-red-600 bg-red-50' : 'border-green-500 text-green-600 bg-green-50'}`}>
                                                    {sweet.quantity} LEFT
                                                </span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button onClick={() => handleEdit(sweet)} className="text-royal-maroon hover:text-royal-gold p-2 transition-colors mr-2"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(sweet.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
