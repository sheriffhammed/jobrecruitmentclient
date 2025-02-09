import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useGetUsersQuery } from "../../../User/userApiSlice";
function AdminUser({show, handleClose}) {
   const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  let contents;
  if(isLoading){
    contents = <div></div>
  }
  else if (isSuccess) {
  contents = users?.data.map(({_id,firstName,lastName,email}) => {
      return (
        <>
         <tr>
          <td>{_id}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>          
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
          <Modal.Title>Lists of all Registered Users</Modal.Title>
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
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>            
              
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

export default AdminUser;
