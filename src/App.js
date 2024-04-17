import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import AccountSettings from './pages/AccountSettings';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import HomeGuest from './pages/HomeGuest';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import DashboardGuest from './pages/DashboardGuest'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-in/forgot-password' element={<ForgotPassword />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-up/:address' element={<EmailVerification />} />
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <DashboardGuest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
