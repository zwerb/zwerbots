import axios from "axios";

const SET_ROBOT = "SET_ROBOT";
const CLEAR_ROBOT = "CLEAR_ROBOT";
const ADD_ROBOT = "ADD_ROBOT";
const DELETE_ROBOT = "DELETE_ROBOT";
const UPDATE_ROBOT = "UPDATE_ROBOT";
const UNASSIGN_PROJECT = "UNASSIGN_PROJECT";


export const unassignProject = (reduxMessage) => {
  return {
    type: UNASSIGN_PROJECT,
    reduxMessage,
  };
};

export const fetchUnassignProject = (robotId,projectId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/robots/${robotId}/${projectId}`);
      console.log("redux delete response:", response);
      const { data } = response;
      const { status } = response;
      if (status == 202) {
        dispatch(unassignProject(data));
        return data;
      } else {
        return `Error, robot not updated.`;
      }
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
      console.error(err);
    }
  };
};


export const updateRobot = (robot) => {
  return {
    type: UPDATE_ROBOT,
    robot,
  };
};

export const fetchUpdateRobot = (robot) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/robots/${robot.id}`,robot);
      console.log("redux put response:", response);
      const { data } = response;
      const { status } = response;
      if (status == 202) {
        dispatch(updateRobot(data));
        return data;
      } else {
        return `Error, robot not updated.`;
      }
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
      console.error(err);
    }
  };
};

export const deleteRobot = (robot) => {
  return {
    type: DELETE_ROBOT,
    robot,
  };
};

export const fetchDeleteRobot = (robotId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/robots/${robotId}`);
      const { data } = response;
      const { status } = response;
      if (status == 204) {
        dispatch(deleteRobot({}));
        return `Success, robot ${robotId} deleted.`;
      } else {
        return `Error, robot not deleted.`;
        // throw Error('Robot not deleted.')
      }
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
      console.error(err);
    }
  };
};

export const addRobot = (robot) => {
  return {
    type: ADD_ROBOT,
    robot,
  };
};

export const fetchAddRobot = (robot) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/robots`, robot);
      const { data } = response;
      dispatch(addRobot(data));
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
    case UPDATE_ROBOT:
      return action.robot;
    case DELETE_ROBOT:
      return action.robot;
    case CLEAR_ROBOT:
      return action.robot;
    default:
      return state;
  }
};
