import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function Header({ onChangeMode, children }) {
    return <h1 onClick={() => onChangeMode()}>{children}</h1>;
}

function Nav({ onChangeMode, list }) {
    return (
        <nav>
            <ol>
                {list.map((item) => (
                    <li key={item.id} onClick={() => onChangeMode(item.id)}>
                        <div>{item.title}</div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}

function Article({ title, content }) {
    return (
        <article>
            <h2>{title}</h2>
            <p>{content}</p>
        </article>
    );
}

function Create({ onCreate }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleClick = () => {
        onCreate(title, content);
        setTitle('');
        setContent('');
    };
    return (
        <div>
            <p>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </p>
            <p>
                <textarea placeholder="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </p>
            <p>
                <button type="button" onClick={handleClick}>
                    글 생성
                </button>
            </p>
        </div>
    );
}

function Update({ onUpdate, item }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleClick = () => {
        onUpdate(title, content);
    };
    return (
        <div>
            <p>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </p>
            <p>
                <textarea placeholder="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </p>
            <p>
                <button type="button" onClick={handleClick}>
                    수정
                </button>
            </p>
        </div>
    );
}

function App() {
    const [mode, setMode] = useState('HOME');
    const [id, setId] = useState(-1);

    const [list, setList] = useState([
        { id: 0, title: '이름', content: '김정현' },
        { id: 1, title: '생년월일', content: '1999.09.22' },
        { id: 2, title: '학력', content: '고려대학교 재학중' },
    ]);

    let articleTitle;
    let articleContent;

    if (mode == 'HOME') {
        articleTitle = '인사';
        articleContent = '안녕하세요. 김정현입니다.';
    } else if (mode == 'READ') {
        articleTitle = list[id].title;
        articleContent = list[id].content;
    }

    const handleCreate = (title, content) => {
        setList([...list, { title, content, id: list.length }]);
        setMode('HOME');
    };

    const handleUpdate = (title, content) => {
        setList(list.map((item) => (item.id === id ? { ...item, title, content } : item)));
        setMode('READ');
    };

    const handleDelete = () => {
        setList(list.filter((item) => item.id !== id));
        setMode('HOME');
        setId(-1);
    };

    return (
        <>
            <Header onChangeMode={() => setMode('HOME')}>내 이력서</Header>
            <Nav
                list={list}
                onChangeMode={(_id) => {
                    setMode('READ');
                    setId(_id);
                }}
            ></Nav>
            <Article title={articleTitle} content={articleContent}></Article>
            {mode === 'CREATE' && <Create onCreate={handleCreate} />}
            {mode === 'HOME' && <button onClick={() => setMode('CREATE')}>글 생성</button>}
            {mode === 'READ' && (
                <>
                    <button onClick={() => setMode('UPDATE')}>글 수정</button>
                    <button onClick={handleDelete}>글 삭제</button>
                </>
            )}
            {mode === 'UPDATE' && <Update onUpdate={handleUpdate} item={list.find((item) => item.id === id)} />}
        </>
    );
}

export default App;
