import React, { useEffect, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";
import Questionnaire from "./components/Questionnaire";

import { shuffle } from "./helpers";

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";

function Quiz() {
  const { push } = useHistory();
  const { pathname } = useLocation();

  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [showStatus, setShowStatus] = useState(false);
  const [choosedYet, setChoosedYet] = useState(false);

  // Send off a network request to API to get the questions
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(({ results }) => {
        const questionsWithShuffledAnswers = results.map((question, i) => {
          return {
            ...question,
            answers: shuffle([
              question.correct_answer,
              ...question.incorrect_answers,
            ]),
            questionIndex: i,
          };
        });

        setQuestions(questionsWithShuffledAnswers);
      });
  }, []);

  // Track the answers
  function handleAnswer(answer) {
    const isCorrectAnswer = answer === questions[currentIndex].correct_answer;
    let changeQuestionTimerID;

    // Show status of answer and prevent doubled answers
    setChoosedYet(true);
    setShowStatus(true);

    changeQuestionTimerID = setTimeout(() => {
      // Increment question counter
      setQuestionCounter(questionCounter + 1);

      // Clean the previous answer status
      setShowStatus(false);

      setChoosedYet(false);

      // Increment score if correct
      if (isCorrectAnswer) {
        appDispatch({ type: "increaseScore" });
      }

      // If the current displayed question have index 2,
      // Then we don't need to increase the currentIndex value to stop re-rendering of this component
      if (currentIndex === questions.length - 1) {
        push(`${pathname}/statistics`);
        return;
      }

      // Show next question after highlighting the results
      setCurrentIndex(currentIndex + 1);

      clearTimeout(changeQuestionTimerID);
    }, 1000);
  }

  if (!questions.length) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="c-quiz">
        <div className="c-track">
          <span>{questionCounter}</span>/ {questions.length}
        </div>
        <Questionnaire
          showStatus={showStatus}
          question={questions[currentIndex]}
          questionCounter={questionCounter}
          handleAnswer={handleAnswer}
          chooseYet={choosedYet}
        />
        <div className="c-score">
          <p>{appState.score}</p>
        </div>
      </div>
    </> //
  );
}

export default Quiz;
