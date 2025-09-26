'use client';
import { useState, useEffect, FormEvent } from 'react';

// Define the Product type
interface Product {
    _id: string;
    name: string;
    sku: string;
    category: string;
    purchasePrice: number;
    sellingPrice: number;
    stockQuantity: number;
}

const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ProductModal = ({ isOpen, onClose, onSave, product }: { isOpen: boolean, onClose: () => void, onSave: (product: Omit<Product, '_id'>) => void, product: Product | null }) => {
    const [formData, setFormData] = useState({
        name: '', sku: '', category: 'Dairy', purchasePrice: 0, sellingPrice: 0, stockQuantity: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (product) setFormData({ ...product });
        else setFormData({ name: '', sku: '', category: 'Dairy', purchasePrice: 0, sellingPrice: 0, stockQuantity: 0 });
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await onSave(formData);
        setIsLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isNumber = type === 'number';
        setFormData(prev => ({ ...prev, [name]: isNumber ? parseFloat(value) || 0 : value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">{product ? 'Edit Product' : 'Add New Product'}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div><label className="block text-sm font-medium text-gray-700">Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required /></div>
                        <div><label className="block text-sm font-medium text-gray-700">SKU</label><input type="text" name="sku" value={formData.sku} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Category</label><select name="category" value={formData.category} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"><option>Dairy</option><option>Produce</option><option>Bakery</option><option>Pantry</option></select></div>
                        <div><label className="block text-sm font-medium text-gray-700">Purchase Price ($)</label><input type="number" step="0.01" name="purchasePrice" value={formData.purchasePrice} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Selling Price ($)</label><input type="number" step="0.01" name="sellingPrice" value={formData.sellingPrice} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Stock Quantity</label><input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" required /></div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="bg-white px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100">Cancel</button>
                        <button type="submit" disabled={isLoading} className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center disabled:bg-purple-400 hover:bg-purple-700">
                            {isLoading && <Spinner />}
                            {isLoading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        if (res.ok) setProducts(await res.json());
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleSave = async (productData: Omit<Product, '_id'>) => {
        const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
        const method = editingProduct ? 'PUT' : 'POST';

        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(productData) });

        if (res.ok) {
            setIsModalOpen(false);
            setEditingProduct(null);
            fetchProducts();
        } else {
            alert("Failed to save product.");
        }
    };

    const openAddModal = () => { setEditingProduct(null); setIsModalOpen(true); };
    const openEditModal = (product: Product) => { setEditingProduct(product); setIsModalOpen(true); };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800">Products</h1>
                <button onClick={openAddModal} className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition-colors duration-200">Add Product</button>
            </div>

            <div className="rounded-lg border bg-white shadow-sm">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b bg-gray-50">
                            <tr className="border-b transition-colors">
                                <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Name</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">SKU</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Price</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Stock</th>
                                <th className="h-12 px-6 align-middle font-medium text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {products.length > 0 ? products.map(product => (
                                <tr key={product._id} className="border-b transition-colors hover:bg-gray-50/50">
                                    <td className="p-6 align-middle font-medium text-gray-800">{product.name}</td>
                                    <td className="p-6 align-middle text-gray-600">{product.sku}</td>
                                    <td className="p-6 align-middle text-gray-600">${product.sellingPrice.toFixed(2)}</td>
                                    <td className="p-6 align-middle text-gray-600">{product.stockQuantity}</td>
                                    <td className="p-6 align-middle text-right">
                                        <button onClick={() => openEditModal(product)} className="text-purple-600 hover:underline font-semibold">Edit</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">No products found. Add one to get started!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} product={editingProduct} />
        </div>
    );
}