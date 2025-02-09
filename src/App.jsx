import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./features/Components/Layout";
import Header from "./features/Components/Header";
import Homepage from "./features/Homepage/Components/Homepage";
import User from "./features/User/Components/User";
import Admin from "./features/Admin/Components/Admin";
import AdminLogin from "./features/Admin/Components/AdminLogin";
import AdminJob from "./features/Admin/Components/Job/AdminJob";
import MyApplications from "./features/Applications/Components/MyApplications";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            {/* <Route path="/" element={<Header />} /> */}
            <Route path="admin" element={<Admin />} />
            <Route path="adminjob" element={<AdminJob />} />
            <Route path="user" element={<User />} />
            <Route path="myapplication/:userId" element={<MyApplications />} />
          </Route>
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="*" element={"Page Not Found"} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
