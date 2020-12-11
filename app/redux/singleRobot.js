import axios from "axios";

const SET_ROBOT = "SET_ROBOT";
const CLEAR_ROBOT = "CLEAR_ROBOT";

export const setRobot = (robot) => {
  return {
    type: SET_ROBOT,
    robot,
  };
};

export const clearRobot = () => {
  return {
    type: CLEAR_ROBOT,
    robot: {}
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
      case CLEAR_ROBOT:
        return action.robot;
    default:
      return state;
  }
};