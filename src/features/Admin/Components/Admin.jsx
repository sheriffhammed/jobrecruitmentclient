import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Admin.css"
import Card from "./Card"
import AdminNavBar from "./AdminNavBar"
import Footer from "../../Components/Footer";
import AdminExperience from './Experience/AdminExperience'
import AdminJobType from './JobType/AdminJobType'
import AdminModeOfWork from './ModeOfWork/AdminModeOfWork'
import AdminIndustry from './Industry/AdminIndustry'
import AdminUser from './User/AdminUser'
const Admin = () => {
  const navigate = useNavigate(); 
   //Modal Experience
  const [showExperience, setShowxperience] = useState(false);
  const handleCloseExperience = () => setShowxperience(false);
  const handleShowExperience = () => {
    setShowxperience(true);
  };

  //Modal JobType
  const [showJobType, setShowJobType] = useState(false);
  const handleCloseJobType = () => setShowJobType(false);
  const handleShowJobType = () => {
    setShowJobType(true);
  };

  //Modal Mode of Work
  const [showModeOfWork, setShowModeOfWork] = useState(false);
  const handleCloseModeOfWork = () => setShowModeOfWork(false);
  const handleShowModeOfWork = () => {
    setShowModeOfWork(true);
  };

  //Modal Industry
  const [showIndustry, setShowIndustry] = useState(false);
  const handleCloseIndustry = () => setShowIndustry(false);
  const handleShowIndustry = () => {
    setShowIndustry(true);
  };

  //Modal User
  const [showUser, setShowUser] = useState(false);
  const handleCloseUser = () => setShowUser(false);
  const handleShowUser = () => {
    setShowUser(true);
  };
  return (
     <>     
      <AdminNavBar />
        <section className="card-container">
          <NavLink to={`/adminjob`}>         
            <section className="card">
              <img src="/images/jobs.avif" alt="Image" className="card-img" />
              <div className="card-details">
                <h3 className="card-title">Jobs</h3>          
              </div>
            </section>
          </NavLink>
          <section className="card" onClick={handleShowUser}>
            <img src="/images/userprofile.webp" alt="Image" className="card-img" />
            <div className="card-details">
              <h3 className="card-title">Users</h3>          
            </div>
          </section>

          <section className="card" onClick={handleShowExperience}>
            <img src="/images/experience.avif" alt="Image" className="card-img" />
            <div className="card-details">
              <h3 className="card-title">Experience</h3>          
            </div>
          </section>
          <section className="card" onClick={handleShowJobType}>
            <img src="/images/jobtype.avif" alt="Image" className="card-img" />
            <div className="card-details">
              <h3 className="card-title">Job Type</h3>          
            </div>
          </section>
          <section className="card" onClick={handleShowModeOfWork}>
            <img src="/images/modeofwork.avif" alt="Image" className="card-img" />
            <div className="card-details">
              <h3 className="card-title">Mode Of Work</h3>          
            </div>
          </section>
          <section className="card" onClick={handleShowIndustry}>
            <img src="/images/industry.jpg" alt="Image" className="card-img" />
            <div className="card-details">
              <h3 className="card-title">Industry</h3>          
            </div>
          </section>
        </section>
        {showExperience && <AdminExperience 
        show={showExperience}
        handleClose={handleCloseExperience}
        /> }
        {showJobType && <AdminJobType 
        show={showJobType}
        handleClose={handleCloseJobType}
        /> }
        {showModeOfWork && <AdminModeOfWork 
        show={showModeOfWork}
        handleClose={handleCloseModeOfWork}
        /> }
        {showIndustry && <AdminIndustry 
        show={showIndustry}
        handleClose={handleCloseIndustry}
        /> }
        {showUser && <AdminUser 
        show={showUser}
        handleClose={handleCloseUser}
        /> }
        <Footer />
      <Outlet />
    </>
  )
}

export default Admin