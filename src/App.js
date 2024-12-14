import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar'
import ProductList from './component/ProductList';
import ProductForm from './component/ProductForm';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/add-product" element={<ProductForm />} />
            </Routes>
        </Router>
    );
};

export default App;
