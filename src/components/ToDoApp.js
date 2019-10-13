import React from "react";
import { connect } from "react-redux";
import FilterLink from "./FilterLink";
class ToDoApp extends React.Component {
  state = {
    todoText: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      props: { addTodo, incID, id },
      state: { todoText }
    } = this;
    addTodo(todoText, id);
    incID();
    this.setState({ todoText: "" });
  };
  getVisibleTodos = (todos, filter) => {
    switch (filter) {
      case "SHOW_ALL":
        return todos;
      case "SHOW_ACTIVE":
        return todos.filter(t => !t.completed);
      case "SHOW_COMPLETED":
        return todos.filter(t => t.completed);
      default:
        break;
    }
  };
  render() {
    const {
      handleChange,
      handleSubmit,
      state: { todoText },
      props: { todos, filter, onTodoClick, setFilter }
    } = this;
    const visibleTodos = this.getVisibleTodos(todos, filter);
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} name="todoText" value={todoText} />
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {visibleTodos.map(t => (
            <li
              onClick={() => onTodoClick(t.id)}
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
              key={t.id}
            >
              {t.text}
            </li>
          ))}
        </ul>
        <p>
          Show:
          <FilterLink
            filter="SHOW_ALL"
            currentFilterState={filter}
            setFilter={setFilter}
          >
            All
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_ACTIVE"
            currentFilterState={filter}
            setFilter={setFilter}
          >
            Active
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_COMPLETED"
            currentFilterState={filter}
            setFilter={setFilter}
          >
            Completed
          </FilterLink>{" "}
        </p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    id: state.nextId,
    todos: state.todos,
    filter: state.visibilityFilter
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch({ type: "TOGGLE_TODO", id });
    },
    addTodo: (text, id) => {
      dispatch({ type: "ADD_TODO", text, id });
    },
    incID: () => {
      dispatch({ type: "INC_ID" });
    },
    setFilter: filter => {
      dispatch({ type: "SET_VISIBILITY_FILTER", filter });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);
