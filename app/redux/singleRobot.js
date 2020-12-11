import axios from "axios";

const SET_ROBOT = "SET_ROBOT";
const CLEAR_ROBOT = "CLEAR_ROBOT";
const ADD_ROBOT = "ADD_ROBOT";

export const addRobot = (robot) => {
  return {
    type: ADD_ROBOT,
    robot,
  };
};

// if(response.status == "ok"){
//   // check if the internal status is ok
//   // then pass on the data
//   dispatch(loadTodoSuccess(response.data));
//   }else{
//   // if internally there are errors
//   // pass on the error, in a correct implementation
//   // such errors should throw an HTTP 4xx or 5xx error
//   // so that it directs straight to the catch block
//   dispatch(loadTodoError(response.error));
//   } 

export const fetchAddRobot = (robot) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/robots`, robot);
      const { data } = response;
      dispatch(addRobot(data));
    } catch (err) {
      const errObj = Object.getOwnPropertyNames(err).reduce((errObj,prop)=>{errObj[prop]=err[prop];return errObj},{});
      console.log('errObj',errObj);
      if(errObj.response.data.includes("Validation error") || errObj.response.data.includes("invalid input value")){
        return (errObj.response.data)
      }
      // !REMOVE
      console.log(err);
    }
  };
};

export const setRobot = (robot) => {
  return {
    type: SET_ROBOT,
    robot,
  };
};

export const clearRobot = () => {
  return {
    type: CLEAR_ROBOT,
    robot: {},
  };
};

export const fetchRobot = (robotId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/robots/${robotId}`);
      dispatch(setRobot(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROBOT:
      return action.robot;
    case ADD_ROBOT:
      return action.robot;
    case CLEAR_ROBOT:
      return action.robot;
    default:
      return state;
  }
};
