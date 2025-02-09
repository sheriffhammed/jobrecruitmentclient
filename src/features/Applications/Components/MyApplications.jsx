import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import Loading from "../../Components/Loading";
import {ApplicationFilteredData} from "../ApplicationFilteredData";
import { useGetApplicationsByUserQuery } from "../applicationsApiSlice";
import ApplicationJobLists from "./ApplicationJobLists";
import UserBanner from "../../User/Components/UserBanner";
import "../Application.css";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import { selectUserId } from "../../auth/authSlice";

const MyApplications = () => {
  const { userId } = useParams()
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const {
    data: selectApplicationByUserId,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetApplicationsByUserQuery(userId);
  
  const filteredItems = selectApplicationByUserId?.data?.filter(
    (application) => application?.job?.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  let contents;
   if (isLoading) {
    contents = <Loading />;
  } else if (isSuccess) {
  contents = ApplicationFilteredData(selectApplicationByUserId, selectedCategory, query, filteredItems);  
  } else if (isError) {
    console.log(error.error)
    
  }
  return (
    <>
        <UserBanner 
          query={query} 
          handleInputChange={handleInputChange}
        />
        <ApplicationJobLists 
          userId = {userId}
          contents={contents} 
          handleChange={handleChange}
        />
        <Footer />
        <Outlet />
    </>
  )
}

export default MyApplications