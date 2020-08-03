import React, { useEffect, useContext, useState } from "react";
import { useHistory, useLocation, useParams, Link } from "react-router-dom";

import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";
import Questionnaire from "./components/Questionnaire";

import { shuffle } from "./helpers";
import firebase from "./base";

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
  const statistics = useStatistics();

  const API_URL = `https://opentdb.com/api.php?amount=10&category=${appState.initialStatistics.category[0]}&difficulty=${appState.initialStatistics.difficulty}&type=multiple`;

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

  function useStatistics() {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
      firebase
        .firestore()
        .collection(quizId)
        .onSnapshot((snapshot) => {
          const newStatistics = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStatistics(newStatistics);
        });
    }, []);

    return statistics;
  }

  console.log(appState.initialStatistics);

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
        appDispatch({
          type: "flashMessage",
          value: "Quiz has ended!",
          status: "success",
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
      <Link to="/">Choose another challenge?</Link>
    </> //
  );
}

export default Quiz;
