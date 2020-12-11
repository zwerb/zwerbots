import axios from "axios";

const SET_PROJECT = "SET_PROJECT";
const CLEAR_PROJECT = "CLEAR_PROJECT";
const ADD_PROJECT = "ADD_PROJECT";

export const addProject = (project) => {
  return {
    type: ADD_PROJECT,
    project,
  };
};

export const fetchAddProject = (project) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/projects`, project);
      const { data } = response;
      dispatch(addProject(data));
      return data;
    } catch (err) {
      const errObj = Object.getOwnPropertyNames(err).reduce((errObj, prop) => {
        errObj[prop] = err[prop];
        return errObj;
      }, {});
      console.log("errObj", errObj);
      if (errObj.response && errObj.response.data && errObj.response.status) {
        return errObj.response;
      }
      // !REMOVE
      console.log(err);
    }
  };
};

export const setProject = (project) => {
  return {
    type: SET_PROJECT,
    project,
  };
};

export const clearProject = () => {
  return {
    type: CLEAR_PROJECT,
    project: {},
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
    case ADD_PROJECT:
      return action.project;
    case CLEAR_PROJECT:
      return action.project;
    default:
      return state;
  }
};
