/**
 * JobDetails
 *
 * Page for job details.
 * It gets `teamId` and `jobId` from the router.
 */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PT from "prop-types";
import _ from "lodash";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import { useData } from "hooks/useData";
import { getJobById } from "services/jobs";
import { getSkills } from "services/skills";
import { getSelectOptionByValue } from "utils/helpers";
import LoadingIndicator from "../../components/LoadingIndicator";
import MarkdownEditorViewer from "../../components/MarkdownEditorViewer";
import withAuthentication from "../../hoc/withAuthentication";
import DataItem from "../../components/DataItem";
import IconSkill from "../../assets/images/icon-skill.svg";
import IconComputer from "../../assets/images/icon-computer.svg";
import IconDescription from "../../assets/images/icon-description.svg";
import IconOpenings from "../../assets/images/icon-openings.svg";
import Button from "../../components/Button";
import { RESOURCE_TYPE_OPTIONS } from "../../constants";
import { formatDate } from "utils/format";
import "./styles.module.scss";
import { hasPermission } from "utils/permissions";
import { PERMISSIONS } from "constants/permissions";

const JobDetails = ({ teamId, jobId }) => {
  const [job, loadingError] = useData(getJobById, jobId);
  const [skills] = useData(getSkills);
  const [skillSet, setSkillSet] = useState(null);
  const { id: userId } = useSelector((state) => state.authUser.v5UserProfile);

  useEffect(() => {
    if (!!skills && !!job) {
      setSkillSet(
        job.skills
          // map skill ids to names
          ?.map((skillId) => {
            const skill = _.find(skills, { id: skillId });

            if (!skill) {
              console.warn(
                `Couldn't find name for skill id "${skillId}" of the job "${job.id}".`
              );
              return null;
            }

            return skill.name;
          })
          // remove `null` values for skills when we couldn't find the name
          .filter((skillName) => !!skillName)
          .join(", ")
      );
    }
  }, [job, skills]);

  return (
    <Page title="Job Details">
      {!job || !skills ? (
        <LoadingIndicator error={loadingError} />
      ) : (
        <>
          <PageHeader title={job.title} backTo={`/taas/myteams/${teamId}`} />
          <div styleName="job-summary">
            <div styleName="data-items">
              <DataItem title="Job Name" icon={<IconComputer />}>
                {job.title}
              </DataItem>
              <DataItem title="Job Description" icon={<IconDescription />}>
                <MarkdownEditorViewer value={job.description} />
              </DataItem>
              <DataItem title="Number of Openings" icon={<IconOpenings />}>
                {job.numPositions}
              </DataItem>
              <DataItem title="Job Skills" icon={<IconSkill />}>
                {skillSet}
              </DataItem>
              <DataItem title="Start Date" icon={<IconDescription />}>
                {formatDate(job.startDate)}
              </DataItem>
              <DataItem title="Duration (weekly)" icon={<IconDescription />}>
                {job.duration || "TBD"}
              </DataItem>
              <DataItem title="Resource Type" icon={<IconDescription />}>
                {_.get(
                  getSelectOptionByValue(
                    job.resourceType,
                    RESOURCE_TYPE_OPTIONS
                  ),
                  "label"
                )}
              </DataItem>
              <DataItem
                title="Resource Rate Frequency"
                icon={<IconDescription />}
              >
                {job.rateType}
              </DataItem>
              <DataItem title="Workload" icon={<IconDescription />}>
                {job.workload}
              </DataItem>
              <DataItem title="Status" icon={<IconDescription />}>
                {job.status}
              </DataItem>
            </div>
            {(hasPermission(PERMISSIONS.UPDATE_JOB_NOT_OWN) ||
              userId === job.createdBy) && (
              <div styleName="actions">
                <Button
                  target="_blank"
                  size="medium"
                  className="editButton"
                  routeTo={`/taas/myteams/${teamId}/positions/${job.id}/edit`}
                >
                  Edit Job Details
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </Page>
  );
};

JobDetails.propTypes = {
  teamId: PT.string,
  jobId: PT.string,
};

export default withAuthentication(JobDetails);
