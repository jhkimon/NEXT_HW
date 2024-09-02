//route.js는 page.js와 동일하게 파일명 자체를 route.js로 설정해야 Next.js가 이게 testApi라고 인식합니다!

let posts = [
    { id: 1, title: '첫 번째 게시글', content: '첫 번째 게시글 내용' },
    { id: 2, title: '두 번째 게시글', content: '두 번째 게시글 내용' },
    { id: 3, title: '세 번째 게시글', content: '세 번째 게시글 내용' },
]; //실제 백엔드에서는 이것 대신에 DB에서 가져오겠죠??

export async function GET(request) {
    return new Response(JSON.stringify(posts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request) {
    const newPost = await request.json();
    newPost.id = posts.length + 1;
    posts.push(newPost);

    return new Response(JSON.stringify(newPost), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PUT(request) {
    const updatedPost = await request.json();
    const index = posts.findIndex((post) => post.id === updatedPost.id);

    if (index === -1) {
        return new Response('Post not found', { status: 404 });
    }

    posts[index] = updatedPost;
    return new Response(JSON.stringify(updatedPost), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(request) {
    const { id } = await request.json();
    posts = posts.filter((post) => post.id !== id);

    return new Response(JSON.stringify({ message: 'Post deleted' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
