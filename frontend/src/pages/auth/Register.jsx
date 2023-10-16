import styles from '../../styles/auth.module.scss';
import registerImg from '../../assets/register.png';
import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { register, RESET_AUTH } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  name: '',
  email: '',
  password: '',
  cnPassword: '',
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, cnPassword } = formData;

  const { isLoading, isError, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Password should be more that 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    if (password !== cnPassword) {
      return toast.error('Password do not match');
    }

    const userData = {
      name,
      email,
      password,
    };
    await dispatch(register(userData));
  }
//to monitor state
  useEffect(() => {
    if(isSuccess && isLoggedIn) {
        navigate('/')
    }
    dispatch(RESET_AUTH())
  }, [dispatch, isLoggedIn, isSuccess, navigate])
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={registerImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <form onSubmit={registerUser}>
              <h2>Register</h2>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={handleInputChange}
              />

              <input
                type="text"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={handleInputChange}
              />

              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="cnPassword"
                value={cnPassword}
                onChange={handleInputChange}
              />
              <button className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Alraedy have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Register;
