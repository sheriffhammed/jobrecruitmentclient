import { useState } from "react";
import Container from "react-bootstrap/Container";
import Loading from "../../../Components/Loading";
import {filteredData} from "../../../Components/FilteredData";
import { useGetJobsQuery } from "../../../Joblisting/jobApiSlice";
import GetJobs from "../../../Homepage/Components/GetJobs";
import AdminBanner from "./AdminBanner";
import AdminNavBar from "../AdminNavBar"
import Footer from "../../../Components/Footer";
import AddJob from './AddJob'
const AdminJob = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Modal Add Job
  const [showAddJob, setShowAddJob] = useState(false);
  const handleCloseAddJob = () => setShowAddJob(false);
  const handleShowAddJob = () => {
    setShowAddJob(true);
  };

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
  }
  

  return (
    <>
    <div className="container-lg">
      <AdminNavBar />
    </div>
      <AdminBanner 
        query={query} 
        handleInputChange={handleInputChange}
      />
      
      <GetJobs 
        contents={contents} 
        handleChange={handleChange}
      />
     
      <Footer />
    
    </>
  );
};

export default AdminJob;
