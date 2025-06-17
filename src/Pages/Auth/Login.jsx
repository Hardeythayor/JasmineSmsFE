import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";
import useAuth from "../../hooks/useAuthContext";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png"

const Login = () => {
  const {t} = useTranslation()
  const {labels, placeholderText} = t("authForm")

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
                    toast.success(t("otherText.7"))
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
                    toast.error(t("otherText.6"))
                    setErrorMsg(err.response.data.message)
                })
                .finally(() => setLoading(false))

  }

  return (
    <div className="login-wrapper">
      <div className="form-container shadow-sms">
        <img src={logo} width='240' height='62' alt="SeaSMS Logo" className="img-fluid" />

        {errorMsg && <div className='alert alert-danger py-2'>
            <i className='mdi mdi-alert-circle-outline'></i> {errorMsg}
        </div>}

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="loginId">{labels[0]}</label>
            <input 
              type="text" 
              className="form-control" 
              id="loginId" 
              placeholder={placeholderText[0]}
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label>{labels[1]}</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder={placeholderText[1]} 
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? <div class="spinner-border spinner-border-sm text-light"></div> : labels[4]}
          </button>
        </form>

        <div className="footer">
          {labels[2]} <NavLink to="/auth/register">{labels[3]}</NavLink>
        </div>
        <div className="telegram">
          <a className="text-decoration-none" href="https://t.me/HIP100">{t("otherText.4")} <b>@HIP100</b></a>
        </div>
      </div>
    </div>
  );
};

export default Login;
