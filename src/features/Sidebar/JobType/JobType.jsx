import Input from "../../components/Input";
import "./JobType.css";
import { useGetJobTypesQuery } from "./jobTypeApiSlice";
function JobType({ handleChange }) {
   const {
    data: jobTypes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetJobTypesQuery();
  let contents;
  if(isLoading){
    contents = <div></div>
  }
  else if (isSuccess) {
  contents = jobTypes?.data.map((jobType) => {
      return (
        <>
          <Input
            handleChange={handleChange}
            value={jobType?.description}
            title={jobType?.description}
            name="jobType"
          />
        </>
      )
  })
  } else if (isError) {
    console.log(error.error)
    //contents = <div>{JSON.stringify(error.data?.message)}</div>;
  }
  return (
    <div>
      <h2 className="sidebar-title">Job Type</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="jobType" />
          <span className="checkmark"></span>All
        </label>
        {contents}
               
      </div>
    </div>
  );
}

export default JobType;
