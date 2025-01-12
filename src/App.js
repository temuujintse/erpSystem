import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './component/ProductList';
import ProductForm from './component/ProductForm';
import ProductDetail from './component/ProductDetail';
import Header from './layout/Header';
import Footer from './layout/Footer';




const App = () => {
    return (
        <Router>
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/add-product" element={<ProductForm isEditing={false} />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
            </main>
            <Footer />
        </div>
    </Router>
    );
};

export default App;
