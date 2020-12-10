import axios from "axios";

const SET_PROJECTS = "SET_PROJECTS";

export const setProjects = (projects) => {
  return {
    type: SET_PROJECTS,
    projects,
  };
};

export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/projects");
      dispatch(setProjects(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;
    default:
      return state;
  }
};
