import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddJob from './AddJob'
const AdminBanner = ({query, handleInputChange}) => {
  
  //Modal Add Job
  const [showAddJob, setShowAddJob] = useState(false);
  const handleCloseAddJob = () => setShowAddJob(false);
  const handleShowAddJob = () => {
    setShowAddJob(true);
  };
  return (
    <div className="container mt-3">
      <Container fluid>  
        
        <Container>
          <Row>
            <Col></Col>
            <Col xs={6}>
              <div className="text-light text-left mt-3 mb-3" >
                <Form.Control
                  className="me-auto"
                  placeholder="Search job by title here..."
                  onChange={handleInputChange}
                  value={query}
                />
              </div>
            </Col>
            <Col>
              
            </Col>
          </Row>
          <Row>
            <Col><div className="text-left">
                <Button variant="primary" onClick={handleShowAddJob}>
                Add New Job
                </Button>
              </div>
            </Col>
            <Col xs={6}></Col>
            <Col>
              
            </Col>
          </Row>
          
        </Container>        
      </Container>
       {showAddJob && <AddJob 
        show={showAddJob}
        handleClose={handleCloseAddJob}
        /> }
    </div>
  );
};

export default AdminBanner;
