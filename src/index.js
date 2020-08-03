import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import Header from "./Header";
import Footer from "./Footer";
import Quiz from "./Quiz";
import SvgBackground from "./components/SvgBackground";
import QuizPickerForm from "./components/QuizPickerForm";
import FlashMessages from "./components/FlashMessages";
import Statistics from "./components/Statistics";

import "./index.css";

function App() {
  const baseState = {
    loggedIn: Boolean(localStorage.getItem("writescapeLoggedInUser")),
    user: JSON.parse(localStorage.getItem("writescapeLoggedInUser")) || {},
    flashMessages: [],
    score: 0,
  };

  function reducer(draft, action) {
    switch (action.type) {
      case "increaseScore":
        draft.score++;
        return;
      case "flashMessage":
        draft.flashMessages.push({ text: action.value, status: action.status });
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, baseState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <div className="o-page">
            <FlashMessages messages={state.flashMessages} />
            <SvgBackground />
            <Header />
            <main className="o-main">
              <Switch>
                <Route path="/" exact component={QuizPickerForm} />
                <Route path="/quiz/:quizId" exact component={Quiz} />
                <Route path="/quiz/:quizId/statistics" component={Statistics} />
              </Switch>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
