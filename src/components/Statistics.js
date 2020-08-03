import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import StateContext from "../StateContext";
import getShareImage from "@jlengstorf/get-share-image";
import { Helmet } from "react-helmet";

function Statistics() {
  const { quiz, score } = useContext(StateContext);

  const socialImage = getShareImage({
    title: "How to be a x developer",
    tagline: "Learn all the tips from this one post",
    cloudName: "dts7bwydo",
    imagePublicID: "eb-template",
    titleFont: "Tahoma",
    titleExtraConfig: "_bold",
    taglineFont: "Roboto",
  });

  return (
    <>
      <Helmet>
        <title>My Title</title>
        <meta name="image" content={socialImage} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={`https://url.com`} />
        <meta
          property="og:title"
          content={`${quiz.category} Quiz Score: ${score}/10`}
        />
        <meta property="og:image" content={socialImage} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content={socialImage} />
      </Helmet>
      <div className="c-statistics">
        <h2>Quiz has ended!</h2>
        <h3>You need more practice!</h3>
        <h4>Your Score: {score}</h4>
        <p>
          <Link to="/quiz">Play again</Link> -{" "}
          <Link to="/">Another challenge</Link>
        </p>
      </div>
    </>
  );
}

export default Statistics;
