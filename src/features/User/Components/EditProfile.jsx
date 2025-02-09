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
          selectEmail,
        selectUserId} from "../../auth/authSlice"
import { useUpdateUserMutation } from '../userApiSlice';
import { useLazyLogoutQuery } from '../../auth/authApiSlice';

export const EditProfile = ({show, handleClose, userId}) => {
    const navigate = useNavigate()
    const firstName = useSelector(selectFirstName)
    const lastName = useSelector(selectLastName)
     const email = useSelector(selectEmail)
    const [updateUser]  = useUpdateUserMutation()
    const [trigger, {logout , isSuccess}] = useLazyLogoutQuery()

    const onSubmit = async (data, e) => {
      e.preventDefault();
      const requestBody = {
        id: userId,
        ...data
      }
      await updateUser(requestBody)
      alert("Record Updated Succesfully, You have to Re-Login to see changes")


      reset({
        firstName: "",
        lastName: "",        
        email: ""
      })
   
    }

      const schema = yup.object().shape({
        firstName: yup.string().required("First Name Required!"),
        lastName: yup.string().required("lastName Required!"),
        email: yup.string().email().required(),
               
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
            
              <Form.Control
                type="text"
                id="firstName"
                style={{ width: "400px" }}
                className="border-danger mt-1 "
                placeholder="firstName"
                {...register("firstName")}
                defaultValue = {firstName}
              />
              <div className="text-danger">{errors.firstName?.message}</div>

            
              <Form.Control
                type="text"
                id="lastName"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="lastName"
                {...register("lastName")}
                defaultValue = {lastName}
              />
              <div className="text-danger">{errors.lastName?.message}</div>

            
              <Form.Control
                type="email"
                id="email"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Email"
                {...register("email")}
                defaultValue = {email}
              />
              <div className="text-danger">{errors.email?.message}</div>
            
            </Container>
              </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
  )
}
