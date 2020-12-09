import axios from "axios";

const SET_ROBOTS = "SET_ROBOTS";

export const setRobots = (robots) => {
  return {
    type: SET_ROBOTS,
    robots,
  };
};

export const fetchRobots = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/robots");
      dispatch(setRobots(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROBOTS:
      return action.robots;
    default:
      return state;
  }
};
