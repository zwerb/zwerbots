import axios from "axios";

const SET_PROJECT = "SET_PROJECT";
const CLEAR_PROJECT = "CLEAR_PROJECT";

export const setProject = (project) => {
  return {
    type: SET_PROJECT,
    project,
  };
};

export const clearProject = () => {
  return {
    type: CLEAR_PROJECT,
    project: {}
  };
};

export const fetchProject = (projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/projects/${projectId}`);
      dispatch(setProject(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return action.project;
      case CLEAR_PROJECT:
        return action.project;
    default:
      return state;
  }
};