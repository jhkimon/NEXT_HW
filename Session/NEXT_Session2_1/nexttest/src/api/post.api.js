const API_URL = 'http://localhost:4000/api'; //가상의 api 주소

export async function getPosts() {
    try {
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error;
    }
}

export async function getPost(postId) {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`);
        const data = await response.json();
        return data.post;
    } catch (error) {
        console.error('Failed to fetch post:', error);
        throw error;
    }
}
