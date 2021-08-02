import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import "./App.css";

export class App extends Component {
  state = {
    navActive: false,
    activeList: 1,
    lists: [
      {
        id: 1,
        title: "List item 1",
        todos: ["React project", "npm", "Reading"],
      },
      {
        id: 2,
        title: "list item 2",
        todos: ["ES6 revision", "Git commands revision", "Stop worrying"],
      },
    ],
  };

  toggleNav = () => {
    this.setState({ navActive: !this.state.navActive });
  };

  changeActiveList = (id) => {
    if (this.state.navActive) {
      this.setState({ navActive: false });
    }
    this.setState({ activeList: id });
  };

  addList = (ref, e) => {
    e.preventDefault();
    const value = ref.current.value;
    if (!value) return;

    this.setState(
      {
        lists: [
          ...this.state.lists,
          {
            id: this.state.lists.length + 1,
            title: value,
            todos: [],
          },
        ],
      },
      () => this.setState({ activeList: this.state.lists.length })
    );
  };

  render() {
    const { lists, activeList, navActive } = this.state;
    return (
      <div className="app">
        <Navbar
          lists={lists}
          active={activeList}
          changeActiveList={this.changeActiveList}
          addList={this.addList}
          navActive={navActive}
          toggleNav={this.toggleNav}
        />
        <div className="list-container">
          <Todo active={activeList} lists={lists} />
        </div>
      </div>
    );
  }
}

export default App;
