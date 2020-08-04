import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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

import firebase from "./base";
import "./index.css";

function App() {
  const baseState = {
    loggedIn: Boolean(localStorage.getItem("quizappLoggedInUser")),
    user: JSON.parse(localStorage.getItem("quizappLoggedInUser")) || {},
    initialStatistics: {
      username: "",
      category: "",
      difficulty: "",
      date: "",
      timeStart: "",
      finished: false,
      timeEnd: "",
      time: "",
      quizId: "",
      score: 0,
    },
    flashMessages: [],
  };
  function reducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user.username = action.data;
        return;
      case "increaseScore":
        draft.initialStatistics.score += 1;
        return;
      case "flashMessage":
        draft.flashMessages.push({ text: action.value, status: action.status });
        return;
      case "updateInitialStatistics":
        draft.initialStatistics = {
          ...draft.initialStatistics,
          ...action.value,
        };
        return;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, baseState);

  useEffect(() => {
    if (state.initialStatistics.quizId !== "") {
      firebase.firestore().collection(state.initialStatistics.quizId).add({
        statistics: state.initialStatistics,
      });
    }

    if (state.loggedIn) {
      localStorage.setItem("quizappLoggedInUser", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("quizappLoggedInUser");
    }
  }, [state.initialStatistics.quizId, state.initialStatistics.loggedIn]);

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
                <Route path="/quiz/:quizId" exact>
                  {!state.initialStatistics.quizId ? (
                    <Redirect to="/" />
                  ) : (
                    <Quiz />
                  )}
                </Route>
                <Route path="/quiz/:quizId/statistics">
                  {!state.initialStatistics.finished ? (
                    <Redirect to="/" />
                  ) : (
                    <Statistics />
                  )}
                </Route>
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
