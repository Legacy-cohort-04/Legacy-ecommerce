import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';
import axios, { AxiosError } from 'axios'
import styles from './login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser } from '@fortawesome/free-solid-svg-icons';

export interface UserLogin {
  email: string,
  password: string
}

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isEmailStep, setIsEmailStep] = useState(true);


  const navigate = useRouter();



  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await axios.post("/Auth/login", {
        email,
        password
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);


        localStorage.setItem("user", JSON.stringify(user));

        if (user.type === 'admin') {
          navigate.push("/admin-dashboard");
          window.location.reload()
        } else {
          navigate.push("/");
          window.location.reload()
        }

        setError("");
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError
      console.error(err);
      if (axiosError.response) {
        const errorData = axiosError.response.data as string;

        if (errorData === "Invalid credentials") {
          setError("Incorrect password. Please try again.");
        } else {
          setError("An error occurred during login. Please try again later.");
        }
      }
    }
  }
  return (
    <div>
      <div className="login-container">
        <div className="login-image-container">
          <img
            src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732056264/hnmnjb0lmjvlvzgygkku.webp"
            alt="Login illustration"
            className="login-image"
          />
          <h4 className="Logingretting" style={{ "marginRight": "160px" }}>Explore the world of meta fashion </h4>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <h3 className="loginMessage" style={{ "marginBottom": "0px", "position": "relative", "right": "20px" }}>Login</h3>
          <div className="login-link">
            <p>
              New User?{' '}
              <a className="login-link-text" style={{ "cursor": "pointer" }} onClick={() => navigate.push("/user/signup")}>
                Create an account
              </a>
            </p>
          </div>

          {isEmailStep ? (
            <div>
              <input
                type="email"
                className="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                autoComplete='off'
              />
            </div>
          ) : (
            <div className="password-container">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                autoComplete='off'
              />
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <button type="submit" className={styles.loginButton}>
            {isEmailStep ? 'Continue' : 'Login'}
          </button>

          <div className="or-container">
            <p style={{ "marginBottom": "-2px" }}>Or</p>
          </div>

          <div className="social-buttons">
            <button
              className="social-button google-button"
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px', fontSize: '24px' }} /> Continue with Google
            </button>
            <button
              className="social-button facebook-button"
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px', fontSize: '24px' }} /> Continue with Facebook
            </button>
          </div>
        </form>
      </div>
      <div className={styles.loginContainer}>
        <div className="login-image-container">
          <img
            src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732056264/hnmnjb0lmjvlvzgygkku.webp"
            alt="Login illustration"
            className="login-image"
          />
          <h4 className="Logingretting" style={{ "marginRight": "160px" }}>Explore the world of meta fashion </h4>
        </div>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2 className={styles.loginTitle}>Login</h2>
          <div className="login-link">
            <p>
              New User?{' '}
              <a className="login-link-text" style={{ "cursor": "pointer" }} onClick={() => navigate.push("/user/signup")}>
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

          <button type="submit" className={styles.loginButton}  >Login</button>
          <div className="social-buttons">
            <button
              className={styles.socialButton}             >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px', fontSize: '24px' }} /> Continue with Google
            </button>
            <button
              className={styles.socialButton}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px', fontSize: '24px' }} /> Continue with Facebook
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}