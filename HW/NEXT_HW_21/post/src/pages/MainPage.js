import { useState, useEffect } from 'react';
import { PostForm } from '../components/PostForm';
import { PostList } from '../components/PostList';
import { Banner } from '../components/Banner';

export function MainPage() {
    const [posts, setPosts] = useState([]);

    // LocalStorage
    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        }
    }, []);

    // CREATE: POST
    const addPost = (post) => {
        const updatedPosts = [...posts, post];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <>
            <div className="wrapper">
                <Banner />
                <PostForm addPost={addPost} />
                <PostList posts={posts} />
            </div>
        </>
    );
}
