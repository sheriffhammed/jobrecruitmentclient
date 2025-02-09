import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import { useGetExperienceQuery } from "../../../Sidebar/Experience/ExperienceApiSlice";
function AddJobField({show, handleClose}) {
   const {
    data: experiences,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExperienceQuery();
  
  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Add Job </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Container
            className="row align-items-center justify-content-center"
            fluid
            >
          <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Control
                type="text"
                id="firstName"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="firstName"
                {...register("firstName")}
                />
            <div className="text-danger">{errors.firstName?.message}</div>
            <Button
                className="btn btn-secondary mt-3"
                style={{ width: "400px" }}
                type="submit"
                >
                Add Job Field
            </Button>
            </Form>
        </Container>
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

export default AddJobField;
