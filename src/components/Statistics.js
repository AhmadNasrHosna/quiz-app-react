import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StateContext from "../StateContext";
import getShareImage from "@jlengstorf/get-share-image";
import { Helmet } from "react-helmet";
import ShareIcons from "./ShareIcons";
import firebase from "../base";
import Quiz from "../Quiz";

function Statistics() {
  const [quizStatistics, setQuizStatistics] = useState(null);
  const { quizId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const quizzes = await firebase.firestore().collection("quizzes").get();
      const quiz = quizzes.docs
        .map((doc) => doc.data())
        .filter((quiz) => quiz[quizId]);

      if (quiz.length === 0) {
        setQuizStatistics(undefined);
      } else if (quiz.length === 1) {
        setQuizStatistics(quiz[0][quizId].statistics);
      }
    };
    fetchData();
  }, []);

  if (quizStatistics === null) {
    return <p>Loading...</p>;
  }

  if (quizStatistics === undefined) {
    return <p>404</p>;
  }

  const socialImage = getShareImage({
    title: `${quizStatistics.category[1]} Quiz Score:`,
    tagline: `${quizStatistics.score}/10`,
    cloudName: "dts7bwydo",
    imagePublicID: "social-share-template",
    textColor: "fff",
    titleExtraConfig: "_bold",
  });

  return (
    <>
      <Helmet>
        <title>{`${quizStatistics.category[1]} Quiz Score: ${quizStatistics.score}/10`}</title>
        <meta name="image" content={socialImage} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={`https://url.com`} />
        <meta
          property="og:title"
          content={`${quizStatistics.category[1]} Quiz Score: ${quizStatistics.score}/10`}
        />
        <meta property="og:image" content={socialImage} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content={socialImage} />
      </Helmet>
      <div className="c-statistics">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#6d407d"
          viewBox="0 0 100 100"
        >
          <path d="M5 88.8l24.3.1c1.4 0 2.8-.4 4-1.1s1.4-1.5 1.3-4.2c3.3-.4 6.8-.8 9.9.6 1.8.8 3.2 2.2 4.8 3.3 7.7 5.5 18.1 5 27.3 3.3 2.9-.5 5.9-1.2 8.3-2.8 2.4-1.6 4.1-4 5.4-6.5 3.6-6.9 4.3-14.9 4.5-22.7.1-4.4 0-9.1-2.5-12.6-.5-.7-1-1.3-1.6-1.8-2.8-2.5-6.7-3.6-10.5-3.9-4.6-.3-9.2.6-13.8.7 2.8-7.3 5.6-14.8 5.5-22.6 0-3.3-.7-6.7-3.3-8.9-3-2.5-7.6-2.4-10.4.3-2.8 2.6-2.9 6.6-3.5 10.2C53 31.8 45.6 43 34.4 46.6c0-1.9-.5-2.8-1.6-3.5-1.1-.6-2.3-.9-3.5-.9H10.8c-1.4 0-2.8-.1-4.1 0-1.7.1-1.7 0-1.9 1.6l.2 45zM90.6 57c-.1.7-.1 1.4-.1 2v.8c0 4.3.2 17.5-8.1 25-1.4.9-10.5 3.3-19.4 2.9-4.9-.2-9.5-1.9-12.9-4.8-.3-.2-.5-.5-.8-.7-2.1-2-5-3.1-8.1-3.1H41l-6.3.1v-28l.6-.1c2.3-.6 22.1-6.2 24.5-34.6.1-1.5.8-2.8 1.9-3.5.6-.4 1.7-.9 3.2-.4 1 .3 1.7.9 2.2 2 1.1 2.4 2 9-5 26.5-.3.9-.4 1.9 0 2.7.6 1.3 1.9 2.1 3.3 2l10.7-.8c1.5-.1 3-.1 4.5.1l2.3.3c1.4.2 3.5.7 5.1 2.3 2.1 2.1 3 5.2 2.6 9.3z"></path>
        </svg>
        <h2>Quiz has ended!</h2>
        <h3>Better luck next time, {quizStatistics.username}!</h3>
        <p>
          <strong>Quiz:</strong>{" "}
          {quizStatistics.category[1] +
            " | " +
            quizStatistics.difficulty.split("")[0].toUpperCase() +
            quizStatistics.difficulty.split("").splice(1).join("")}
        </p>
        <p>
          <strong>Your Score:</strong> {quizStatistics.score}/10
        </p>
        <p>
          <strong>Time Duration:</strong> {quizStatistics.time}
        </p>
        <ShareIcons
          title={`${quizStatistics.category[1]} Quiz Score: ${quizStatistics.score}/10`}
        />
        <p>
          <Link to="/">Another challenge?</Link>
        </p>
      </div>
    </> //
  );
}

export default Statistics;
