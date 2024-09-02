'use client'; // 클라이언트 컴포넌트 선언

import Link from 'next/link';
import styled from 'styled-components';
import MainLayout from '../../../components/MainLayout';
import Post from '../../../components/Post';

const posts = [
    { id: 1, title: '첫 번째 게시글', content: '첫 번째 게시글 내용' },
    { id: 2, title: '두 번째 게시글', content: '두 번째 게시글 내용' },
    { id: 3, title: '세 번째 게시글', content: '세 번째 게시글 내용' },
];

export default function PostDetailPage({ params }) {
    const postId = parseInt(params.id, 10); //string 1을 integer 1로 변환
    const post = posts.find((p) => p.id === postId);

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <MainLayout title={`${post.title} 게시글`}>
            <Link href="/">
                <BackToHome>홈으로 돌아가기</BackToHome>
            </Link>
            <Divider />
            <Post post={post} />
        </MainLayout>
    );
}

const BackToHome = styled.div`
    color: #2f5fd1;
    cursor: pointer;
    display: block;
`;

const Divider = styled.div`
    height: 1px;
    border-bottom: 1px solid #eeeeee;
    margin: 24px 0;
`;
