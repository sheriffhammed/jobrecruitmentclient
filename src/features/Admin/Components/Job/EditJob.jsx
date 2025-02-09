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
import { useUpdateJobByIdMutation, useGetJobByIdQuery } from '../../../Joblisting/jobApiSlice';
import { useNavigate } from 'react-router-dom';
function EditJob({show, handleClose, jobId}) {
  const navigate = useNavigate()
   const [showSuccess, setShowSuccess] = useState("")
   
   const {data: job } = useGetJobByIdQuery(jobId);
  const [updateJobById]  = useUpdateJobByIdMutation()

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
       id: jobId,
        ...data                      
    }
    await updateJobById(requestBody)
    //setShowSuccess("Job Updated Succesfully!!!")
    alert("Job Updated Succesfully")
    navigate('/adminjob')
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
    title: yup.string(),
    description: yup.string(),
    company: yup.string(),
    salary: yup.string(),
    location: yup.string(),
    jobType: yup.string(),
    modeOfWork: yup.string(),
    industry: yup.string(),
    experience: yup.string(),
     
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
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
            
        <Modal.Body>
          <Container
            className="row align-items-center justify-content-center"
            fluid
            >
            <div className="text-success">{showSuccess}</div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                Title <Form.Control
                type="text"
                id="title"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                {...register("title")}
                defaultValue = {job?.data[0]?.title}
                />
                <div className="text-danger">{errors.title?.message}</div>
                Description <Form.Control
                as="textarea"
                id="description"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                {...register("description")}
                defaultValue = {job?.data[0]?.description}
                />
                <div className="text-danger">{errors.description?.message}</div>
                Company <Form.Control
                type="text"
                id="company"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                {...register("company")}
                defaultValue = {job?.data[0]?.company}
                />
                <div className="text-danger">{errors.company?.message}</div>
                Salary <Form.Control
                type="number"
                id="salary"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Salary"
                {...register("salary")}
                defaultValue = {job?.data[0]?.salary}
                />
                <div className="text-danger">{errors.salary?.message}</div>
                Location <Form.Control
                type="text"
                id="location"
                style={{ width: "400px" }}
                className="border-danger mt-1"
                placeholder="Location"
                {...register("location")}
                defaultValue = {job?.data[0]?.location}
                />
                <div className="text-secondary mt-1">Job Type</div>
                <Form.Select
                    id="jobType"
                    style={{ width: "400px", height : "40px" }}
                    className="border-danger mt-1"
                    {...register("jobType")}
                >                       
                    <option id="jobType" value={job?.data[0]?.jobType?._id}> 
                      {job?.data[0]?.jobType?.description}
                    </option>
                    {jobTypesOptions}
                </Form.Select>
                <div className="text-danger">{errors.jobType?.message}</div>
                <div className="text-secondary mt-1">Mode of Work</div>
                <Form.Select
                    id="modeOfWork"
                    style={{ width: "400px", height : "40px" }}
                    className="border-danger mt-1"
                    {...register("modeOfWork")}
                >                       
                    <option id="modeOfWork" value={job?.data[0]?.modeOfWork?._id}> 
                      {job?.data[0]?.modeOfWork?.description}
                    </option>
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
                    <option id="industry" value={job?.data[0]?.industry?._id}> 
                      {job?.data[0]?.industry?.description}
                    </option>
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
                    <option id="experience" value={job?.data[0]?.experience?._id}> 
                      {job?.data[0]?.experience?.description}
                    </option>
                    {experienceOptions}
                </Form.Select>
                <div className="text-danger">{errors.experience?.message}</div>
                
                              
                <Button
                className="btn btn-secondary mt-3"
                style={{ width: "400px" }}
                type="submit"
                >
                Update Job
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

export default EditJob;
