import { Outlet } from "react-router-dom";
import { useState } from "react";
import Loading from "../../Components/Loading";
import {filteredData} from "../../Components/FilteredData";
import { useGetJobsQuery } from "../../Joblisting/jobApiSlice";
import UserJobLists from "./UserJobLists";
import UserBanner from "./UserBanner";
import "../user.css";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import { selectUserId } from "../../auth/authSlice";
const User = () => {
  const userId = useSelector(selectUserId);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const {
    data: jobs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetJobsQuery();

  const filteredItems = jobs?.data?.filter(
    (job) => job.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
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
  contents = filteredData(jobs, selectedCategory, query, filteredItems);  
  } else if (isError) {
    console.log(error.error)
    //contents = <div>{JSON.stringify(error.data?.message)}</div>;
  }
  
  return (
    <>      
      <UserBanner 
        query={query} 
        handleInputChange={handleInputChange}
      />
      <UserJobLists 
        userId = {userId}
        contents={contents} 
        handleChange={handleChange}
        />
      <Footer />
      <Outlet />
    </>
  );
};

export default User;
