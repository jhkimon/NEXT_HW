import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

function CurrentDate() {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dayOfWeek = daysOfWeek[today.getDay()];

    return (
        <div className="date-container">
            <span className="date">날짜</span>
            <span className="today-date">
                {year} 년 {month} 월 {day} 일 ({dayOfWeek})
            </span>
            <span className="weather">날씨</span>
            <span className="today-weather">
                <FontAwesomeIcon icon={faSun} />
                <FontAwesomeIcon icon={faCloud} />
                <FontAwesomeIcon icon={faCloudRain} />
                <FontAwesomeIcon icon={faSnowflake} />
            </span>
        </div>
    );
}

export default CurrentDate;
