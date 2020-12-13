import React from "react";

// eslint-disable-next-line complexity
const RobotForm = (props) => {
  const { onChange, onSubmit } = props;
  const { formDetails } = props;

  const { formObject } = props.formObject
    ? props
    : {
      formObject: {
          id: -1,
          name: "Slimothy",
          imageUrl: "/images/robots.default.png",
          fuelType: "gas",
          fuelLevel: 88.5,
        },
      };

  const { state } = props.state ? props : {};
  const formObjectKeys = Object.keys(formObject);

  const formValidInputs = formObjectKeys
    .filter((keyElem) => keyElem != "id")
    .filter((keyElem) => state[keyElem] && state[keyElem].length > 0);
  const formInvalidInputs = formObjectKeys
    .filter((keyElem) => keyElem != "id")
    .filter((keyElem) => !state[keyElem] || state[keyElem].length < 1);

  const formDisabled = formInvalidInputs.length > 0;

  const { formObjectRules } = props.formObjectRules ? props : {formObjectRules: {}};

  console.log("form props: ", props);
  // console.log("form robot: ", robot);
  // console.log("form details: ", formDetails);
  // console.log("form disabled: ", formDisabled);
  // console.log("form has good input for: ", formValidInputs);
  // console.log("form has invalid input for: ", formInvalidInputs);

  return (
    <div className="single-form">
      <form onChange={onChange} onSubmit={onSubmit}>
       <div onClick={()=>{props.toggleHidden()}} className="form-header">{formDetails.title}</div> 
          <div className={formDetails.hidden?"form-details hidden":"form-details shown"}>
          {formObjectKeys
            .filter((keyElem) => keyElem != "id")
            .map((keyElem, index) => {
              const isValid = !formInvalidInputs.includes(keyElem)
              return (
                <div
                  key={index}
                  className={
                    isValid
                      ? "form-detail"
                      : "form-detail invalid"
                  }
                >
                  <label htmlFor={keyElem}>
                    {keyElem[0].toUpperCase() + keyElem.slice(1)}
                  </label>
                  {formObjectRules[keyElem] && Object.keys(formObjectRules[keyElem])[0]=='select' ?
                  <select name={keyElem} value={state[keyElem]}>
                    {formObjectRules[keyElem]['select'].map(optionElem=>(<option value={optionElem}>{optionElem}</option>))}
                  </select>
                  :
                  <input
                    placeholder={formObject[keyElem]}
                    value={state[keyElem]}
                    onChange={onChange}
                    type="text"
                    name={keyElem}
                    className={
                      isValid
                        ? ""
                        : "invalid"
                    }
                  />}
                </div>
              );
            })}
          <button
            className={
              formDisabled ? "submit-button disabled" : "submit-button"
            }
            type="submit"
            disabled={formDisabled}
          >
            Submit
          </button>

          {formDetails.error&&formDetails.error.length>0?<div className='err-box'>{formDetails.error}</div>:''}
          {formDetails.success&&formDetails.success.length>0?<div className='success-box'>{formDetails.success[0]}</div>:<div>{formDisabled ? <p>Please fill out all fields</p>:<p>{""}</p>}</div>}
        </div>
      </form>
    </div>
  );
};

export default RobotForm;
