import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditJob from '../../Admin/Components/Job/EditJob'
import { useDeleteJobMutation } from "../jobApiSlice"

export default function ActionButtons({jobId}) {      
  const [deleteJob] = useDeleteJobMutation()

  //Modal Edit Job
  const [showEditJob, setShowEditJob] = useState(false);
  const handleCloseEditJob = () => setShowEditJob(false);
  const handleShowEditJob = () => {
    setShowEditJob(true);
  };

   const onSubmit = async (data, e) => {
      e.preventDefault();
      const requestBody = {
        id: jobId,
        ...data
      }
      await updateUser(requestBody)
      alert("Record Updated Succesfully, You have to Re-Login to see changes")

      reset({
        firstName: "",
        lastName: "",        
        email: ""
      })
   
    }

    //Delete Application
    const onDeleteJob = async () => {
      const confirmAlert  = window.confirm("Are you sure you want to delete this job?")
      if(confirmAlert) { 
        await deleteJob(jobId)
      }
    }
 
return (
        <>
            <div>
              <Button variant="outline-info" size="sm" onClick={handleShowEditJob}>Edit Job</Button> &nbsp;
              <Button variant="outline-danger" size="sm" onClick={onDeleteJob}> Delete Job </Button> 
            </div>
            {showEditJob && <EditJob 
              show={showEditJob}
              handleClose={handleCloseEditJob}
              jobId={jobId}
        /> }
         </>
   );
}
