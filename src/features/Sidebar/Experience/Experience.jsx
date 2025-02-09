import Input from "../../components/Input";
import "./Experience.css";
import { useGetExperienceQuery } from "./experienceApiSlice";
function Experience({ handleChange }) {
   const {
    data: experiences,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExperienceQuery();
  let contents;
  if(isLoading){
    contents = <div></div>
  }
  else if (isSuccess) {
  contents = experiences?.data.map(({description}) => {
      return (
        <>
          <Input
            handleChange={handleChange}
            value={description}
            title={description}
            name="experience"
          />
        </>
      )
  })
  } else if (isError) {
    console.log(error.error)
  }
  return (
    <div>
      <h2 className="sidebar-title">Experience</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="experience" />
          <span className="checkmark"></span>All
        </label>
        {contents}
               
      </div>
    </div>
  );
}

export default Experience;
