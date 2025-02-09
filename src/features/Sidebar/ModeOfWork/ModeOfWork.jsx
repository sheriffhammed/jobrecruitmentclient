import Input from "../../components/Input";
import "./ModeOfWork.css";
import { useGetModeOfWorkQuery } from "./modeOfWorkApiSlice";
function ModeOfWork({ handleChange }) {
   const {
    data: modeOfWorks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetModeOfWorkQuery();
  let contents;
  if(isLoading){
    contents = <div></div>
  }
  else if (isSuccess) {
  contents = modeOfWorks?.data.map(({description}) => {
      return (
        <>
          <Input
            handleChange={handleChange}
            value={description}
            title={description}
            name="modeOfWork"
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
      <h2 className="sidebar-title">Mode of Work</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="modeOfWork" />
          <span className="checkmark"></span>All
        </label>
        {contents}
               
      </div>
    </div>
  );
}

export default ModeOfWork;
