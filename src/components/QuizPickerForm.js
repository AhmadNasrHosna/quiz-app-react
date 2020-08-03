import React, { useState } from "react";
import { slugify } from "../helpers";
import { useHistory } from "react-router-dom";

function QuizPickerForm() {
  const { push } = useHistory();

  const [username, setUsername] = useState("");
  const [quizOptions, setQuizOptions] = useState({
    category: "23",
    difficulty: "easy",
  });

  const API_URL = `https://opentdb.com/api.php?amount=10&category=${quizOptions.category}&difficulty=${quizOptions.difficulty}&type=multiple`;

  console.log(quizOptions);

  function handleQuizFormSubmit(e) {
    e.preventDefault();
    const quizId = slugify(
      username,
      `${quizOptions.category}-${quizOptions.difficulty}-`
    );
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
          <input type="radio" id="math" name="category" value="19" />
          <label htmlFor="math">Math</label>
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
