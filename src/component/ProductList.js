import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios
            .get('http://localhost:5000/api/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Барааны жагсаалт</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
        <li key={product._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
               <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-contain rounded mb-4" 
                        />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">Үнэ: {product.price}₮</p>
            <Link to={`/product/${product._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Дэлгэрэнгүй
                </button>
            </Link>
        </li>
    ))}
</ul>

        </div>
    );
};

export default ProductList;
