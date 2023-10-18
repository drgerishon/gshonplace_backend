import { useState } from 'react';
import Card from '../../components/card/Card';
import styles from '../../styles/auth.module.scss';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading,setIsLoading] = useState(false)

  const resetPassword = (e) => {
    e.preventDefault(); // Prevent default form submission
setIsLoading(true)
    if (!email) {
      return toast.error("Email field is required");
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)
        toast.success("Check your email for reset link");
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message);
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
          <form onSubmit={resetPassword}>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type='submit' className="--btn --btn-primary">Reset password</button>
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
