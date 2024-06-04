import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        generateRandomPostId();
    }, []);

    const generateRandomPostId = () => {
        if (storedPosts && storedPosts.length > 0) {
            const randNum = Math.floor(Math.random() * storedPosts.length);
            setPostId(storedPosts[randNum].id);
        }
    };

    return (
        <>
            <nav>
                <span className="nav-title">
                    <Link to="/">
                        <img className="logo" src={logo} alt="logo" />
                    </Link>
                    <h1>마이위키</h1>
                </span>
                <Link to={`/detail/${postId}`} onClick={generateRandomPostId}>
                    <FontAwesomeIcon className="shuffle-icon" icon={faShuffle} />
                </Link>
            </nav>
        </>
    );
}
