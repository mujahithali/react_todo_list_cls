import React from "react";
import Add from "../components/Add";
import List from "../components/List";
import "../assets/css/Todo.css";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      addErrorTxt: "",
      taskListArr: [],
      errorTxt: {
        empty: "Oops! Empty task cannot be add.",
        duplicate: "Oops! Given task is already added.",
      },
    };
    this.addTask = this.addTask.bind(this);
    this.inputValChanged = this.inputValChanged.bind(this);
    this.upsertTask = this.upsertTask.bind(this);
  }

  addTask(inputTaskRef) {
    let inputTask =
      inputTaskRef && inputTaskRef.current && inputTaskRef.current.value
        ? inputTaskRef.current.value.trim()
        : "";
    let updatedState = {};
    let newItem = "";

    if (!inputTask) {
      updatedState["addErrorTxt"] = this.state.errorTxt["empty"];
    } else if (this.state.taskListArr.includes(inputTask.toLowerCase())) {
      updatedState["addErrorTxt"] = this.state.errorTxt["duplicate"];
    } else if (inputTask) {
      let dateNow = Date.now();
      newItem = {
        text: inputTask,
        key: dateNow,
        id: inputTask + "_" + dateNow,
        mode: "list",
        updateErrorTxt: "",
      };

      updatedState["addErrorTxt"] = "";
      updatedState["taskListArr"] = this.state.taskListArr.concat(
        inputTask.toLowerCase()
      );

      inputTaskRef.current.value = "";
    }

    this.setState((prevState) => {
      if (newItem) {
        let prevItems = [...prevState.tasks];
        prevItems.map((arrVal) => {
          arrVal.mode = "list";
          arrVal.updateErrorTxt = "";
          return arrVal;
        });
        updatedState["tasks"] = prevItems.concat(newItem);
      }
      return updatedState;
    });
  }

  inputValChanged() {
    this.setState({ addErrorTxt: "" });
  }

  upsertTask(taskType, dataObj, inputRef) {
    switch (taskType) {
      case "edit":
        this.editTask(dataObj, inputRef);
        break;
      case "delete":
        this.deleteTask(dataObj);
        break;
      case "cancel":
        this.editCancel(dataObj, inputRef);
        break;
      case "save":
        this.editSave(dataObj, inputRef);
        break;
      case "inputValChanged":
        this.updateInputValChanged(dataObj);
        break;
      default:
        break;
    }
  }

  editTask(dataObj, inputRef) {
    let updatedTasks = this.state.tasks.map((arrVal) => {
      if (arrVal.id === dataObj.id) {
        arrVal.mode = "edit";
        inputRef.current.value = arrVal.text;
      }
      return arrVal;
    });
    this.setState({ tasks: updatedTasks });
  }

  editCancel(dataObj, inputRef) {
    let updatedTasks = this.state.tasks.map((arrVal) => {
      if (arrVal.id === dataObj.id) {
        arrVal.mode = "list";
        arrVal.updateErrorTxt = "";
        inputRef.current.value = arrVal.text;
      }
      return arrVal;
    });
    this.setState({ tasks: updatedTasks });
  }

  editSave(dataObj, inputRef) {
    let newTaskVal =
      inputRef && inputRef.current && inputRef.current.value
        ? inputRef.current.value.trim()
        : "";
    let updatedState = {};
    let updatedTaskListArr = [];

    updatedState["tasks"] = this.state.tasks.map((arrVal) => {
      const oldTaskVal = arrVal.text;

      if (arrVal.id === dataObj.id) {
        if (!newTaskVal) {
          arrVal.updateErrorTxt = this.state.errorTxt["empty"];
        } else if (
          this.state.taskListArr.includes(newTaskVal.toLowerCase()) &&
          oldTaskVal.toLowerCase() !== newTaskVal.toLowerCase()
        ) {
          arrVal.updateErrorTxt = this.state.errorTxt["duplicate"];
        } else if (newTaskVal) {
          updatedTaskListArr = [...this.state.taskListArr];
          let itemIdx = this.state.taskListArr.indexOf(
            oldTaskVal.toLowerCase()
          );
          if (itemIdx !== -1) {
            updatedTaskListArr[itemIdx] = newTaskVal.toLowerCase();
          }

          arrVal.text = newTaskVal;
          arrVal.mode = "list";
          arrVal.updateErrorTxt = "";
        }
      }
      return arrVal;
    });
    if (updatedTaskListArr.length) {
      updatedState["taskListArr"] = updatedTaskListArr;
    }
    this.setState(updatedState);
  }

  deleteTask(dataObj) {
    let updatedState = {};
    let updatedTaskListArr = [...this.state.taskListArr];
    let itemIdx = this.state.taskListArr.indexOf(dataObj.text.toLowerCase());
    if (itemIdx !== -1) {
      updatedTaskListArr.splice(itemIdx, 1);
    }

    let prevItems = [...this.state.tasks];
    prevItems.map((arrVal) => {
      arrVal.mode = "list";
      arrVal.updateErrorTxt = "";
      return arrVal;
    });
    updatedState["tasks"] = prevItems.filter(
      (arrVal) => arrVal.id !== dataObj.id
    );
    updatedState["taskListArr"] = updatedTaskListArr;
    this.setState(updatedState);
  }

  updateInputValChanged(dataObj) {
    let updatedTasks = this.state.tasks.map((arrVal) => {
      if (arrVal.id === dataObj.id) {
        arrVal.updateErrorTxt = "";
      }
      return arrVal;
    });
    this.setState({ tasks: updatedTasks });
  }

  render() {
    return (
      <div className="todoTaskApp">
        <Add
          addTask={this.addTask}
          inputValChanged={this.inputValChanged}
          errorTxt={this.state.addErrorTxt}
        />
        {this.state.tasks.length > 0 && (
          <List tasks={this.state.tasks} upsertTask={this.upsertTask} />
        )}
      </div>
    );
  }
}
