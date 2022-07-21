import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return {
    value: "",
    isTouched: false,
  };
};

const useInput = (validateValue) => {
  const [currentState, dispatchFn] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(currentState.value);
  const hasError = !valueIsValid && currentState.isTouched;

  const inputChangeHandler = (event) =>
    dispatchFn({ type: "INPUT", value: event.target.value });

  const inputBlurHandler = (event) => dispatchFn({ type: "BLUR" });

  const reset = () => {
    dispatchFn({ type: "RESET" });
  };

  return {
    value: currentState.value,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
