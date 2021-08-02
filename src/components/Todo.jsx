import React, { Component } from "react";

export class Todo extends Component {
  render() {
    const { active, lists } = this.props;
    const activeList = lists[active - 1];

    return (
      <div className="todolist">
        <h1 className="todolist-title">{activeList.title}</h1>

        <form className="todolist-form">
          <input
            type="text"
            className="todolist-form-input"
            placeholder="Add some task"
          />

          <button className="todolist-form-button">Add</button>
        </form>

        <ul className="todos">
          {activeList.todos.map((todo, i) => {
            return (
              <li key={i} className="todo">
                <label className="todo-label" htmlFor={`todo-check-${i + 1}`}>
                  {todo}
                  <input
                    type="checkbox"
                    className="todo-check"
                    id={`todo-check-${i + 1}`}
                  />
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Todo;
