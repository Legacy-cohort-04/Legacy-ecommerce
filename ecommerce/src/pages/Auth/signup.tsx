import React, { useState } from 'react'
import axios, { AxiosError } from "axios";
import { useRouter } from 'next/router';
import styles from './signup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'


export interface User {
  id: number,
  firstName: string,
  lastName: string,
  day: number,
  month: number,
  year: number,
  password: string,
  type: 'user' | 'admin'
}

const Signup: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [day, setDay] = useState<number | "">("");
  const [month, setMonth] = useState<number| string>("");
  const [year, setYear] = useState<number | "">("");
  const [error, setError] = useState<string>("");

  const navigate = useRouter()

  const validatePassword = (password: string) => {
    const errors = []
    const passwordChecking = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (password.length < 8) {
      errors.push("Password must contain at least 8 characters.")
    }
    if (!passwordChecking.test(password)) {
      errors.push("Password must contain at least one upper case, one lower case, and one symbol")
    }
    return {
      isValid: errors.length === 0,
      errors: errors
    }
  }

  const handleAddUser = () => {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {

      Swal.fire({
        icon: 'error',
        title: '<span class="swal-title-error">Weak Password</span>',
        text: passwordValidation.errors.join(' '),
        background: 'rgba(103, 26, 228, 0.4)',
        color: 'white',
        confirmButtonText: 'Got it!',
        customClass: {
          title: 'swal-title-error',
          htmlContainer: 'swal-content',
          confirmButton: 'login-custom-button',
        }
      });
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      month,
      day,
      year,
    };

    axios
      .post('http://localhost:3001/user/signup', userData, { headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '<span class="swal-title-success">Account Created</span>',
          text: 'You have successfully signed up. Please log in.',
          background: 'linear-gradient(90deg, #B75CFF 0%, #671AE4 100%)',
          color: 'white',
          confirmButtonText: 'Got it!',
          customClass: {
            title: 'swal-title-success',
            htmlContainer: 'swal-content',
            confirmButton: 'succes-custom-button',
          }
        });
        navigate.push('/');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.errors) {
            Swal.fire({
              icon: 'error',
              title: '<span class="swal-title-error">Validation Error</span>',
              text: errorData.errors.join(', '),
              background: 'linear-gradient(90deg, #B75CFF 0%, #671AE4 100%)',
              color: 'white',
              confirmButtonText: 'Got it!',
              customClass: {
                title: 'swal-title-error',
                htmlContainer: 'swal-content',
                confirmButton: 'login-custom-button',
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '<span class="swal-title-error">Signup Failed</span>',
              text: errorData.message || 'An error occurred during signup. Please try again later.',
              background: 'linear-gradient(90deg, #B75CFF 0%, #671AE4 100%)',
              color: 'white',
              confirmButtonText: 'Got it!',
              customClass: {
                title: 'swal-title-error',
                htmlContainer: 'swal-content',
                confirmButton: 'login-custom-button',
              }
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '<span class="swal-title-error">Signup Failed</span>',
            text: 'An error occurred during signup. Please try again later.',
            background: 'linear-gradient(90deg, #B75CFF 0%, #671AE4 100%)',
            color: 'white',
            confirmButtonText: 'Got it!',
            customClass: {
              title: 'swal-title-error',
              htmlContainer: 'swal-content',
              confirmButton: 'login-custom-button',
            }
          });
        }
      });
  }
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <>


      <div className={styles.signupContainer}>
        <div className={styles['signup-image-container']}>
          <img
            src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732056264/hnmnjb0lmjvlvzgygkku.webp"
            alt="Illustration of a person with crossed arms"
            className={styles["signup-image"]}
          />
<h4 className={styles.greeting}>
  Begin your meta fashion journey<br />
  here
</h4>        </div>

        <form className={styles.signupForm}>
          <h3 className={styles.signupMessage}>Sign Up
          </h3>
          <div className={styles.signupLink}>
            <p>
              Already a Member?{' '}
              <a className={styles["login-link-text"]} style={{ "cursor": "pointer" }} onClick={() => navigate.push('/')}>
                Sign In
              </a>
            </p>
          </div>
          <div>
            <input
              type="email"
              className={styles.email}
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.nameContainer}>
              <input
                type="text"
                id="firstName"
                className={styles.nameInput}
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </div>

            <div className={styles.nameContainer} >
              <input
                className={styles.nameInput}

                type="text"
                id="lastName"

                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className={styles.passwordContainer}>
            <input
                        type={passwordVisible ? 'password' : 'text'}

              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
           <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="passwordSwitch"
          />
          </div>
          <div> 
              <p className={styles.personalInfo}>Date of Birth</p>
            </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }} >
           

          <div className={styles.personalInfo}>
              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value || '')}
              >
                <option value="">Month</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className={styles.personalInfo}>
              <select
                id="day"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
              >
                <option value="">Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
           
            <div className={styles.personalInfo}>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                <option value="">Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
  

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          <button type="button" className={styles.signupButton} onClick={handleAddUser}>
            Create Account
          </button>

        </form>
      </div>
    </>
  )
}

export default Signup
