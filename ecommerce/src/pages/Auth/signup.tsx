import React ,{useState}from 'react'
import axios,{AxiosError} from "axios";
import { useRouter } from 'next/router';

export interface User {
  id: number,
  name: string,
  password: string,
  type: 'user'| 'admin'

}
const Signup :React.FC= () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");


const navigate=useRouter()

const validatePassword=(password:string)=>{
  const errors=[]
  const passwordChecking=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  if(password.length<8){
      errors.push("Password must contain at least 8 characters.")
  }
  if(!passwordChecking.test(password)){
      errors.push("Password must contain at least one upper case, one lower case, and one symbol")
  }
  return {
      isValid:errors.length===0,
      errors:errors
  }
}

const handleAddUser = async () => {
  const formData = new FormData()
  const name=formData.get('name') as string
  const email = formData.get('email')as string
  const password = formData.get('password')as string

  try {

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError("Password is too weak:");
      passwordValidation.errors.forEach((err) => setError((element) => element + "  " + err));
      return;
    }

    const response = await axios.post("/Auth/signup", {
      name,
      email,
      password
    }, { headers: { 'Content-Type': 'application/json' } });


    console.log(response.data);
    setError("");

    navigate.push("/Auth/login");

  } catch (error:unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response){
      const errorData = axiosError.response.data as string;

      if(errorData === "User already exists") {
      setError("Email address is already registered. Please use a different email.");
    } else {
      console.error(error);
      setError("An error occurred during signup. Please try again later.");
    }
  }
};
}

  return (
    <div><div className="signup-container">
    <form className='signup-form'>
    <h3>Join us!</h3>
      <div>
        <label htmlFor="fullName"></label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
        />
      </div>
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <button type="button" className='signup-button' onClick={handleAddUser}>
        Sign Up
      </button>
    <div className="signup-link">
                  <p>
                      You already have an account? <a  className="login-link-text" onClick={()=>navigate.push("/Auth/login")}>Login</a>
                  </p>
              </div>
    </form>
  </div>
  </div>
  )
}

export default Signup

