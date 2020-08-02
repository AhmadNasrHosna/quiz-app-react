import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Quiz from "./Quiz";
import SvgBackground from "./components/SvgBackground";

import "./index.css";

function App() {
  const baseState = {
    loggedIn: Boolean(localStorage.getItem("writescapeLoggedInUser")),
    user: JSON.parse(localStorage.getItem("writescapeLoggedInUser")) || {},
    flashMessages: [],
    isSearchOpen: false,
    isChatOpen: false,
    unreadChatCount: 0,
  };

  function reducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, baseState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <div className="o-page">
            <SvgBackground />
            <Header />
            <main className="o-main">
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/quiz">
                  <Quiz />
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
