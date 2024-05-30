import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowRightRotate } from '@fortawesome/free-solid-svg-icons';

function Luck() {
    const [mode, setMode] = useState('HOME');
    const [luckToday, setLuckToday] = useState('');

    const lucks = [
        '오늘은 운명같은 사람을 만날 수 있는 날입니다. 마음의 준비를 해두세요.',
        '오늘은 코딩하기에 머리가 돌아가지 않는 날입니다. 조금 쉬세요.',
        '오늘은 누군가 당신에게 야식을 사주는 날입니다. 메뉴를 생각해두세요.',
        '오늘은 모든 일이 술술 풀리는 날입니다. 새로운 도전을 해보세요.',
        '오늘은 조금씩 어긋나는 날입니다. 중요한 일을 나중으로 미뤄보세요.',
        '오늘은 주량이 일시적으로 늘어난 날입니다. 술배틀에 참여해보세요.',
        '오늘은 무엇을 해도 졸린 날입니다. 얼른 집에서 주무세요.',
    ];

    const handleLuck = () => {
        const luckIndex = Math.floor(Math.random() * lucks.length);
        setLuckToday(lucks[luckIndex]);
        setMode('READ');
    };

    return (
        <>
            <div className="luck-container">
                <span className="luck">오늘의 운세</span>
                {mode === 'READ' ? (
                    <>
                        <span className="luck-today">{luckToday}</span>
                        <button onClick={() => setMode('INIT')}>
                            <FontAwesomeIcon className="arrow" icon={faArrowRightRotate} />
                            다시 뽑으러 가기
                        </button>
                    </>
                ) : (
                    <>
                        <span className="luck-today">오늘의 행운을 뽑아보세요!</span>
                        <button onClick={handleLuck}>
                            <FontAwesomeIcon className="arrow" icon={faArrowAltCircleRight} />
                            운세 보기
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

export default Luck;
