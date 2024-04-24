import {useEffect, useState} from "react";

const useTimer = ({minutes, seconds=0, onTimerOut = ()=>{}, autoRefresh = false}: {minutes: number, seconds?: number, onTimerOut?: ()=>void, autoRefresh?: boolean}) => {
    const [maxTime] = useState(minutes * 60 * 1000 + seconds *1000); // 5 хвилин у мілісекундах
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [timeLeft, setTimeLeft] = useState(maxTime);

    useEffect(() => {
        const timerID = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;
            const remainingTime = Math.max(maxTime - elapsedTime, 0);
            setTimeLeft(remainingTime);

            if (remainingTime === 0) {
                onTimerOut();
                if(autoRefresh){
                    setStartTime(new Date().getTime());
                    return;
                }
                clearInterval(timerID);
            }
        }, 1000);

        return () => clearInterval(timerID);
    }, [startTime, maxTime]);
    const formatTime = (time) => {
        const minutes = Math.floor(time / (1000 * 60));
        const seconds = Math.floor((time / 1000) % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const resetTimer = (newTime?:number) => {
        setTimeLeft(newTime || maxTime);
        setStartTime(new Date().getTime())

    }

    return {
        time: formatTime(timeLeft),
        resetTimer
    }
};

export default useTimer;
