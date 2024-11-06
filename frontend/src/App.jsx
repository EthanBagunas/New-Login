import React from 'react';
import Login from './components/Login/Login';
import './login.css';
import Home from './components/Login/Home';
import Layout from './components/Login/Layout';
import User from './components/Login/User';
import Admin from './components/Login/Admin';
import Missing from './components/Login/Missing';
import RequireAuth from './components/Login/RequireAuth';
import LinkPage from './components/Login/LinkPage';
import Reset from './reset';
import Unauthorized from './components/Login/Unauthorized';
import PersistLogin from './components/Login/PersistLogin';
import RequireNoAuth from './components/Login/RequireNoAuth'; 
import Profile from './components/Profile/Profile';
import ProfilePage from './components/Profile/ProfilePage'


import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Test from './components/Test';
//import MapContainer from '../../../../webpages/Flood-monitoring-system/client/src/components/Map/Map';
import MapContainer from './components/Map/Map';
import RegistrationForm from './components/Register/Signup'; 
import RegistrationOtp from './components/Register/SignupOTP';
import './register.css'
import AddLGUInfo from './components/Settings/LGU/AddLGUInfo';
import Elected_Form from './components/Settings/LGU/Elected_Form';
import BrgyForm from './components/Settings/Brgy/InsertBrgyInfo';
import Barangay_Form from './components/Settings/Brgy/insertBrgyOfficial';
import AddPurokInfo from './components/Settings/Purok/Purok_setup';
//  import Test from './components/Test';
// <Route exact path="/test" element={<Test />} /> // Use the correct component name

const ROLES = {
  'User': 2001,
  'Editor': 1994,
  'Super_Admin': 1990

}


const theme = createTheme({
  palette: {
    primary: {
      main: '#e64833', // your primary color
    },

    background: {
      default: '#33D1E6', // your background color
    },
  },
});

import Container from '@mui/material/Container';
function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
            <div className="content">
            <Routes>
            <Route path="reset" element={<Reset />} />
            
            
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route element={<PersistLogin />}>
            <Route element={<RequireNoAuth />}>
              
                <Route exact path="/signup" element={<RegistrationForm/>} /> 
                <Route exact path ="/signup/signupotp" element= {<RegistrationOtp/>}/>
                <Route path="" element={<Login />} />
               
                </Route>

                

                <Route element={<RequireAuth allowedRoles={[1994, 2001]}/>}>
                <Route path="/Profile" element={<Profile />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route exact path="/Home" element={<MapContainer />} /> 
                </Route>

                <Route element={<RequireAuth allowedRoles={[1994]}/>}>
                <Route exact path="/test" element={<Test />} />
                <Route path="/lgu-setup" element={<AddLGUInfo />} />
                <Route path="/elected-official" element={<Elected_Form />} />
                <Route path="/brgy-setup" element={<BrgyForm />} />
                <Route path="/brgy-official" element={<Barangay_Form />} />
                <Route path="/purok-setup" element={<AddPurokInfo/>} />
                
                
              </Route>
                <Route element={<RequireAuth allowedRoles={[1990]}/>}>

                <Route path="admin" element={<Admin />} />

                  </Route>
                </Route>
            </Routes>
            </div>
      </div>
    </ThemeProvider>

  );
}

export default App;

/*
<Routes>
<Route path="/" element={<Layout />}>
 
  <Route path="linkpage" element={<LinkPage />} />
  <Route path="Login" element={<Login />} />
  <Route path="reset" element={<Reset />} />
  <Route path="unauthorized" element={<Unauthorized />} />
  
 
  <Route element={<PersistLogin />}>
   
    <Route element={<RequireAuth allowedRoles={[1994, 2001]}/>}>
      <Route path="home" element={<Home />} />
    </Route>

   
    <Route element={<RequireAuth allowedRoles={[1994]}/>}>
      <Route path="admin" element={<Admin />} />
    </Route>

   
    <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
      <Route path="user" element={<User />} />
      
    </Route>
  </Route>

 
  <Route path="*" element={<Missing />} />
</Route>
</Routes>
*/