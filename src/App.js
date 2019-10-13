import React from "react";
import ToDoApp from "./components/ToDoApp";
import { Route } from "react-router-dom";

function App() {
  return <Route exact path="/:filter?" component={ToDoApp} />;
  // :filter is an optional param
}

export default App;
