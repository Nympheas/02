/**
 * LastestInterview
 *
 * Table item showing candidates latest interview
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";
import { formatInterviewDate } from "utils/format";

function LatestInterview({ interviews }) {
  if (!interviews || !interviews.length) {
    return <div></div>;
  }

  const latestInterview = interviews[interviews.length - 1];

  return (
    <>
      <p styleName="small">Interview Round {latestInterview.round}</p>
      <p styleName="strong">{latestInterview.status}</p>
      <p>{formatInterviewDate(latestInterview.startTimestamp)}</p>
    </>
  );
}

LatestInterview.propTypes = {
  interviews: PT.array,
};

export default LatestInterview;
