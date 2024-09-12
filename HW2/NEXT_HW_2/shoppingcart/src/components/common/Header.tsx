import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 p-5 text-center">
            <nav>
                <ul className="flex justify-center gap-5 list-none">
                    <li>
                        <Link href="/" className="text-white hover:text-gray-200 flex items-center">
                            <FontAwesomeIcon icon={faHome} className="mr-2" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-white hover:text-gray-200 flex items-center">
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
