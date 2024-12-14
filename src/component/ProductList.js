import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products') // Backend API хаягийг оруулна.
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Барааны жагсаалт</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price}₮
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
