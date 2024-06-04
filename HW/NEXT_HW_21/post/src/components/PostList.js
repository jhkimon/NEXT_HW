import { Link } from 'react-router-dom';

export function PostList({ posts }) {
    return (
        <div className="posts-list">
            {posts.map((post) => (
                <Link to={`/detail/${post.id}`} style={{ textDecoration: 'none' }}>
                    <div key={post.id} className="post">
                        <h2>{post.title}</h2>
                        <h3>{post.content}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
}
