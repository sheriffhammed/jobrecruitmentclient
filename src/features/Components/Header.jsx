import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'react-bootstrap/Image';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { selectLastName, 
         selectFirstName,
         selectUserId } from "../auth/authSlice"
import { useLazyLogoutQuery } from '../auth/authApiSlice';
import {stringToColor, stringAvatar} from './Avatar'

import {EditProfile} from '../User/Components/EditProfile';
import { useSelector } from "react-redux";

function Header() {
  const [auth, setAuth] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const firstName = useSelector(selectFirstName)
  const lastName = useSelector(selectLastName)
  const userId = useSelector(selectUserId)
  const [trigger, {logout , isSuccess}] = useLazyLogoutQuery()
  const names = firstName + " " + lastName
  const navigate = useNavigate()

   const handleLogout = () => {
    const confirmAlert  = window.confirm("Are you sure you want to log out?")
    if(confirmAlert) { 
      trigger()
      setAuth(false)      
      }
    }

  const handleOpenProfile = (userId) => {
    setOpenProfile(true);
    
  };

  const handleClickClose = () => {
    setOpenProfile(false);
    
  };
  
  return (
    <>
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Job Portal</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
           {"Hello  " + firstName }          
           
          <Dropdown as={ButtonGroup}>             
            <Dropdown.Toggle {...stringAvatar(names)} roundedCircle id="dropdown-split-basic" />
            <Dropdown.Menu className="fw-light">
              <Dropdown.Item onClick={() => handleOpenProfile()}>Edit Profile</Dropdown.Item>
              <Dropdown.Item>Change Password</Dropdown.Item>
              <Dropdown.Item>My Applications</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLogout()}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          
          </Navbar.Text>
          
        </Navbar.Collapse>
      </Container>
       {openProfile && <EditProfile 
        show={openProfile}
        handleClose={handleClickClose}
        userId = {userId}
      /> }
       {!auth &&
        navigate('../../homepage')
      }
      
    </Navbar>
   <Outlet />
   </>
  );
}

export default Header;
