'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/MainLayout';
import PostList from '../../components/PostList';

export default function CrudPage() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const fetchPosts = async () => {
        const res = await fetch('/testApi');
        const data = await res.json();
        setPosts(data);
    };

    const handleAddPost = async () => {
        const res = await fetch('/testApi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost),
        });
        if (res.ok) {
            const addedPost = await res.json();
            setPosts((prevPosts) => [...prevPosts, addedPost]);
            setNewPost({ title: '', content: '' });
        }
    };

    const handleDeletePost = async (id) => {
        const res = await fetch('/testApi', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <MainLayout title="CRUD 페이지">
            <FormContainer>
                <Input
                    type="text"
                    placeholder="제목"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <TextArea
                    placeholder="내용"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <Button onClick={handleAddPost}>게시글 추가</Button>
            </FormContainer>
            <PostList posts={posts} onDelete={handleDeletePost} />
        </MainLayout>
    );
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    max-width: 500px;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    height: 100px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #005bb5;
    }
`;

const DeleteButton = styled(Button)`
    background-color: red;
    margin-left: 10px;

    &:hover {
        background-color: darkred;
    }
`;
