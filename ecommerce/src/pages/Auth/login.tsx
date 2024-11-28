import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';
import axios, { AxiosError } from 'axios'
import '../Auth/login.css'

export interface UserLogin {
  email: string,
  password: string
}

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

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
      if (axiosError.response){
        const errorData = axiosError.response.data as string;
  
      if (errorData === "Invalid credentials") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("An error occurred during login. Please try again later.");
      }
    }}
  }
    return (
         <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
            <h2 className="login-title">Login</h2>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="form-input"
                    />
                </div>

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}

                <button type="submit" className="login-button"  >Login</button>

              
            <div className="signup-link">
                    <p>
                        Don't have an account? <a  className="signup-link-text" onClick={()=>navigate.push("/Auth/signup")}>Sign up</a>
                    </p>
                </div>

               
            </form>
        </div>

    )
  }