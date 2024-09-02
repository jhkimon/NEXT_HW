'use client';

import styled from 'styled-components';
import PostItem from './PostItem';

const PostList = ({ posts, onDelete }) => {
    return (
        <div>
            {posts.map((post) => (
                <PostWrapper key={post.id}>
                    <PostItem key={post.id} post={post} />
                    <DeleteButton onClick={() => onDelete(post.id)}>삭제</DeleteButton>
                </PostWrapper>
            ))}
        </div>
    );
};

const PostWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    width: 50vw;
`;

const Title = styled.h2`
    font-size: 18px;
    margin: 0;
`;

const Content = styled.p`
    margin: 0;
    font-size: 14px;
    color: #333;
`;

const DeleteButton = styled.button`
    padding: 5px 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: darkred;
    }
`;

export default PostList;
