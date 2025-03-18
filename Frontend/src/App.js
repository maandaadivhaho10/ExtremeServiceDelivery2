import { HashRouter ,Router as  Routes, Route } from 'react-router-dom';
import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Shared Imports
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import OtpInput from './components/auth/OtpInputPage';
import Help from './pages/citizen/Help';
import Welcome from './pages/welcome';
import AboutUs from './pages/citizen/AboutUs';
import Settings from './pages/citizen/Setting';

// Citizen Imports
import Newsfeed from './pages/citizen/NewsFeed';
import Homepage from './pages/citizen/Homepage';
import ReportIssue from './pages/citizen/ReportIssue';
import Status from './pages/citizen/Status';
import Confirmation from './pages/citizen/Confirmation';
import Profile from './pages/citizen/Profile';
import EditProfile from './pages/citizen/EditProfile';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

// Supervisor Imports
import Suplanding from './pages/municipal_emp/supervisor/suplanding';
import IssuesComponent from './pages/municipal_emp/supervisor/IssuesComponent';
import WriteReport from './pages/municipal_emp/supervisor/WriteReport';
import SubmittedReport from './pages/municipal_emp/supervisor/SubmittedReport';
import SignOutPage from './pages/municipal_emp/supervisor/SignOutPage';
import IssueUpdate from './pages/municipal_emp/supervisor/IssueUpdate';

// Manager Imports
import Landing from './pages/municipal_emp/manager/landing';
import PdfReport from './pages/municipal_emp/manager/issues_reports';
import ManagerProf from './pages/municipal_emp/manager/man_profile';
import AssignedIssues from './pages/municipal_emp/manager/assigned';
import WaterInfo from './pages/municipal_emp/manager/water_info';
import ElectricityInfo from './pages/municipal_emp/manager/electricity_info';
import RoadInfo from './pages/municipal_emp/manager/road_info';
import SafetyInfo from './pages/municipal_emp/manager/safety_info';


// Admin Imports
//import Menu from './pages/municipal_emp/admin/Menu';
import Monthly from './pages/municipal_emp/admin/Monthly';
import AddEmployment from './pages/municipal_emp/admin/AddEmployment';
import UserCreated from './pages/municipal_emp/admin/Usercreated';
import MonthlyDetail from './pages/municipal_emp/admin/MonthlyDetail';
import AdminHome from './pages/municipal_emp/admin/AdminHome';
import IssuePading from './pages/municipal_emp/admin/IssuePading';
import IssueDetail from './pages/municipal_emp/admin/IssueDetail';
import ViewAccount from './pages/municipal_emp/admin/ViewAccount';

import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized
  from './components/Unauthorized';
const App = () => {
  return (
    < HashRouter basename="/ExtremeServiceDelivery2/">
      <Routes>
        {/* Login and Signup Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logoutpage" element={<SignOutPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/enter-otp" element={<OtpInput />}/>
        <Route path="/forgotPassword" element={< ForgotPassword/>} />
        <Route path="/resetPassword" element={< ResetPassword/>} />

        {/* Citizen Routes */}

        <Route element={<ProtectedRoute allowedRoles={['RESIDENT']} />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/reportissue" element={<ReportIssue />} />
          <Route path="/status" element={<Status />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/newsfeed" element={<Newsfeed />} />
        </Route>


        {/* Supervisor Routes */}

        <Route element={<ProtectedRoute allowedRoles={['SUPERVISOR']} />}>
          <Route path="/suplanding" element={<Suplanding />} />
          <Route path="/issuesComponent" element={<IssuesComponent />} />
          <Route path="/writereport" element={<WriteReport />} />
          <Route path="/submittedreport" element={<SubmittedReport />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/issueupdate" element={<IssueUpdate />} />
        </Route>


        {/* Manager Routes */}

        <Route element={<ProtectedRoute allowedRoles={['MANAGER']} />}>
          <Route path="/landing" element={<Landing />} />
            <Route path="/water" element={<WaterInfo />} />
            <Route path="/electricity" element={<ElectricityInfo />} />
            <Route path="/safety" element={<SafetyInfo />} />
            <Route path="/road" element={<RoadInfo />} />
            <Route path="/issues" element={<PdfReport />} />
            <Route path="/manprofile" element={<ManagerProf />} />
            <Route path="/help" element={<Help />} />
            <Route path="/assigned" element={<AssignedIssues />} />
        </Route>


        {/* Admin Routes */}

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/adminhome" element={<AdminHome />} />

          <Route path="/addemployees" element={<AddEmployment />} />
          <Route path="/monthly" element={<Monthly />} />
          <Route path="/usercreated" element={<UserCreated />} />
          <Route path="/monthlydetail" element={<MonthlyDetail />} />
          <Route path="/issuedetail" element={<IssueDetail />} />
          <Route path="/issuepanding" element={<IssuePading />} />
          <Route path="/viewaccount" element={<ViewAccount />} />
        </Route>
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Handle undefined routes */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </HashRouter>
  );
};

export default App;