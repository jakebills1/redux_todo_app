import React, { useRef } from "react";
import { connect } from "react-redux";
import FilterLink from "./FilterLink";
import { addTodo, toggleTodo } from "../reducers/todos";
import { getNextID } from "../reducers/nextId";
import { getVisibleTodos } from "../reducers";
const ToDoApp = ({
  id,
  todos,
  addTodo,
  incID,
  onTodoClick,
  match: {
    params: { filter }
  }
}) => {
  const inputEl = useRef(null);
  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    addTodo(data.get("todoText"), id);
    incID();
    // clears the form
    inputEl.current.value = "";
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoText"></label>
        <input
          type="text"
          name="todoText"
          id="todoText"
          ref={inputEl}
          required
        />
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.map(t => (
          <li
            onClick={() => onTodoClick(t.id)}
            style={{ textDecoration: t.completed ? "line-through" : "none" }}
            key={t.id}
          >
            {t.text}
          </li>
        ))}
      </ul>
      <div>
        Show:
        <FilterLink filter="all" currentFilterState={filter}>
          All
        </FilterLink>{" "}
        <FilterLink filter="active" currentFilterState={filter}>
          Active
        </FilterLink>{" "}
        <FilterLink filter="completed" currentFilterState={filter}>
          Completed
        </FilterLink>{" "}
      </div>
    </div>
  );
};

// const mapDispatchToProps = dispatch => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   },
//   addTodo(text, id) {
//     dispatch(addTodo(text, id));
//   },
//   incID() {
//     dispatch(getNextID());
//   }
// });
// when the arguments passed through the callback props in mapDispatchToProps are the same as those passed to the action creaters, the entire function can be replaced by a plain object
const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { filter }
    }
  } = ownProps;
  return {
    id: state.nextId,
    todos: getVisibleTodos(state, filter)
  };
};
export default connect(
  mapStateToProps,
  { onTodoClick: toggleTodo, addTodo: addTodo, incID: getNextID }
)(ToDoApp);
