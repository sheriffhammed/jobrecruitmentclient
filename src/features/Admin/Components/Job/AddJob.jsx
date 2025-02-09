import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetJobTypesQuery } from "../../../Sidebar/JobType/jobTypeApiSlice";
import { useGetModeOfWorkQuery } from "../../../Sidebar/ModeOfWork/modeOfWorkApiSlice";
import { useGetIndustryQuery } from "../../../Sidebar/Industry/industryApiSlice";
import { useGetExperienceQuery } from "../../../Sidebar/Experience/ExperienceApiSlice";
import { useAddJobMutation } from '../../../Joblisting/jobApiSlice';
import {useSelector } from 'react-redux'
import { selectUserId} from "../../../auth/authSlice"
function AddJob({show, handleClose}) {
   const [showSuccess, setShowSuccess] = useState("")
   const [addJob] = useAddJobMutation()
   const userId = useSelector(selectUserId) 
    //get job type values
     const {data: jobTypes } = useGetJobTypesQuery();
     let jobTypesOptions = jobTypes?.data.map(({_id,description}) => {
      return (
        <>
            <option id="jobType" value={_id}>{description}</option>        
        </>
      )
  })
    //get mode of work values
     const {data: modeOfWorks } = useGetModeOfWorkQuery();
     let modeOfWorksOptions = modeOfWorks?.data.map(({_id,description}) => {
      return (
        <>
            <option id="jobType" value={_id}>{description}</option>        
        </>
      )
  })
    //get indudtry values
     const {data: industry } = useGetIndustryQuery();
     let industryOptions = industry?.data.map(({_id,description}) => {
      return (
        <>
            <option id="jobType" value={_id}>{description}</option>        
        </>
      )
  })
    //get experience values
     const {data: experience } = useGetExperienceQuery();
     let experienceOptions = experience?.data.map(({_id,description}) => {
      return (
        <>
            <option id="jobType" value={_id}>{description}</option>        
        </>
      )
  })
    //Form
    const onSubmit = async (data, e) => {
    e.preventDefault();
    const requestBody = {
      title: data.title,
       description: data.description,
       company: data.company,
       salary: data.salary,
       location: data.location,
       jobType: data.jobType,
       modeOfWork: data.modeOfWork,
       industry: data.industry,
       experience: data.experience,
       user: userId                 
    }
    await addJob(requestBody)
    setShowSuccess("Job Added Succesfully!!!")
    reset({
      title: "",
       description: "",
       company: "",
       salary: "",
       location: "",
       jobType: "",
       modeOfWork: "",
       industry: "",
       experience: "",
       
    })
  }

  const schema = yup.object().shape({
    title: yup.string().required("Title Required!"),
    description: yup.string().required("Description Required!"),
    company: yup.string().required("Company Required!"),
    salary: yup.string().required("Salary Required!"),
    location: yup.string().required("Location Required!"),
    jobType: yup.string().required("Job Type Required!"),
    modeOfWork: yup.string().required("Mode of work Required!"),
    industry: yup.string().required("Industry Required!"),
    experience: yup.string().required("Experience Required!"),
     
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
          <Modal.Title>Add New Job</Modal.Title>
        </Modal.Header>
            
        <Modal.Body>
          <Container
            className="row align-items-center justify-content-center"
            fluid
            >
            <div className="text-success">{showSuccess}</div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Control
                type="text"
                id="title"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Title"
                {...register("title")}
                />
                <div className="text-danger">{errors.title?.message}</div>
                <Form.Control
                as="textarea"
                id="description"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Description"
                {...register("description")}
                />
                <div className="text-danger">{errors.description?.message}</div>
                <Form.Control
                type="text"
                id="company"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Company"
                {...register("company")}
                />
                <div className="text-danger">{errors.company?.message}</div>
                <Form.Control
                type="number"
                id="salary"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Salary"
                {...register("salary")}
                />
                <div className="text-danger">{errors.salary?.message}</div>
                <Form.Control
                type="text"
                id="location"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Location"
                {...register("location")}
                />
                <div className="text-danger">{errors.location?.message}</div>
                <div className="text-secondary mt-1">Job Type</div>
                <Form.Select
                    id="jobType"
                    style={{ width: "400px", height : "40px" }}
                    className="border-danger mt-1"
                    {...register("jobType")}
                >                
                    {jobTypesOptions}
                </Form.Select>
                <div className="text-secondary mt-1">Mode of Work</div>
                <Form.Select
                    id="modeofwork"
                    style={{ width: "400px", height : "40px" }}
                    className="border-danger mt-1"
                    {...register("modeOfWork")}
                >                
                    {modeOfWorksOptions}
                </Form.Select>
                <div className="text-danger">{errors.modeOfWork?.message}</div>
                <div className="text-secondary mt-1">Industry</div>
                <Form.Select
                    id="industry"
                    style={{ width: "400px", height : "40px" }}
                    className="border-danger mt-1"
                    {...register("industry")}
                >                
                    {industryOptions}
                </Form.Select>
                <div className="text-danger">{errors.industry?.message}</div>
                <div className="text-secondary mt-1">Experience</div>
                <Form.Select
                    id="experience"
                    style={{ width: "400px", height : "40px" }}
                    className="border-danger mt-1"
                    {...register("experience")}
                >                
                    {experienceOptions}
                </Form.Select>
                <div className="text-danger">{errors.experience?.message}</div>
                <Button
                className="btn btn-secondary mt-3"
                style={{ width: "400px" }}
                type="submit"
                >
                Save
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

export default AddJob;
