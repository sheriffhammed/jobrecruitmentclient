//eslint-disable react/prop-types;
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TimeAgo from "../../Components/TimeAgo";
import ApplicationButton from "../../Applications/Components/ApplicationButton";
import ActionButtons from "./ActionButtons";
import { useSelector } from "react-redux";
import { selectRoles } from "../../auth/authSlice";
const JobListing = ({
  jobId,
  title,
  company,
  salary,
  location,
  description,
  createdAt,
  modeOfWork,
  jobType,
  experience,
}) => {
  const roles = useSelector(selectRoles);

  let actionButtons;
  actionButtons = !roles ? (
    <ApplicationButton jobId={jobId} />
  ) : roles.includes(100) ? (
    <ActionButtons jobId={jobId} />
  ) : (
    <ApplicationButton jobId={jobId} />
  );
  return (
    <>
      <div class="list-group-item py-3">
        <h5 class="mb-1">{title}</h5>
        <div>
          <p class="mb-1 fw-bold">
            {company} - {location} ({modeOfWork} | {jobType} | {experience})
          </p>
          <p class="mb-1">{description}</p>
          <p>Salary : £ {salary}</p>
          {actionButtons}
        </div>
        <small>
          Posted
          <TimeAgo timestamp={createdAt} />
        </small>
      </div>
    </>
  );
};

export default JobListing;
