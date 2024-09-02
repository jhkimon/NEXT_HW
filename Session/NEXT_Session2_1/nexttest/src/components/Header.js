'use client'; // 클라이언트 컴포넌트

import Link from 'next/link';
import styled from 'styled-components';

export default function Header() {
    return (
        <Container>
            <Link href="/">
                <Logo>Post-app</Logo>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    background-color: white;
    color: #222222;
`;

const Logo = styled.span`
    color: #222222;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
`;
