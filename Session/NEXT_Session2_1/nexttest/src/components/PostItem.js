'use client'; //클라이언트 컴포넌트

import Link from 'next/link';
import styled from 'styled-components';

export default function PostItem({ post }) {
    return (
        <StyledLink href={`/posts/${post.id}`} passHref>
            <Container>
                <Title>{post.title}</Title>
                <Content>{post.content}</Content>
            </Container>
        </StyledLink>
    );
}

//Styled-components를 사용하여 기존 Link 컴포넌트를 스타일링
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Container = styled.div`
    width: 20rem;
    padding: 16px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: #f5f5f5;
    }
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 18px;
    margin: 0 0 8px 0;
    color: #333;
    height: 1rem;
`;

const Content = styled.p`
    font-size: 14px;
    margin: 0;
    color: #666;
    height: 1rem;
`;
