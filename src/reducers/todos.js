const actionTypes = {
  addTodo: "ADD_TODO",
  toggleTodo: "TOGGLE_TODO"
};
// actions
export const addTodo = (text, id) => ({
  type: actionTypes.addTodo,
  id,
  text
});
export const toggleTodo = id => ({
  type: actionTypes.toggleTodo,
  id
});
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

export default todos;

// selectors are used to further pare down the slice of state that view components get
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case "all":
      return state;
    case "active":
      return state.filter(todo => !todo.completed);
    case "completed":
      return state.filter(todo => todo.completed);
    default:
      return state;
  }
};
