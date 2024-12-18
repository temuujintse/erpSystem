import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    // Fetch product details
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                const productData = response.data;
                setProduct(productData);
                setName(productData.name);
                setPrice(productData.price);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProductDetail();
    }, [id]);

    // Handle edit button click
    const handleEditClick = () => {
        setIsEditing(true); // Enable editing mode
    };

    // Handle update form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = { name, price };
            await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
            alert('Бараа амжилттай засагдлаа!');
            setIsEditing(false); // Exit editing mode
            setProduct({ ...product, ...updatedProduct }); // Update local product state
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = async () => {
        try {
            console.log('Sending DELETE request for ID:', id);
    
            const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
            console.log('DELETE response:', response.data);
    
            alert('Бараа амжилттай устгагдлаа!');
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error.response?.data || error.message);
            alert('Устгах явцад алдаа гарлаа.');
        }
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
                            <button type="button" onClick={() => setIsEditing(false)}>
                                Болих
                            </button>
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
