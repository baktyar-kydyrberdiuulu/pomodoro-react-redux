import {
  SESSION_INCREAMENT,
  SESSION_DECREAMENT,
  BREAK_INCREAMENT,
  BREAK_DECREAMENT,
  RESET
} from '../actions'

const local = JSON.parse(localStorage.getItem("Pomodoro"))

const initialState = {
  break: 5,
  session: 1,
}



export const rootReducer = (state = local ? local : initialState, action) => {
  switch (action.type) {
    case BREAK_DECREAMENT:
      if (state.break > 1)
        return { ...state, break: state.break - 1 }
      else return state;
    case BREAK_INCREAMENT:
      if (state.break < 60) return { ...state, break: state.break + 1 };
      else return state;
    case SESSION_DECREAMENT:
      if (state.session > 1) return { ...state, session: state.session - 1 };
      else return state;
    case SESSION_INCREAMENT:
      if (state.session < 60) return { ...state, session: state.session + 1 };
      else return state;
    case RESET:
      return { ...state, break: state.break, session: state.session }
    default:
      return state
  }
}