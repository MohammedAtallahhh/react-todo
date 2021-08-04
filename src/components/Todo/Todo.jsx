import React, { Component } from "react";
import "./Todo.css";

export class Todo extends Component {
  render() {
    const { active, lists, setDone, addTask, removeTask } = this.props;
    const activeList = lists.find((list) => list.id === active);

    return activeList ? (
      <div className="todolist">
        <h2 className="todolist-title">{activeList.title}</h2>

        <form
          onSubmit={(e) => addTask(e, this.addRef, activeList)}
          className="todolist-form"
        >
          <input
            type="text"
            className="todolist-form-input"
            placeholder="Add some task"
            ref={(id) => (this.addRef = id)}
          />

          <button className="todolist-form-button">Add</button>
        </form>

        <ul className="todos">
          {activeList.todos.map(({ text, done }, i) => {
            return (
              <li key={i} className={`todo ${done ? "done" : ""}`}>
                <label
                  tabIndex={0}
                  className="todo-label"
                  htmlFor={`todo-check-${i + 1}`}
                >
                  <input
                    type="checkbox"
                    className="todo-check"
                    id={`todo-check-${i + 1}`}
                    checked={done}
                    onChange={() => setDone(activeList, i)}
                  />

                  {text}
                </label>

                <i
                  className="fas fa-times close"
                  onClick={() => removeTask(i, activeList)}
                ></i>
              </li>
            );
          })}
        </ul>

        <span className="number-of-tasks">
          {activeList.todos.length} task{activeList.todos.length > 1 ? "s" : ""}
        </span>
      </div>
    ) : (
      <h2>No Lists yet!</h2>
    );
  }
}

export default Todo;
