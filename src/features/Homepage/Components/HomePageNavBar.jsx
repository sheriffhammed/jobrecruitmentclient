import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setCredentials } from "../../auth/authSlice";
import { useLoginMutation } from "../../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectRoles } from "../../auth/authSlice";
import SignUp from './SignUp'

function HomePageNavBar() {
  //Modal Login
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setShowSignUp(false);
  };
  //Modal Sign up
  const [showSignUp, setShowSignUp] = useState(false);
  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => {
    setShowSignUp(true);
    setShow(false);
  };
  //Login Codes
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();


  //***********Login Form Start ****************/
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const email = data.email;
    const password = data.password;
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      navigate("/user");
      } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized User");
      } else {
        setErrMsg(
          "Login Failed, Please check your login details and try again"
        );
      }
    }
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
    
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
//***********Login Form End ****************/

return (
    <Navbar expand="lg" fluid>
      <Container fluid>
        <NavLink to="/homepage">
          <Navbar.Brand className="text-blue"> Job Portal</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end text-blue">
          <Nav>
            <Nav.Link className="text-blue" onClick={handleShow}>
              Login
            </Nav.Link>

            <Nav.Link className="text-blue" onClick={handleShowSignUp}>
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center">
          <Container
            className="row align-items-center justify-content-center"
            fluid
          >
            <div className="text-danger">{errMsg}</div>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Control
                type="email"
                id="email"
                style={{ width: "400px" }}
                className="border-danger "
                placeholder="Email"
                {...register("email")}
              />
              <div className="text-danger">{errors.email?.message}</div>

              <Form.Control
                type="password"
                id="password"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Password"
                {...register("password")}
              />
             
              <Button
                className="btn btn-secondary mt-3"
                style={{ width: "400px" }}
                type="submit"
              >
                Loin
              </Button>
             
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <h6>
            
            <a
              onClick={handleShowSignUp}
              style={{ cursor: "pointer" }}
              className="text-danger"
            >
              Create New Account
            </a>
          </h6>
        </Modal.Footer>
      </Modal>
      {showSignUp && <SignUp 
        show={showSignUp}
        handleClose={handleCloseSignUp}
        handleShow = {handleShow}
      /> }
      
      <Outlet />
    </Navbar>
  );
}

export default HomePageNavBar;
