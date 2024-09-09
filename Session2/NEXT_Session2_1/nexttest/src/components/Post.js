'use client'; // 클라이언트 컴포넌트

import styled from 'styled-components';

export default function Post({ post }) {
    return (
        <Container>
            <Header>
                <Title>{post.title}</Title>
                <Content>{post.content}</Content>
            </Header>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const Header = styled.div`
    margin-bottom: 12px;
`;

const Title = styled.h1`
    color: #222222;
    font-size: 18px;
    font-weight: bold;
`;

const Content = styled.p`
    font-size: 14px;
    color: #222222;
`;
