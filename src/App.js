import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Todo from "./components/Todo/Todo";
import "./App.css";

export class App extends Component {
  state = {
    navActive: false,
    activeList: JSON.parse(localStorage.getItem("activeList")) || 1,
    lists: JSON.parse(localStorage.getItem("lists")) || [
      {
        id: 1,
        title: "Some list",
        todos: [
          { text: "Task 1", done: false },
          { text: "Finished task", done: true },
        ],
      },
    ],
  };

  componentDidMount() {
    const html = document.documentElement;
    let randomStart = Math.floor(Math.random() * 360);

    html.style.setProperty("--h", randomStart);

    // setInterval(() => {
    //   let oldValue = +getComputedStyle(html).getPropertyValue("--h");

    //   html.style.setProperty("--h", oldValue + 80);

    //   console.log(+getComputedStyle(html).getPropertyValue("--h"));
    // }, 10000);
  }

  toggleNav = () => {
    this.setState({ navActive: !this.state.navActive });
  };

  changeActiveList = (id) => {
    if (this.state.navActive) {
      this.setState({ navActive: false });
    }
    this.setState({ activeList: id }, () => {
      localStorage.setItem("activeList", id);
    });
  };

  addList = (ref, e) => {
    e.preventDefault();
    const value = ref.current.value;
    if (!value) return;
    let id = Math.random() * 1000000;

    this.setState(
      {
        lists: [
          ...this.state.lists,
          {
            id: id,
            title: value,
            todos: [],
          },
        ],
      },
      () => {
        this.setState({
          activeList: id,
        });
        localStorage.setItem("lists", JSON.stringify(this.state.lists));
        localStorage.setItem("activeList", JSON.stringify(id));
      }
    );

    ref.current.value = "";
  };

  addTask = (e, ref, list) => {
    e.preventDefault();
    let value = ref.value;
    let listId = list.id;

    if (!value) return;

    const newTodo = {
      text: value,
      done: false,
    };

    let lists = this.state.lists;

    lists = lists.map((l) => {
      if (l.id === listId) {
        l.todos = [...l.todos, newTodo];
      }

      return l;
    });

    this.setState(
      {
        lists,
      },
      () => {
        localStorage.setItem("lists", JSON.stringify(this.state.lists));
      }
    );

    ref.value = "";
  };

  setDone = (list, i) => {
    let lists = this.state.lists;

    lists = lists.map((l) => {
      if (l.id === +list.id) l.todos[i].done = !l.todos[i].done;
      return l;
    });

    this.setState(
      {
        lists,
      },
      () => {
        localStorage.setItem("lists", JSON.stringify(this.state.lists));
      }
    );
  };

  removeList = (id, i) => {
    let lists = this.state.lists;
    // If we delete the current active list we must set another list to be active
    let shouldChange = this.state.activeList === id;

    lists = lists.filter((list) => list.id !== id);

    this.setState({ lists }, () => {
      // We the new index of the active list to be the same and if it was the last we set it to nearest or nothing if it was the only one last
      let activeList = lists[i] || lists[--i] || {};

      // if lists state is empty we must clear the local storage
      if (lists.length === 0) {
        localStorage.clear();
        return;
      }

      // The changes has to be made if we delete the current active list
      if (shouldChange) {
        this.setState({ activeList: activeList.id });
        localStorage.setItem("lists", JSON.stringify(lists));
        localStorage.setItem("activeList", JSON.stringify(activeList.id));
      }
    });
  };

  removeTask = (i, list) => {
    let lists = this.state.lists;

    lists = lists.map((l) => {
      if (l === list) {
        l.todos = l.todos.filter((todo, index) => i !== index);
      }
      return l;
    });

    this.setState({
      lists,
    });
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
          removeList={this.removeList}
        />
        <div className="list-container">
          <Todo
            addTask={this.addTask}
            active={activeList}
            lists={lists}
            setDone={this.setDone}
            removeTask={this.removeTask}
          />
        </div>
      </div>
    );
  }
}

export default App;
