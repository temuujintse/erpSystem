import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ isEditing, productData, onProductAdded }) => {
    const [name, setName] = useState(isEditing ? productData?.name : '');
    const [price, setPrice] = useState(isEditing ? productData?.price : '');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { name, price };

        if (isEditing) {
            axios.put(`/api/products/${productData.id}`, product)
                .then(() => {
                    alert('Бараа амжилттай засагдлаа!');
                    if (onProductAdded) onProductAdded();
                })
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:5000/api/products', product)
                .then(() => {
                    alert('Шинэ бараа амжилттай нэмэгдлээ!');
                    if (onProductAdded) onProductAdded();
                    navigate('/');
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Бараа засах' : 'Бараа нэмэх'}</h1>
            <label className="block mb-4">
                <span className="block text-gray-700 font-medium mb-2">Нэр:</span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </label>
            <label className="block mb-4">
                <span className="block text-gray-700 font-medium mb-2">Үнэ:</span>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </label>
            <div className="flex justify-end gap-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {isEditing ? 'Засах' : 'Нэмэх'}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        Болих
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductForm;
