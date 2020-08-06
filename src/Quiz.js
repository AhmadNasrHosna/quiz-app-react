import React, { useEffect, useContext, useState } from "react";
import { useHistory, useLocation, useParams, Link } from "react-router-dom";

import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";
import Questionnaire from "./components/Questionnaire";

import { shuffle, millisToMinutesAndSeconds } from "./helpers";
import firebase from "./base";
import { Helmet } from "react-helmet";

function Quiz() {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const { quizId } = useParams();

  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [showStatus, setShowStatus] = useState(false);
  const [choosedYet, setChoosedYet] = useState(false);

  // Send off a network request to API to get the questions
  useEffect(() => {
    // 10 Questions
    const API_URL = `https://opentdb.com/api.php?amount=10&category=${appState.initialStatistics.category[0]}&difficulty=${appState.initialStatistics.difficulty}&type=multiple`;

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

    // Show correct message if the answer was correct
    if (isCorrectAnswer) {
      appDispatch({
        type: "flashMessage",
        value: "Correct Answer!",
        status: "success",
      });
    } else {
      appDispatch({
        type: "flashMessage",
        value: "Wrong Answer!",
        status: "wrong",
      });
    }

    changeQuestionTimerID = setTimeout(() => {
      // If the current displayed question have index 2,
      // Then we don't need to increase the currentIndex value to stop re-rendering of this component
      if (currentIndex === questions.length - 1) {
        // Increment score if correct

        appDispatch({
          type: "flashMessage",
          value: "Quiz has ended!",
          status: "success",
        });

        appDispatch({
          type: "updateInitialStatistics",
          value: {
            finished: true,
            score: appState.initialStatistics.score,
            timeEnd: Date.now(),
            time: millisToMinutesAndSeconds(
              Date.now() - appState.initialStatistics.timeStart
            ),
          },
        });

        push(`${pathname}/statistics`);

        return;
      }

      // Increment question counter
      setQuestionCounter(questionCounter + 1);

      // Clean the previous answer status
      setShowStatus(false);
      setChoosedYet(false);

      // Increment score if correct
      if (isCorrectAnswer) {
        appDispatch({ type: "increaseScore" });
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
      <Helmet>
        <title>
          {`${appState.initialStatistics.category[1]} - ${
            appState.initialStatistics.difficulty.split("")[0].toUpperCase() +
            appState.initialStatistics.difficulty.split("").splice(1).join("")
          } Quiz.`}
        </title>
      </Helmet>
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
          <p>{appState.initialStatistics.score}</p>
        </div>
      </div>
      <Link to="/">Choose another quiz?</Link>
    </> //
  );
}

export default Quiz;
