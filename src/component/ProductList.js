import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing

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
        <div>
            <h1>Барааны жагсаалт</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - {product.price}₮
                        <Link to={`/product/${product._id}`}>
                            <button>Details</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
