import React, { useEffect } from "react";
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

import firebase from "./base";
import "./index.css";

function App() {
  const baseState = {
    flashMessages: [],
    username: "",
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
  };
  function reducer(draft, action) {
    switch (action.type) {
      case "increaseScore":
        draft.initialStatistics.score += 1;
        return;
      case "flashMessage":
        draft.flashMessages.push({ text: action.value, status: action.status });
        return;
      case "updateInitialStatistics":
        draft.initialStatistics = action.value;
        return;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, baseState);
  console.log(state.initialStatistics);

  useEffect(() => {
    if (state.initialStatistics.quizId !== "") {
      firebase.firestore().collection(state.initialStatistics.quizId).add({
        statistics: state.initialStatistics,
      });
    }
  }, [state.initialStatistics.quizId]);

  console.log(state.initialStatistics);

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
