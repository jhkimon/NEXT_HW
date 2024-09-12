import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="p-3 text-center mt-auto">
            <h2>&copy; {new Date().getFullYear()} 소프트웨어벤처창업학회 NEXT</h2>
        </footer>
    );
};

export default Footer;
