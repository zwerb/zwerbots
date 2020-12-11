import React from "react";

// eslint-disable-next-line complexity
const RobotForm = (props) => {
  const { onChange, onSubmit } = props;
  const { taskName, assignee } = props.todo
    ? props.todo
    : { taskName: "test1", assignee: "test2" };
  const { singleTodo } = { singleTodo: "test3" };
  const { formDetails } = props;

  const { robot } = props.robot
    ? props
    : {
        robot: {
          id: -1,
          name: "Slimothy",
          imageUrl: "/images/robots.default.png",
          fuelType: "gas",
          fuelLevel: 88.5,
        },
      };
  const robotKeys = Object.keys(robot);

  console.log("form props: ", props);
  console.log("form robot: ", robot);
  console.log("form details: ", formDetails);

  return (
    <div className="single-form">
      <form onChange={onChange} onSubmit={onSubmit}>
        <div className="form-details">
          <div className="form-header">{formDetails.title}</div>
          {robotKeys.filter(keyElem=>keyElem!='id').map((keyElem, index) => {
            return (
              <div key={index} className="form-detail">
                <label htmlFor={keyElem}>{keyElem[0].toUpperCase()+keyElem.slice(1)}</label>
                <input
                  placeholder={robot[keyElem]}
                  value={robot[keyElem]}
                  onChange={onChange}
                  type="text"
                  name={keyElem}
                />
              </div>
            );
          })}
          <div className="form-detail">
            <label htmlFor="taskName">
              Task Name:
              {/^\s*$/.test(taskName) ? (
                <span className="warning">Task Name Required</span>
              ) : (
                ""
              )}
            </label>
            <input
              placeholder={singleTodo ? singleTodo.taskName : "Task Name"}
              value={taskName}
              onChange={onChange}
              type="text"
              name="taskName"
            />
          </div>
          <div className="form-detail">
            <label htmlFor="assignee">
              Assigned To:
              {/^\s*$/.test(assignee) ? (
                <span className="warning">Assignee Required</span>
              ) : (
                ""
              )}
            </label>
            <input
              placeholder={singleTodo ? singleTodo.assignee : "Assignee"}
              value={assignee}
              onChange={onChange}
              type="text"
              name="assignee"
            />
          </div>
          <button
            className="submit-button"
            type="submit"
            disabled={
              taskName &&
              assignee &&
              (taskName.length < 1 || assignee.length < 1)
                ? true
                : false
            }
          >
            Submit
          </button>
          {/* {props.todo.error?<div className='error'>Error!</div>:''} */}
        </div>
      </form>
    </div>
  );
};

export default RobotForm;
