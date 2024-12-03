import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

import   {githubProvider}  from '../firebaseConfig';

import styles from './Auth/login.module.css';
import app from '../firebaseConfig';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const navigate = useRouter();
  const auth = getAuth(app);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== '') {
      setPasswordVisible(true)
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let result = await axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });
      const { token, user } = result.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.type === 'admin') {                    
        navigate.push('/admin-dashboard');
      } else {
        navigate.push("/Home/home");
    }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );

      navigate.push('/Home/home');
    } catch (error: any) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const handleFacebookSignIn = async () => {
    const facebookProvider = new FacebookAuthProvider();

    facebookProvider.addScope('email');
    facebookProvider.setCustomParameters({
      display: 'popup',
    });

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const token = await user.getIdToken();

      localStorage.setItem('token', token);

      localStorage.setItem(
        'user',
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );

      navigate.push('/Home/home');
    } catch (err: any) {
      console.error(err);
      setError('Facebook sign-in failed. Please try again.');
    }
  };

 
  
    const handleGitHubLogin = async () => {
      try {
        const result = await signInWithPopup(auth, githubProvider);

        const user = result.user;
        console.log('Logged in user:', user);
        const token = await user.getIdToken();

        localStorage.setItem('token', token);

      localStorage.setItem(
        'user',
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
        
        navigate.push('/Home/home');
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('GitHub Login Error:', errorCode, errorMessage);
        
      }
    };
  

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className="login-image-container">
          <img
            src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732056264/hnmnjb0lmjvlvzgygkku.webp"
            alt="Login illustration"
            className="login-image"
          />
          <h4 className={styles["Logingreeting"]} style={{ marginRight: '160px' }}>
            Explore the world of meta fashion
          </h4>
        </div>
        <form
          className={styles.loginForm}
          onSubmit={passwordVisible ? handleLogin : handleEmailSubmit}
        >
          <h2 className={styles.loginTitle}>Sign In</h2>
          <div className="login-link">
            <p>
              New User?{' '}
              <a
                className={styles['login-link-text']}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate.push('/Auth/signup')}
              >
                Create an account
              </a>
            </p>
          </div>

          {!passwordVisible && (
            <div className={styles['form-group']}>
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
          )}

          {passwordVisible && (
            <div className={`${styles['form-group']} ${styles.visible}`}>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className={`${styles.formInput} ${styles.passwordInput}`}
              />
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <button type="submit" className={styles.loginButton}>
            {passwordVisible ? 'Login' : 'Continue'}
          </button>
<p className={styles.orText}> Or</p>
          <div className="social-buttons">
            <button
              type="button"
              className={`${styles.socialButton} ${styles.googleButton}`}
              onClick={handleGoogleLogin}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                alt="Google Icon"
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
              />
              Continue With Google
            </button>
            <button
              type="button"
              className={`${styles.socialButton} ${styles.facebookButton}`}
              onClick={handleFacebookSignIn}
            >
              <FaFacebook
              className={styles['facebook-logo']}
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
              />
              Continue With Facebook
            </button>
            <button
              type="button"
              className={`${styles.socialButton} ${styles.githubButton}`}
              onClick={handleGitHubLogin}
            >
              <FaGithub
              className={styles['github-logo']}
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
              />
              Continue With Github
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}