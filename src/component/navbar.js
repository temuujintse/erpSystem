import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Нүүр</Link></li>
                <li><Link to="/add-product">Бараа нэмэх</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
