import '../styles/globals.css';
import React, { ReactNode } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../../fontawesome';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="overflow-auto">
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
