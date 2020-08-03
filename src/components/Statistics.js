import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import StateContext from "../StateContext";
import getShareImage from "@jlengstorf/get-share-image";
import { Helmet } from "react-helmet";

function Statistics() {
  const { initialStatistics } = useContext(StateContext);

  const socialImage = getShareImage({
    title: `History Quiz Score:`,
    tagline: `${initialStatistics.score}/10`,
    cloudName: "dts7bwydo",
    imagePublicID: "social-share-template",
    textColor: "fff",
    titleExtraConfig: "_bold",
  });

  return (
    <>
      <Helmet>
        <title>{`History Quiz Score: ${initialStatistics.score}/10`}</title>
        <meta name="image" content={socialImage} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={`https://url.com`} />
        <meta
          property="og:title"
          content={`History Quiz Score: ${initialStatistics.score}/10`}
        />
        <meta property="og:image" content={socialImage} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content={socialImage} />
      </Helmet>
      <div className="c-statistics">
        <h2>Quiz has ended!</h2>
        <h3>You need more practice!</h3>
        <h4>Your Score: {initialStatistics.score}/10</h4>
        <p>
          <Link to="/">Another challenge?</Link>
        </p>
      </div>
    </>
  );
}

export default Statistics;
