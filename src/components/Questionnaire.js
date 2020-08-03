import React from "react";

function Questionnaire({
  handleAnswer,
  showStatus,
  questionCounter,
  chooseYet,
  question: { question, answers, correct_answer: correctAnswer },
}) {
  function getAnswerStatusClassName(answer) {
    return answer === correctAnswer
      ? "c-answer--correct"
      : "c-answer--incorrect";
  }

  return (
    <>
      <h2
        className="c-question__question"
        dangerouslySetInnerHTML={{
          __html: questionCounter + ". " + question,
        }}
      />
      <div className="c-question__answers">
        {answers.map((answer, i) => (
          <button
            key={i}
            className={`c-answer  ${
              showStatus ? getAnswerStatusClassName(answer) : ""
            }`}
            answer={answer}
            onClick={() => handleAnswer(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
            disabled={chooseYet ? true : false}
            data-hint={answer === correctAnswer ? "correct" : ""}
          />
        ))}
      </div>
    </> //
  );
}

export default Questionnaire;
