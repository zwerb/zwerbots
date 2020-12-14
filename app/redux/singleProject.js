import axios from "axios";

const SET_PROJECT = "SET_PROJECT";
const CLEAR_PROJECT = "CLEAR_PROJECT";
const ADD_PROJECT = "ADD_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const UPDATE_PROJECT = "UPDATE_PROJECT";
const UNASSIGN_ROBOT = "UNASSIGN_ROBOT";

export const unassignRobot = (reduxMessage) => {
  return {
    type: UNASSIGN_ROBOT,
    reduxMessage,
  };
};

export const fetchUnassignRobot = (projectId, robotId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `/api/projects/${projectId}/${robotId}`
      );
      const { data } = response;
      const { status } = response;
      if (status == 202) {
        dispatch(unassignRobot(data));
        return data;
      } else {
        return `Error, project not updated.`;
      }
    } catch (err) {
      const errObj = Object.getOwnPropertyNames(err).reduce((errObj, prop) => {
        errObj[prop] = err[prop];
        return errObj;
      }, {});
      if (errObj.response && errObj.response.data && errObj.response.status) {
        return errObj.response;
      }
      console.error(err);
    }
  };
};

export const updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project,
  };
};

export const fetchUpdateProject = (project) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/projects/${project.id}`, project);
      const { data } = response;
      const { status } = response;
      if (status == 202) {
        dispatch(updateProject(data));
        return data;
      } else {
        return `Error, project not updated.`;
      }
    } catch (err) {
      const errObj = Object.getOwnPropertyNames(err).reduce((errObj, prop) => {
        errObj[prop] = err[prop];
        return errObj;
      }, {});
      if (errObj.response && errObj.response.data && errObj.response.status) {
        return errObj.response;
      }
      console.error(err);
    }
  };
};

export const deleteProject = (project) => {
  return {
    type: DELETE_PROJECT,
    project,
  };
};

export const fetchDeleteProject = (projectId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/projects/${projectId}`);
      const { data } = response;
      const { status } = response;
      if (status == 204) {
        dispatch(deleteProject({}));
        return `Success, project ${projectId} deleted.`;
      } else {
        return `Error, project not deleted.`;
        // throw Error('Project not deleted.')
      }
    } catch (err) {
      const errObj = Object.getOwnPropertyNames(err).reduce((errObj, prop) => {
        errObj[prop] = err[prop];
        return errObj;
      }, {});
      if (errObj.response && errObj.response.data && errObj.response.status) {
        return errObj.response;
      }
      console.error(err);
    }
  };
};

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
      if (errObj.response && errObj.response.data && errObj.response.status) {
        return errObj.response;
      }
      console.error(err);
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
      console.error(err);
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
    case UPDATE_PROJECT:
      return action.project;
    case DELETE_PROJECT:
      return action.project;
    case CLEAR_PROJECT:
      return action.project;
    case UNASSIGN_ROBOT:
      return action.reduxMessage;
    default:
      return state;
  }
};
