import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4">
            <nav className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold">Бараа бүртгэл</h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link
                            to="/"
                            className="hover:text-orange-400 transition-colors"
                        >
                            Нүүр
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/add-product"
                            className="hover:text-orange-400 transition-colors"
                        >
                            Бараа нэмэх
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
