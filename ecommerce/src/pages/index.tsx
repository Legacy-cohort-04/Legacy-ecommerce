import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import styles from './Auth/login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import app from '../firebaseConfig';
import axios from 'axios';

export interface UserLogin {
  email: string,
  password: string,
  type: 'user' | 'admin'

}

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const navigate = useRouter();
  const auth = getAuth(app);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let result = await axios.post("http://localhost:3001/user/login", { email, password })
      console.log(result);

      const { token, user } = result.data;
      localStorage.setItem('user', JSON.stringify(result));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // localStorage.setItem('userAvatar', result.photoURL || ''); 
      // localStorage.setItem('userType', 'user');
      navigate.push('/Home/home');
      // window.location.reload();
    } catch (err) {
      console.error(err);
      // setError('An error occurred during login. Please check your credentials and try again.');
    }
  }


  const handleGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }));

      navigate.push('/Home/home');
    } catch (error) {
      console.error("Error during Google login:", error);
      setError('An error occurred during Google login. Please try again later.');
    }
  };



  async function handleFacebookSignIn() {
    const facebookProvider = new FacebookAuthProvider();

    facebookProvider.addScope('email'); 
    facebookProvider.setCustomParameters({
      'display': 'popup'
    });

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const token = await user.getIdToken()

      localStorage.setItem("token", token)

      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }));

      navigate.push("/Home/home");
      //window.location.reload()
    } catch (err: any) {
      console.error(err);
      setError("Facebook sign-in failed. Please try again.");
    }
  }
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className="login-image-container">
          <img
            src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732056264/hnmnjb0lmjvlvzgygkku.webp"
            alt="Login illustration"
            className="login-image"
          />
          <h4 className="Logingretting" style={{ marginRight: "160px" }}>Explore the world of meta fashion </h4>
        </div>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2 className={styles.loginTitle}>Login</h2>
          <div className="login-link">
            <p>
              New User?{' '}
              <a className="login-link-text" style={{ cursor: "pointer" }} onClick={() => navigate.push("/user/signup")}>
                Create an account
              </a>
            </p>
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={styles.formInput}
            />
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <button type="submit" className={styles.loginButton}>Login</button>
          <div className="social-buttons">
            <button
              type="button"
              className={styles.socialButton}
              onClick={handleGoogleLogin}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px', fontSize: '24px' }} /> Continue with Google
            </button>
            <button
              type="button"
              className={styles.socialButton}
              onClick={handleFacebookSignIn}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px', fontSize: '24px' }} /> Continue with Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
