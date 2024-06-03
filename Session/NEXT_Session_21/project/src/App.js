import './App.css';
import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages/home';
import { Hi } from './pages/hi';
import { Bye } from './pages/bye';
import { RockPaperScissors } from './pages/rockPaperScissors';
import { useState } from 'react';

function App() {
    const navigate = useNavigate();

    const backClick = () => {
        navigate(-1);
    };
    const [showGame, setShowGame] = useState(true);

    return (
        <>
            {/* Link */}
            <nav>
                <Link to="/">홈으로 이동</Link>
                <Link to="/hi">hi로 이동</Link>
                <Link to="/bye">bye로 이동</Link>
                <Link to="/rock">가위바위보 하러 가기</Link>
                <button onClick={backClick}>이전 페이지로 이동</button>
            </nav>
            <div>
                <button onClick={() => setShowGame(!showGame)}>{showGame ? '게임종료' : '게임시작'}</button>
            </div>
            {/* 라우팅 */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hi" element={<Hi />} />
                <Route path="/bye" element={<Bye />} />
                {showGame && <Route path="/rock" element={<RockPaperScissors />} />}
            </Routes>
        </>
    );
}

export default App;
