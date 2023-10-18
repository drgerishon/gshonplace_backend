import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Login } from './pages/auth/Login';
import Register from './pages/auth/Register';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginStatus } from './redux/features/auth/authSlice';
import Profile from './pages/profile/Profile';
import Reset from './pages/auth/Reset';

function App() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  //for checking if user is loggedin
  useEffect(() => {
    dispatch(loginStatus());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset" element={<Reset />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
