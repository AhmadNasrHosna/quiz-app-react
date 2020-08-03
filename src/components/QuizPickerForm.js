import React, { useState, useContext } from "react";
import { slugify } from "../helpers";
import { useHistory } from "react-router-dom";
import DispatchContext from "../DispatchContext";

function QuizPickerForm() {
  const { push } = useHistory();
  const [username, setUsername] = useState("");
  const appDispatch = useContext(DispatchContext);
  const [quizOptions, setQuizOptions] = useState({
    category: "23",
    difficulty: "easy",
  });

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
    const quizId = slugify(quizOptions);

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

    // Ready? message
    appDispatch({
      type: "flashMessage",
      value: "Are you ready? :)",
      status: "success",
    });

    push(`quiz/${quizId}`);
  }

  return (
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
          autoFocus
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
  );
}

export default QuizPickerForm;
