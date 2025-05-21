import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";
import useAuth from "../../hooks/useAuthContext";

const Login = () => {
  const navigate = useNavigate()
  const {userData, setUserData} = useAuth()

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  })

  const handleChange = (e) => {
      const {name, value} = e.target

      setFormData(prevFormData => (
          {...prevFormData, [name]: value}
      ))
  }

  const reset = () => {
      setFormData({
          userId: '',
          password: ''
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!formData.userId){
        toast.error("ID cannot be empty")
        return
    }
    if(!formData.password){
        toast.error("Password cannot be empty")
        return
    }

    setLoading(true)
    setErrorMsg(null)
    localStorage.removeItem('userData')
    axiosInstance.post('/user/auth/login', formData)
                .then(res => {
                    toast.success(res.data.message)
                    localStorage.setItem('userData', JSON.stringify(res.data.user))
                    setUserData(prevUserData => (
                        {...prevUserData, userInfo: res.data.user}
                    ))
                    reset()
                    // After login, redirect to the intended route
                    const intendedRoute = localStorage.getItem('intendedRoute') || '/';
                    localStorage.removeItem('intendedRoute'); // Clean up after redirect
                    navigate(intendedRoute);
                })
                .catch(err => {
                    console.log(err.response);
                    toast.error("An error occured. Please, try again")
                    setErrorMsg(err.response.data.message)
                })
                .finally(() => setLoading(false))

  }

  return (
    <div className="login-wrapper">
      <div className="form-container shadow-sms">
        <img src="https://www.bada-sms.com/logo.png" width='240' height='62' alt="SeaSMS Logo" className="img-fluid" />

        {errorMsg && <div className='alert alert-danger py-2'>
            <i className='mdi mdi-alert-circle-outline'></i> {errorMsg}
        </div>}

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="loginId">id</label>
            <input 
              type="text" 
              className="form-control" 
              id="loginId" 
              placeholder="Please enter your ID" 
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label>password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Please enter your password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? <div class="spinner-border spinner-border-sm text-light"></div> : 'log in'}
          </button>
        </form>

        <div className="footer">
          Don't have an account? <NavLink to="/auth/register">Sign up</NavLink>
        </div>
        <div className="telegram">
          inquiry <b>@SeaSMS</b>
        </div>
      </div>
    </div>
  );
};

export default Login;
