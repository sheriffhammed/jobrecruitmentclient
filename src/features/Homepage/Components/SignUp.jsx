import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddUserMutation } from '../../User/userApiSlice';

const SignUp = ({show, handleClose, handleShow}) => {
    const [showSuccess, setShowSuccess] = useState("")
    const [addUser] = useAddUserMutation()
    const onSubmit = async (data, e) => {
    e.preventDefault();
    const requestBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password              
    }
    await addUser(requestBody)
    setShowSuccess("User Registration Succesful!!!")
    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name Required!"),
    lastName: yup.string().required("Surname Required!"),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center">
            <Container
            className="row align-items-center justify-content-center"
            fluid
            >
            <div className="text-success">{showSuccess}</div>
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
                <Form.Control
                type="text"
                id="lastName"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="lastName"
                {...register("lastName")}
                />
                <div className="text-danger">{errors.lastName?.message}</div>
                <Form.Control
                type="email"
                id="email"
                style={{ width: "400px" }}
                className="border-danger mt-1"
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
                <div className="text-danger">{errors.password?.message}</div>
                <Form.Control
                type="password"
                id="confirmPassword"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                />
                <div className="text-danger">{errors.confirmPassword?.message}</div>
                <Button
                className="btn btn-secondary mt-3"
                style={{ width: "400px" }}
                type="submit"
                >
                Create an Account
                </Button>
               
            </Form>            
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <h6>
            Already have an Account?{" "}
            <a
                onClick={handleShow}
                style={{ cursor: "pointer" }}
                className="text-danger"
            >
                Login
            </a>
            </h6>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default SignUp