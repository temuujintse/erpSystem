import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterUnit, setFilterUnit] = useState('all'); // Default filter

    // Fetch products from the API
    const fetchProducts = () => {
        axios
            .get('http://localhost:5000/api/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter products based on search term and selected unit
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUnit = filterUnit === 'all' || product.unit === filterUnit;
        return matchesSearch && matchesUnit;
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Барааны жагсаалт</h1>

            {/* Filter Inputs */}
            <div className="flex justify-between items-center mb-6">
                {/* Search Input */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Хайх..."
                    className="p-2 border rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Unit Filter */}
                <select
                    value={filterUnit}
                    onChange={(e) => setFilterUnit(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">Бүгд</option>
                    <option value="Ширхэг">Ширхэг</option>
                    <option value="Килограм">Килограм</option>
                    <option value="Литер">Литер</option>
                    <option value="Багц">Багц</option>
                </select>
            </div>

            {/* Product List */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <li
                        key={product._id}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-contain rounded mb-4"
                        />
                        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-4">Үнэ: {product.price}₮</p>
                        <p className="text-gray-500 mb-4">Нэгж: {product.unit}</p>
                        <Link to={`/product/${product._id}`}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                Дэлгэрэнгүй
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>

            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-6">Бараа олдсонгүй.</p>
            )}
        </div>
    );
};

export default ProductList;
