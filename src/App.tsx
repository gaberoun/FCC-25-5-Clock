import { useEffect, useState } from 'react'
import './App.css'
import './TimeSetter'
import TimeSetter from './TimeSetter';
import Display from './Display';
import AlarmSound from './assets/alarm-clock-short-6402.mp3'

function App() {
  const [sessionTime, setSessionTime] = useState(25*60);
  const [breakTime, setBreakTime] = useState(5*60);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timerRunning: false,
    label: 'Session'
  });

  interface DisplayState {
    time: number;
    timerRunning: boolean;
    label: "Session" | "Break";
  }

  const reset = () => {
    setSessionTime(25*60);
    setBreakTime(5*60);
    setDisplayState({
      time: 25 * 60,
      timerRunning: false,
      label: 'Session'
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  }

  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  }

  const changeSessionTime = (time: number) => {
    if (displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timerRunning: false,
      label: "Session",
    });
  }

  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning) return;
    setBreakTime(time);
  }

  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  }

  useEffect(() => {
    let timerID: number;
    if (!displayState.timerRunning) { return; }
    else {
      timerID = window.setInterval(decrementDisplay, 1000)
    }
    return () => {
      window.clearInterval(timerID);
    }
  }, [displayState.timerRunning]);

  useEffect(() => {
    if (displayState.time == 0) {
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.currentTime = 2;
      audio.play();
      setDisplayState((prev) => ({
        ...prev,
        time: prev.label == 'Session' ? breakTime : sessionTime,
        label: prev.label == 'Session' ? 'Break' : 'Session',
      }))
    }
  }, [displayState, breakTime, sessionTime]);

  return (
    <>
    <h1>25 + 5 Clock</h1>
    <div id="container">
      <div id="timeSetter-container">
        <div>
        <h2 id="session-label">Session Length</h2>
        <TimeSetter 
          type='session'
          setTime={changeSessionTime}
          time={sessionTime}
        />
        </div>
        <div>
        <h2 id="break-label">Break Length</h2>
        <TimeSetter 
          type='break'
          setTime={changeBreakTime}
          time={breakTime}
        />
        </div>
      </div>
      <Display 
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <audio id="beep" src={AlarmSound} />
    </div>
    </>
  )
}

export default App
