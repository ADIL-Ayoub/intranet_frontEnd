import {
    ADD_TOAST,
    REMOVE_TOAST
  } from "./types";
  
  const initialState = {
    toasts: [],
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_TOAST: {
        return { ...state, toasts: [action.payload, ...state.toasts] }
      }
      case REMOVE_TOAST:
        return { ...state, toasts: state.toasts.filter((item) => item.id !== action.payload) }
      default:
        return state
    }
  }