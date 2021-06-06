import { useState } from "react";

const useInput = (validateValue) => {
  const [value, setValue] = useState("");
  const [valueFieldIsTouched, setValueFieldIsTocuhed] = useState(false);

  const valueIsIsValid = validateValue(value);
  const hasError = !valueIsIsValid && valueFieldIsTouched;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setValueFieldIsTocuhed(true);
  };

  const reset = () => {
    setValue("");
    setValueFieldIsTocuhed(false);
  };

  return {
    value,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
