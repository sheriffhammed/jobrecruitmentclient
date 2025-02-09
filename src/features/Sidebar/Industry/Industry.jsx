import Input from "../../components/Input";
import "./Industry.css";
import { useGetIndustryQuery } from "./industryApiSlice";
function Industry({ handleChange }) {
   const {
    data: industries,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetIndustryQuery();
  let contents;
  if(isLoading){
    contents = <div></div>
  }
  else if (isSuccess) {
  contents = industries?.data.map(({description}) => {
      return (
        <>
          <Input
            handleChange={handleChange}
            value={description}
            title={description}
            name="industry"
          />
        </>
      )
  })
  } else if (isError) {
    console.log(error.error)
  }
  return (
    <div>
      <h2 className="sidebar-title">Industry</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="industry" />
          <span className="checkmark"></span>All
        </label>
        {contents}
               
      </div>
    </div>
  );
}

export default Industry;
