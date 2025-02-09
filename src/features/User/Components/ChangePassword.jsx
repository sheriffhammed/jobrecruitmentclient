import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux'

import { selectLastName, 
          selectFirstName,
          selectEmail} from "../../auth/authSlice"
import { useUpdateUserMutation } from '../userApiSlice';
import { useLazyLogoutQuery } from '../../auth/authApiSlice';

export const EditProfile = ({show, handleClose}) => {
     const onSubmit = async (data, e) => {
      e.preventDefault();
      const requestBody = {
        id : userId,
        ...data
      }
      await updateUser(requestBody)
      alert("Record Updated Succesfully, You have to Re-Login to see changes")
      trigger()
      navigate("../../login"); 

      reset({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
      })
   
    }

      const schema = yup.object().shape({
        firstName: yup.string().required("First Name Required!"),
        lastName: yup.string().required("lastName Required!"),
        email: yup.string().email().required(),
        phone: yup.number().positive().integer().required(),
        
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
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body  className="justify-content-center">
            <Container
            className="row align-items-center justify-content-center"
            fluid
            >
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Control
                type="text"
                id="firstname"
                style={{ width: "400px" }}
                className="border-danger mt-1 "
                placeholder="Firstname"
                {...register("firstname")}
              />
              <div className="text-danger">{errors.firstname?.message}</div>

            
              <Form.Control
                type="text"
                id="lastname"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Lastname"
                {...register("lastname")}
              />
              <div className="text-danger">{errors.lastname?.message}</div>

            
              <Form.Control
                type="email"
                id="email"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Email"
                {...register("email")}
              />
              <div className="text-danger">{errors.email?.message}</div>
            </Form>
            </Container>
              </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
  )
}
