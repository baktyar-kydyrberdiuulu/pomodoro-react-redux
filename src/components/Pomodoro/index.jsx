import React, { useState, useEffect, } from 'react'
import { Circle } from "rc-progress";
import { useSelector, useDispatch } from 'react-redux';
import { resetBoth } from '../../store/actions/index';

import './styles.scss'
import { Settings } from '../Settings';
import rington from '../../assets/audios/ring.mp3'



export const Pomodoro = () => {

  const state = useSelector(state => state)

  useEffect(() => {
    localStorage.setItem("Pomodoro", JSON.stringify(state))
  }, [state])

  const [bell] = useState(new Audio(rington))

  const dispatch = useDispatch("");
  const options = useSelector((state) => {
    return state
  });

  // 
  const [minutes, setMinutes] = useState(0);  // Minute
  const [range, setRange] = useState(0);      // Circle range // диапозон
  const [seconds, setSeconds] = useState(0);  // Second
  const [active, setActive] = useState(false); // active 
  const [unitPercent, setUnitPercent] = useState(0); // circle = circle + range
  const [currentTimer, setCurrentTimer] = useState("Pomodoro Uhr für sich")
  const [formatedTime, setFormatedTime] = useState("")

  const formatTime = (minutes, seconds) => {
    let output = `${minutes < 10 ? `0${minutes}` : minutes} :${seconds < 10 ? `0${seconds}` : seconds
      } `
    return output;
  }

  const resetRange = (parameter) => {
    setRange(0);
    setUnitPercent(100 / (parameter * 60))
  }

  const resetTimer = () => {

    setCurrentTimer("SESION")
    setActive(false);
    dispatch(resetBoth())

    setFormatedTime(formatTime(options.session, 0))
  }

  useEffect(() => {

    let { session } = options;

    setMinutes(session)
    setSeconds(0)
    setFormatedTime(formatTime(minutes, seconds));
    setActive(false);
    resetRange(session)
  }, [options])

  useEffect(() => {

    let sessionTime = options.session;
    let breakTime = options.break;

    setFormatedTime(formatTime(minutes, seconds));

    const adjustTimer = (interval) => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1)
      } else {
        if (minutes === 0) {
          clearInterval(interval)
        } else {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59)
        }
      }
    };

    const timerRunning = () => {
      if (active) {
        if (seconds === 0 && minutes === 0) {
          bell.play()

          if (currentTimer === 'Session') {
            setCurrentTimer('Session');
            setMinutes(sessionTime);
            resetRange(sessionTime);
          } else {
            setCurrentTimer('Break');
            setMinutes(breakTime)
            resetRange(breakTime)
          }
        }

        adjustTimer(interval);
        setRange((range) => range + unitPercent
        );
      }
    }

    const interval = setInterval(() => {
      timerRunning();
    }, 1000)
    return () => clearInterval(interval)
  }, [active, currentTimer, minutes, options, seconds,
    unitPercent
  ]);

  return (
    <div id="timer-wrapper">
      <div align="center">
        {/* current timer */}
        <div id="timer-lable">
          <strong style={{ fontSize: '30px', color: 'blue' }}>{currentTimer}</strong>
        </div>
        {/* formatedTime */}
        <div id="sub-label">
          Haben Sie<strong style={{ margin: '20px', color: "red" }}>{formatedTime}</strong>bleiben !!!
        </div>
        <div id="timer">
          <Circle
            percent={range}
            strokeWidth="10"
            trailWidth="10"
            trailColor="#54C8E0"
            strokeColor="#FFFFFF"
            id="progress"
          />
          <div id="actions">
            <button id="start_stop" onClick={() => setActive((active) => !active)}>
              {active ? (<i className="fa fa-stop" />) : (
                <i className="fa fa-play" />)}
            </button>
            <button id="reset" onClick={() => {
              resetTimer()
            }}>
              <i className="fa fa-refresh" />
            </button>
          </div>
        </div>

      </div>
      {/* audio  */}
      {/* settings */}
      <Settings active={active} />
    </div>
  )
}
