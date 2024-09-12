import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 p-5 text-center text-white mt-auto">
            <p>&copy; {new Date().getFullYear()} My Website. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
