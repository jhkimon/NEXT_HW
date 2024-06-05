import './App.css';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { DetailPage } from './pages/DetailPage';
import { Header } from './components/Header';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/detail/:postId" element={<DetailPage />} />
            </Routes>
        </>
    );
}

export default App;
