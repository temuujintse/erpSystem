import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ isEditing, productData }) => {
    const [name, setName] = useState(isEditing ? productData.name : '');
    const [price, setPrice] = useState(isEditing ? productData.price : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { name, price };

        if (isEditing) {
            axios.put(`/api/products/${productData.id}`, product)
                .then(() => alert('Бараа амжилттай засагдлаа!'))
                .catch(error => console.error(error));
        } else {
            axios.post('/api/products', product)
                .then(() => alert('Шинэ бараа амжилттай нэмэгдлээ!'))
                .catch(error => console.error(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Нэр:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Үнэ:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <button type="submit">{isEditing ? 'Засах' : 'Нэмэх'}</button>
        </form>
    );
};

export default ProductForm;
