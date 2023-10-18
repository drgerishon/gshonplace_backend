import { useState } from 'react';
import Card from '../../components/card/Card';
import styles from '../../styles/auth.module.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../../redux/features/auth/authSlice';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const resetPasswordAuth = (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (!email) {
      setIsLoading(false);
      return toast.error('Email field is required');
    }
  
    // Dispatch the action
    dispatch(forgetPassword({ email }))
      .unwrap()
      .then((message) => {
        setIsLoading(false);
        toast.success(message);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };
  
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}></div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPasswordAuth}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary">
                Reset password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
