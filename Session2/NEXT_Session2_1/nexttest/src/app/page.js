// import { getPosts } from '../api/post.api';
import MainLayout from '../components/MainLayout';
import PostList from '../components/PostList';

export default async function Home() {
    // const posts = await getPosts();
    const posts = [
        { id: 1, title: '첫 번째 게시글' },
        { id: 2, title: '두 번째 게시글' },
        { id: 3, title: '세 번째 게시글' },
    ];
    return (
        <MainLayout title="홈">
            <PostList posts={posts} />
        </MainLayout>
    );
}
