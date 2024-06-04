import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Main } from './pages/main';
import { Detail } from './pages/detail';
import { Header } from './components/Header';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/detail/:postId" element={<Detail />} />
            </Routes>
        </>
    );
}

export default App;
