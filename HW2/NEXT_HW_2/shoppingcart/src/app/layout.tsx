import '../styles/globals.css';
import React, { ReactNode } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../../fontawesome';

export const metadata = {
    title: 'My Website',
    description: 'A simple example of Next.js app using App Router and TypeScript.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 p-4 bg-gray-100">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
