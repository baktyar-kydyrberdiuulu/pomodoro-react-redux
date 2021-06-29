import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  increamentBreak,
  decreamentBreak,
  increamentSession,
  decreamentSession
}
  from '../../store/actions/index'

import { CardInfo } from '../CardInfo'
import "./Settings.scss"

export const Settings = ({ active }) => {

  const dispatch = useDispatch()
  const options = useSelector((state) => { return state })
  const modal = useRef(null)

  const setModal = () => {
    let currentModal = modal.current;
    let currentAttribute = currentModal.getAttribute("hidden");

    if (currentAttribute === "true" || currentModal.hasAttribute("hidden")) {
      currentModal.removeAttribute("hidden");
    } else {
      currentModal.setAttribute("hidden", true);
    }
  };


  const increment = (type) => {
    if (!active) {
      switch (type) {
        case "session":
          dispatch(increamentSession());
          break;
        case "break":
          dispatch(increamentBreak());
          break;
        default:
          break;
      }
    }
  }

  const decrement = (type) => {
    if (!active) {
      switch (type) {
        case "session":
          dispatch(decreamentSession())
          break;
        case "break":
          dispatch(decreamentBreak())
          break;
        default:
          break;
      }
    }
  }
  return (
    <div>
      {/* setting */}
      <div id="sidebar">
        <div className="item">
          <button onClick={() => setModal()}>
            <i className="fa fa-cog"></i>
          </button>
        </div>
      </div>
      <div id="wrapper-setting"
        className='scale-up-center'
        align="center"
        hidden={true}
        ref={modal}>
        <div id="session-wrapper">
          <label id="session-label">
            <span role="img" aria-label='tomato'>🍅</span>
            Session Length
          </label>
          <button
            onClick={() => increment("session")}
            className="action-button"
            id="session-increament"
          >+</button>
          {/* {options.session} */}
          <button
            onClick={() => decrement("session")}
            className="action-button"
            id="session-decrement"
          >-</button>

        </div>
        {/* Break  */}
        <div>
          <label id="break-label">
            <span role="img" aria-label="tomato">☕</span>
            Break Lenght
          </label>
          <button onClick={() => increment("break")}
            id="break-increament"
            className="action-button"
          >
            +
          </button>
          {/* {options.break} */}
          <button onClick={() => decrement("break")}
            id="break-decrement"
            className="action-button"
          >-</button>
        </div>
        <div id="infos-container">
          <CardInfo name="session"
            value={options.session}
            id="session-length" />
          <CardInfo name="Break" value={options.break}
            id="break-length" />

        </div>
      </div>
    </div>
  )
}
