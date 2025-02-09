import Button from "react-bootstrap/Button";
import { useDeleteApplicationMutation } from "../applicationsApiSlice"

export default function DeleteButton({applicationId}) {    
    const [deleteApplication] = useDeleteApplicationMutation()
    //Delete Application
    const onDeleteApplication = async () => {
      const confirmAlert  = window.confirm("Are you sure you want to delete this application?")
      if(confirmAlert) { 
        await deleteApplication(applicationId)
      }
    }
 return (
        <>            
          <Button variant="outline-danger" size="sm" onClick={() => onDeleteApplication(applicationId)}> Delete Application </Button>
        </>
       
  );
}
