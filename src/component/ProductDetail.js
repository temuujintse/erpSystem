import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                const productData = response.data;
                setProduct(productData);
                setName(productData.name);
                setPrice(productData.price);
                setImage(productData.image);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProductDetail();
    }, [id]);

    const handleEditClick = () => setIsEditing(true);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = { name, price, image };
            await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
            alert('Бараа амжилттай засагдлаа!');
            setIsEditing(false);
            setProduct({ ...product, ...updatedProduct });
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            alert('Бараа амжилттай устгагдлаа!');
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error.response?.data || error.message);
            alert('Устгах явцад алдаа гарлаа.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            {product ? (
                <>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40  object-contain rounded mb-4"
                    />
                    <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">
                        <span className="font-medium">Үнэ:</span> {product.price}₮
                    </p>
                    <p className="text-gray-500 mb-6">
                        <span className="font-medium">Үүсгэсэн огноо:</span> {new Date(product.createdAt).toLocaleDateString()}
                    </p>

                    {isEditing ? (
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <label className="block">
                                <span className="block text-gray-700 font-medium">Нэр:</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-gray-700 font-medium">Үнэ:</span>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-gray-700 font-medium">Зураг URL:</span>
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Засах
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Болих
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex gap-4">
                            <button
                                onClick={handleEditClick}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Засах
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Устгах
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-500">Алдаа...</p>
            )}
        </div>
    );
};

export default ProductDetail;
