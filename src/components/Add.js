import React from "react";

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.inputValChanged = this.inputValChanged.bind(this);
  }

  addTask(e, inputRef) {
    e.preventDefault();
    this.props.addTask(inputRef);
  }

  inputValChanged() {
    this.props.inputValChanged();
  }

  render() {
    let inputRef = React.createRef();

    return (
      <div className="todoTasksAddContainer">
        <h2>What's the task?</h2>
        <div>
          <form onSubmit={(e) => this.addTask(e, inputRef)}>
            <input
              type="text"
              placeholder="Add a todo task"
              id="id_todoInput"
              ref={inputRef}
              autoComplete="off"
              onInput={this.inputValChanged}
              className={this.props.errorTxt !== "" ? "error" : ""}
            />
            <button type="submit" className="addBtn">
              ADD
            </button>
          </form>
          {this.props.errorTxt !== "" && (
            <span className="errorTxt">{this.props.errorTxt}</span>
          )}
        </div>
      </div>
    );
  }
}
