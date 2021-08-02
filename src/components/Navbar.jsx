import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    const { lists, active, changeActiveList, addList, navActive, toggleNav } =
      this.props;
    return (
      <aside className={`navbar ${navActive ? "active" : ""}`}>
        <div className="navbar-toggler" onClick={toggleNav}>
          lists
          <i className="fas fa-long-arrow-alt-right"></i>
        </div>
        <form
          onSubmit={addList.bind(this, this.inputRef)}
          className="navbar-form"
        >
          <input
            type="text"
            placeholder="Add a list"
            className="navbar-form-input"
            ref={this.inputRef}
          />

          <button type="submit" className="navbar-form-button">
            Add list
          </button>
        </form>

        <ul className="lists">
          {lists.map(({ title, id }) => {
            return (
              <li
                className={`list-item ${active === id ? "active" : ""}`}
                key={id}
                onClick={changeActiveList.bind(this, id)}
              >
                {title}
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }
}

export default Navbar;
