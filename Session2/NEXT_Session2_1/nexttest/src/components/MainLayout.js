'use client'; // 클라이언트 컴포넌트

import styled from 'styled-components';
import Header from './Header';

export default function MainLayout({ title, children }) {
    return (
        <Container>
            <HeaderWrapper>
                <Header />
            </HeaderWrapper>
            <Main>{children}</Main>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    background-color: white;
`;

const HeaderWrapper = styled.header`
    width: 100%;
    padding: 30px 24px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 12px;
`;

const Main = styled.main`
    width: 100%;
    padding: 24px;
`;
