import { useEffect, useState, useRef } from 'react';

const choiceOptions = ['가위', '바위', '보'];

export function RockPaperScissors() {
    const [choices, setChoices] = useState([null, null]);
    const [result, setResult] = useState(null);
    const [record, setRecord] = useState({ myWin: 0, enemyWin: 0, draw: 0 });
    const resultRef = useRef(null);

    const onButtonClick = () => {
        const myChoice = choiceOptions[Math.floor(Math.random() * 3)];
        const enemyChoice = choiceOptions[Math.floor(Math.random() * 3)];
        setChoices([myChoice, enemyChoice]);
    };

    useEffect(() => {
        const [myChoice, enemyChoice] = choices;
        if (myChoice && enemyChoice) {
            if (myChoice === enemyChoice) {
                setResult('Draw');
                setRecord((prevRecord) => {
                    const newRecord = { ...prevRecord, draw: prevRecord.draw + 1 };
                    localStorage.setItem('draw', newRecord.draw);
                    return newRecord;
                });
            } else if (
                (myChoice === '가위' && enemyChoice === '보') ||
                (myChoice === '바위' && enemyChoice === '가위') ||
                (myChoice === '보' && enemyChoice === '바위')
            ) {
                setResult('You Win');
                setRecord((prevRecord) => {
                    const newRecord = { ...prevRecord, myWin: prevRecord.myWin + 1 };
                    localStorage.setItem('myWin', newRecord.myWin);
                    return newRecord;
                });
            } else {
                setResult('You Lose');
                setRecord((prevRecord) => {
                    const newRecord = { ...prevRecord, enemyWin: prevRecord.enemyWin + 1 };
                    localStorage.setItem('enemyWin', newRecord.enemyWin);
                    return newRecord;
                });
            }
        }
    }, [choices]);

    useEffect(() => {
        const myWin = Number(localStorage.getItem('myWin')) || 0;
        const enemyWin = Number(localStorage.getItem('enemyWin')) || 0;
        const draw = Number(localStorage.getItem('draw')) || 0;
        setRecord({ myWin, enemyWin, draw });

        return () => {
            localStorage.setItem('myWin', 0);
            localStorage.setItem('enemyWin', 0);
            localStorage.setItem('draw', 0);
        };
    }, []);

    useEffect(() => {
        if (result && resultRef.current) {
            resultRef.current.innerHTML = `${result}`;
            resultRef.current.style.color = 'red';
            resultRef.current.style.fontWeight = '700';
        }
    }, [result]);

    return (
        <>
            <h2>가위바위보</h2>
            <button onClick={onButtonClick}>내기</button>
            <div>My Choice: {choices[0]}</div>
            <div>Enemy's Choice: {choices[1]}</div>
            <div ref={resultRef}>가위바위보를 해보세요.</div>
            <h3>My Record</h3>
            <div>My Wins: {record.myWin}</div>
            <div>Enemy Wins: {record.enemyWin}</div>
            <div>Draws: {record.draw}</div>
        </>
    );
}
