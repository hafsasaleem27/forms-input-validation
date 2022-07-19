import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const enteredValue = useRef();

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputInvalid = !enteredNameIsValid && enteredNameTouched;

  // name is empty     => invalid => (false)
  // name is not empty => valid   => (true)

  // name is empty at the start so entered name flag is invalid  => false
  // when name is entered, we set the entered name flag to valid => true

  // name field is not touched at the start, so enteredNameTouched flag is (false)
  // when name field is blurred, it means it got touched, so enteredNameTouched flag should be (true)

  const nameInputChangeHandler = (event) => {
    // save name in state
    setEnteredName(event.target.value);

    // if name entered is valid (not empty), set name is valid to true
  };

  const nameInputBlurHandler = (event) => {
    // the input is blurred means it was touched, set name touched field to true
    setEnteredNameTouched(true);

    // if entered name is empty (not valid), set name is valid to false
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredValue.current.value);

    setEnteredName("");
    setEnteredNameTouched(false);
    // enteredValue.current.value = ""; => NOT IDEAL! Not an ideal way to manipulate dom in react
  };

  const nameInputClasses = nameInputInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={enteredValue}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
