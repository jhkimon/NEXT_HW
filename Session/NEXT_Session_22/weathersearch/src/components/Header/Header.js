import React from 'react';
import { Link } from 'react-router-dom';
import './Header.module.css';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">메인 화면</Link>
                    </li>
                    <li>
                        <Link to="/weather">날씨 검색</Link>
                    </li>
                    <li>
                        <Link to="/about">만든 사람</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
