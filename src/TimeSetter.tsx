import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

interface timeSetterProps {
    type: 'break' | 'session';
    setTime: (time: number) => void;
    time: number;
}

const TimeSetter: React.FC<timeSetterProps> = ({
    type, setTime, time
}) => {
    return(
    <div id={`${type}-container`}>
        <button 
        id={`${type}-decrement`} 
        onClick={() => (time > 60) 
            ? setTime(time - 60) 
            : null}>
            <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <span id={`${type}-length`}>{ time / 60 }</span>
        <button 
        id={`${type}-increment`} 
        onClick={() => (time < 60*60 
            ? setTime(time + 60)
            : null) }><FontAwesomeIcon icon={faArrowUp} />
        </button>
    </div>
)}

export default TimeSetter;