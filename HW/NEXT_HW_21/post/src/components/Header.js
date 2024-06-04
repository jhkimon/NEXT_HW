import { Link } from 'react-router-dom';
import logo from '../logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    const randNum = parseInt(Math.random() * storedPosts.length);
    const postId = storedPosts[randNum].id;
    return (
        <>
            <nav>
                <span className="nav-title">
                    <Link to="/">
                        <img className="logo" src={logo}></img>
                    </Link>
                    <h1>
                        <span>블로그</span>: 대문
                    </h1>
                </span>
                <Link to={`/detail/${postId}`}>
                    <FontAwesomeIcon className="shuffle-icon" icon={faShuffle} />
                </Link>
            </nav>
        </>
    );
}
