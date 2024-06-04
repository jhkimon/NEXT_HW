import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

export function PostDetail() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            const posts = JSON.parse(storedPosts);
            const foundPost = posts.find((post) => post.id === parseInt(postId));
            if (foundPost) {
                setPost(foundPost);
            }
        }
    }, [postId]);

    if (!post) {
        return <div>존재하지 않는 게시물입니다.</div>;
    }

    return (
        <div className="post-detail">
            <h1>{post.title}</h1>
            <div className="post-images">
                {post.images.map((image, index) => (
                    <img src={image} alt={`Post image ${index}`} width="50%" />
                ))}
            </div>
            <div className="table-content">
                <h2>개요</h2>
            </div>
            <div className="post-content">{post.content}</div>
        </div>
    );
}
