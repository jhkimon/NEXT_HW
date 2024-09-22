import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    return (
        <header className="bg-slate-600 p-3 pr-5 text-center">
            <nav>
                <ul className="flex flex-row-reverse gap-5 list-none">
                    <li>
                        <Link href="/" className="text-white hover:text-gray-200 flex items-center">
                            <FontAwesomeIcon icon={faHome} className="mr-2" />홈
                        </Link>
                    </li>
                    <li>
                        <Link href="/cart" className="text-white hover:text-gray-200 flex items-center">
                            <FontAwesomeIcon icon={faShoppingBasket} className="mr-2" />
                            장바구니
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
