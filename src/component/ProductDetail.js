import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // To access the product ID and navigate

const ProductDetail = () => {
    const { id } = useParams(); // Get product ID from the URL
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Track if the user is editing the product
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate(); // To navigate after delete

    // Fetch product details
    const fetchProductDetail = () => {
        axios
            .get(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setName(response.data.name);
                setPrice(response.data.price);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    // Handle the edit button click
    const handleEditClick = () => {
        setIsEditing(true); // Switch to editing mode
    };

    // Handle the update product form submission
    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedProduct = { name, price };

        axios
            .put(`http://localhost:5000/api/products/${id}`, updatedProduct)
            .then(() => {
                alert('Бараа амжилттай засагдлаа!');
                setIsEditing(false); // Exit editing mode after successful update
                fetchProductDetail(); // Refresh product details
            })
            .catch((error) => console.error(error));
    };

    // Handle product deletion
    const handleDelete = () => {
        axios
            .delete(`http://localhost:5000/api/products/${id}`)
            .then(() => {
                alert('Бараа амжилттай устгагдлаа!');
                navigate('/'); // Redirect to the homepage after successful deletion
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            {product ? (
                <div>
                    <h1>{product.name}</h1>
                    <p>Price: {product.price}₮</p>
                    <p>Created At: {new Date(product.createdAt).toLocaleDateString()}</p>

                    {isEditing ? (
                        <form onSubmit={handleUpdate}>
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
                            <button type="submit">Засах</button>
                        </form>
                    ) : (
                        <div>
                            <button onClick={handleEditClick}>Засах</button>
                            <button onClick={handleDelete}>Устгах</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetail;
