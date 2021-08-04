import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    const {
      lists,
      active,
      changeActiveList,
      addList,
      navActive,
      toggleNav,
      removeList,
    } = this.props;
    return (
      <aside className={`navbar ${navActive ? "active" : ""}`}>
        <div className="navbar-toggler" onClick={toggleNav}>
          lists
          <i className="fas fa-long-arrow-alt-right"></i>
        </div>

        <h2 className="navbar-title">Your lists.</h2>
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
          {lists.map(({ title, id }, i) => {
            return (
              <li
                className={`list-item item ${active === id ? "active" : ""}`}
                key={id}
              >
                <span onClick={changeActiveList.bind(this, id)}>{title}</span>

                <i
                  className="fas fa-times close"
                  onClick={() => removeList(id, i)}
                ></i>
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }
}

export default Navbar;
