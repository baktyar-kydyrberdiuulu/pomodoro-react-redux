export const SESSION_INCREAMENT = "SESSION_INCREAMENT";
export const SESSION_DECREAMENT = "SESSION_DECREAMENT";
export const BREAK_INCREAMENT = "BREAK_INCREAMENT";
export const BREAK_DECREAMENT = "BREAK_DECREAMENT"
export const RESET = "RESET";

export const increamentBreak = () => ({
  type: BREAK_INCREAMENT
})

export const decreamentBreak = () => ({
  type: BREAK_DECREAMENT
})

export const increamentSession = () => ({
  type: SESSION_INCREAMENT
})

export const decreamentSession = () => ({
  type: BREAK_DECREAMENT
})

export const resetBoth = () => ({
  type: RESET
})










