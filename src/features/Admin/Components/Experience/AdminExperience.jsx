import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useGetExperienceQuery } from "../../../Sidebar/Experience/ExperienceApiSlice";
function AdminExperience({show, handleClose}) {
   const {
    data: experiences,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExperienceQuery();
  let contents;
  if(isLoading){
    contents = <div></div>
  }
  else if (isSuccess) {
  contents = experiences?.data.map(({_id,description,createdAt}) => {
      return (
        <>
         <tr>
          <td>{_id}</td>
          <td>{description}</td>
          <td>{createdAt}</td>
          
        </tr>
        
        </>
      )
  })
  } else if (isError) {
    console.log(error.error)
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Lists of Experience Field</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <div className="text-right">
            <Button className="text-ceneter" variant="primary" >
            Add New
            </Button>
          </div> */}
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Created Date</th>
              
            </tr>
          </thead>
          <tbody>
            {contents}
          </tbody>
      </Table>
        </Modal.Body>

       <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
   
  </>
  );
}

export default AdminExperience;
