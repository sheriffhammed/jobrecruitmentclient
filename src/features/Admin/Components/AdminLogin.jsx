import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setCredentials } from "../../auth/authSlice";
import { useLoginMutation } from "../../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../AdminLogin.css"

const AdminLogin = () => {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const email = data.email;
    const password = data.password;
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      navigate("/admin");
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
  return (
    <>
        
        <Container className="justify-content-center login-container">
            <div className="headingBox">
                <h1 className="heading">Admin Login</h1>                
            </div>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="loginForm" >  
                <Form.Control
                    type="email"
                    id="email"
                    style={{ width: "400px" }}
                    className="inputField"
                    placeholder="Email"
                    {...register("email")}
                />
                <div className="text-danger">{errors.email?.message}</div>

                <Form.Control
                    type="password"
                    id="password"
                    
                    className="inputField"
                    placeholder="Password"
                    {...register("password")}
                />
                <div className="text-danger">{errors.email?.message}</div>
                <Button
                    className="sumbitBtn"
                    
                    type="submit"
                >
                    Continue with Email
                </Button>
              </div>
            </Form>
            
            
            <span id="loginMessage" className="loginMessage text-danger">{errMsg}</span>
            
        </Container>

    </>
  )
}

export default AdminLogin