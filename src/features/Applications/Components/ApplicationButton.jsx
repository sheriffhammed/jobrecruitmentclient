import { useEffect } from 'react';
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';

import { selectUserId } from "../../auth/authSlice"
import { useGetApplicationsQuery,useAddApplicationMutation } from "../applicationsApiSlice"

export default function ApplicationButton({jobId}) {   
   
  const userId = useSelector(selectUserId)
  const {data: selectApplicationByjobId } = useGetApplicationsQuery(jobId)
  const isUserAppllied = selectApplicationByjobId?.data.find(application => application.user?._id === userId)
  
  const [addApplication] = useAddApplicationMutation()
  //Apply for job
    const onApplyClicked = async () => {
      !userId ? alert("Please login or Signup before you can apply for any job !!!")
      : await addApplication({jobId,userId})
    }

 
return (
        <>
        {isUserAppllied 
          ? 
          <>
            <div>
              <Button variant="outline-secondary" size="sm" disabled >Already Applied</Button>
               &nbsp; {selectApplicationByjobId?.data.length} Applicant(s)
            </div>
          </>
          : 
          <>
            <div>
              <Button variant="outline-primary" size="sm" onClick={onApplyClicked}> Apply </Button> 
               &nbsp; {selectApplicationByjobId?.data.length}  Applicant(s) 
            </div>
          </>
        }
        </>
       
  );
}
