import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRotateRight } from '@fortawesome/free-solid-svg-icons'

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 
    ? "0" + minutes.toString() 
    : minutes} :
    ${seconds < 10 
    ? "0" + seconds.toString()
    : seconds}`
}

interface DisplayState {
    time: number;
    timerRunning: boolean;
    label: "Session" | "Break";
}

interface DisplayProps {
    displayState: DisplayState;
    reset: () => void;
    startStop: (displayState: DisplayState) => void;
}

const Display: React.FC<DisplayProps> = ({
    displayState, reset, startStop
}) => {
    return (
        <div id="timer-container">
            <h1 id="timer-label">{ displayState.label }</h1>
            <span id="time-left">
                { formatTime(displayState.time) }
            </span>
            <div className="buttons">
                <button id="start_stop" onClick={() => startStop(displayState)}>
                    <FontAwesomeIcon 
                    icon={(displayState.timerRunning)
                    ? faPause 
                    : faPlay} />
                </button>
                <button id="reset" onClick={reset}>
                    <FontAwesomeIcon icon={faRotateRight} />
                </button>
            </div>
        </div>
    )
}

export default Display