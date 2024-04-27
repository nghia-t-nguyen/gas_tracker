import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { AuthProvider } from './provider/Authentication';
import AccountSettings from './pages/AccountSettings';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import HomeGuest from './pages/HomeGuest';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeGuest />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-in/forgot-password' element={<ForgotPassword />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-up/:address' element={<EmailVerification />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/account-settings' element={<AccountSettings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
