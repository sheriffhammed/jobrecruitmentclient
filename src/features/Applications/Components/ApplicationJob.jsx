import { useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TimeAgo from "../../Components/TimeAgo";
import DeleteButton from "../../Applications/Components/DeleteButton";
const ApplicationJob = ({
  applicationId,
  title,
  company,
  salary,
  location,
  description,
  createdAt,
 
}) => {
  const { userId } = useParams()
  return (
    <>
      <div class="list-group-item py-3">
          <h5 class="mb-1">{title}</h5>
          <div>
            <p class="mb-1">
              {company} - {location} 
              
            </p>
            <p class="mb-1">
              
              {description}
            </p>
            
            <p>Salary : £ {salary}</p>
            <DeleteButton applicationId={applicationId}/>
          </div>
          <small>Applied<TimeAgo timestamp={createdAt} /></small>
        </div>
    </>
  );
};

export default ApplicationJob;
