import styles from '../../styles/auth.module.scss';
import loginImg from '../../assets/login.png';
import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, googleSignIn, login } from '../../redux/features/auth/authSlice';
import { FaGoogle } from 'react-icons/fa'

// Now you can use `auth` in this file


export const Login = () => {
  const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const dispatch = useDispatch()
 const navigate = useNavigate()
  const { isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth)


  const loginUser = async(e) => {
    e.preventDefault();
    if(!email || !password) {
      return toast.error("Email and password field required")
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    const userData = {
      email,
      password
    }
    await dispatch(login(userData))

  };
useEffect(() => {
  if(isLoggedIn && isSuccess) {
    navigate('/')
    dispatch(getUser()); 
  }
  // dispatch(RESET_AUTH())
}, [dispatch, isLoggedIn, isSuccess, navigate])

//Login with google

const signInWithGoogle = async() => {
    await dispatch(googleSignIn())
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


  return (
    <>
    {isLoading && <Loader />}
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>
      <Card>
        <div className={styles.form}>
          <form onSubmit={loginUser}>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="--btn --btn-primary --btn-block">Login</button>
         <div className={styles.links}>
          <Link to="/reset" >Reset Password</Link>
         </div>
         <p>--or--</p>
          </form>
          <button className='--btn --btn-danger --btn-block' onClick={signInWithGoogle}>
            <FaGoogle color="#fff" /> Login with Google
          </button>
          <span className={styles.register}>
            <p>Dont have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </section>
    </>
  );
};
