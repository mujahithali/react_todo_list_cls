import React from "react";

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.upsertTask = this.upsertTask.bind(this);
  }

  upsertTask(taskType, inputRef) {
    this.props.upsertTask(
      taskType,
      { id: this.props.id, text: this.props.text },
      inputRef
    );
  }

  render() {
    let inputRef = React.createRef();
    return (
      <li>
        <div className="todoTasksListContentTopContainer">
          <div
            className={
              "todoTasksListContentMainContainer list " +
              (this.props.mode === "list" ? "active" : "inactive")
            }
          >
            <div className="todoTasksListContentContainer">
              <span className="todoTasksListContent">{this.props.text}</span>
            </div>
            <div className="btnContainer">
              <button
                className="editBtn"
                onClick={() => this.upsertTask("edit", inputRef)}
              >
                Edit
              </button>
              <button
                className="deleteBtn"
                onClick={() => this.upsertTask("delete")}
              >
                Delete
              </button>
            </div>
          </div>
          <div
            className={
              "todoTasksListContentMainContainer edit " +
              (this.props.mode === "list" ? "inactive" : "active")
            }
          >
            <div className="todoTasksListContentContainer">
              <input
                type="text"
                ref={inputRef}
                defaultValue={this.props.text}
                className={this.props.updateErrorTxt !== "" ? "error" : ""}
                onInput={() => this.upsertTask("inputValChanged")}
              />
            </div>
            <div className="btnContainer">
              <button
                className="saveBtn"
                onClick={() => this.upsertTask("save", inputRef)}
              >
                Save
              </button>
              <button
                className="cancelBtn"
                onClick={() => this.upsertTask("cancel", inputRef)}
              >
                Cancel
              </button>
            </div>
          </div>
          {this.props.updateErrorTxt !== "" && (
            <span className="errorTxt">{this.props.updateErrorTxt}</span>
          )}
        </div>
      </li>
    );
  }
}

export default class List extends React.Component {
  render() {
    return (
      <>
        <h2>
          <u style={{ color: "#ff9670" }}>TO DO TASK LISTS</u>
        </h2>
        <div className="todoTasksListMainContainer">
          <div className="todoTasksListInnerContainer">
            <ul>
              {this.props.tasks.map((task) => (
                <Tasks
                  key={task.key}
                  text={task.text}
                  id={task.id}
                  mode={task.mode}
                  updateErrorTxt={task.updateErrorTxt}
                  upsertTask={this.props.upsertTask}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}
