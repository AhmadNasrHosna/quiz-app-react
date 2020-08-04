import React, { useState, useContext, useEffect } from "react";
import { slugify } from "../helpers";
import { useHistory } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import { Helmet } from "react-helmet";

function QuizPickerForm() {
  const { push } = useHistory();
  const [username, setUsername] = useState("");
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const [quizOptions, setQuizOptions] = useState({
    category: "23",
    difficulty: "easy",
  });

  useEffect(() => {
    if (appState.loggedIn) {
      setUsername(appState.user.username);
    }
  }, []);

  function getCategoryName() {
    switch (quizOptions.category) {
      case "11":
        return [11, "Movies"];
      case "18":
        return [18, "Computers"];
      case "23":
        return [23, "History"];
      default:
        return;
    }
  }

  function handleQuizFormSubmit(e) {
    e.preventDefault();
    const quizId = slugify(getCategoryName(), quizOptions.difficulty);

    appDispatch({
      type: "updateInitialStatistics",
      value: {
        username: username,
        category: getCategoryName(),
        difficulty: quizOptions.difficulty,
        date: new Date(Date.now()),
        timeStart: Date.now(),
        quizId: quizId,
      },
    });

    appDispatch({ type: "login", data: username });

    // Ready? message
    appDispatch({
      type: "flashMessage",
      value: `Welcome, ${username}! Are you ready? :)`,
      status: "success",
    });

    push(`quiz/${quizId}`);
  }

  return (
    <>
      <Helmet>
        <title>Quiz App - Dialymealz</title>
      </Helmet>
      <form className="c-quiz-form" onSubmit={(e) => handleQuizFormSubmit(e)}>
        <div className="c-quiz-form__group">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Your Name"
            onChange={(e) => setUsername(e.currentTarget.value)}
            defaultValue={username}
            required
            autoFocus={appState.loggedIn ? false : true}
          />
        </div>
        <div
          className="c-quiz-form__group c-quiz-form__category"
          onChange={(e) =>
            setQuizOptions({
              ...quizOptions,
              category: e.target.value,
            })
          }
        >
          <div className="c-radio">
            <input
              type="radio"
              id="history"
              name="category"
              required
              value="23"
            />
            <label htmlFor="history">History</label>
          </div>
          <div className="c-radio">
            <input type="radio" id="computers" name="category" value="18" />
            <label htmlFor="computers">Computers</label>
          </div>
          <div className="c-radio">
            <input type="radio" id="movies" name="category" value="11" />
            <label htmlFor="movies">Movies</label>
          </div>
        </div>
        <div
          className="c-quiz-form__group c-quiz-form__difficulty"
          onChange={(e) =>
            setQuizOptions({
              ...quizOptions,
              difficulty: e.target.value,
            })
          }
        >
          <div className="c-radio">
            <input
              type="radio"
              id="easy"
              name="difficulty"
              value="easy"
              required
            />
            <label htmlFor="easy">Easy</label>
          </div>
          <div className="c-radio">
            <input type="radio" id="medium" name="difficulty" value="medium" />
            <label htmlFor="medium">Medium</label>
          </div>
          <div className="c-radio">
            <input type="radio" id="hard" name="difficulty" value="hard" />
            <label htmlFor="hard">Hard</label>
          </div>
        </div>
        <input type="submit" value="Play" />
      </form>
    </>
  );
}

export default QuizPickerForm;
