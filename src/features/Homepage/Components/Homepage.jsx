import { useState } from "react";
import Loading from "../../Components/Loading";
import { filteredData } from "../../Components/FilteredData";
import { useGetJobsQuery } from "../../Joblisting/jobApiSlice";
import Container from "react-bootstrap/Container";
import GetJobs from "./GetJobs";
import HomePageBanner from "./HomePageBanner";
import "../homepage.css";

import Footer from "../../Components/Footer";
const Homepage = () => {
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
    contents = (
      <div>
        {error.status} {JSON.stringify(error.data)}
      </div>
    );
  }

  return (
    <div className="container-xl-fluid">
      <HomePageBanner query={query} handleInputChange={handleInputChange} />
      <GetJobs contents={contents} handleChange={handleChange} />
      <Footer />
    </div>
  );
};

export default Homepage;
