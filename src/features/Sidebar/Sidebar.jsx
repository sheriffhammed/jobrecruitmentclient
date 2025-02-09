import JobType from "./JobType/JobType";
import ModeOfWork from "./ModeOfWork/ModeOfWork";
import Industry from "./Industry/Industry";
import Experience from "./Experience/Experience";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">      
        <JobType handleChange={handleChange} />        
        <ModeOfWork handleChange={handleChange} />        
        <Experience handleChange={handleChange} />        
        <Industry handleChange={handleChange} />
      </section>
    </>
  );
};

export default Sidebar;
