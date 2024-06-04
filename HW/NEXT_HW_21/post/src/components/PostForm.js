import { useState } from 'react';

export function PostForm({ addPost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const images = [image1, image2, image3].filter((image) => image !== '');
        addPost({
            id: Math.floor(Math.random() * 10000),
            title: title,
            content: content,
            images: images,
        });
        setTitle('');
        setContent('');
        setImage1('');
        setImage2('');
        setImage3('');
    };

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <h2>
                <span>사진 3개</span>로 원하는 내용을 자유롭게 표현해주세요.
            </h2>
            <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input
                type="text"
                placeholder="설명"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <div className="img-box">
                <span>사진 1:</span>
                <input type="file" onChange={(e) => handleImageChange(e, setImage1)} />
            </div>
            <div className="img-box">
                <span>사진 2:</span>
                <input type="file" onChange={(e) => handleImageChange(e, setImage2)} />
            </div>
            <div className="img-box">
                <span>사진 3:</span>
                <input type="file" onChange={(e) => handleImageChange(e, setImage3)} />
            </div>
            <button type="submit">등록하기!</button>
        </form>
    );
}
