import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Pomodoro } from "./components/Pomodoro";
import "font-awesome/css/font-awesome.min.css";
import { store } from "./store/index.jsx";

function App() {
  return (
    <Provider store={store}>
      <Pomodoro />
    </Provider>
  );
}

export default App;
