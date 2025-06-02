import React, { useState } from 'react'
import "./Auth.css"
import { NavLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../../hooks/axiosInstance'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import logo from "../../assets/logo.png"

const Register = () => {
  const {t} = useTranslation()
  const {labels, placeholderText} = t("authForm")

    const navigate = useNavigate()

    const [registerLoading, setRegisterLoading] = useState(false)
    const [validationError, setValidationError] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        userId: '',
        password: '',
        inviteCode: '',
        password_confirmation: ''
    })
    
    const resetFormData = () => {
        setFormData({
            name: '',
            userId: '',
            password: '',
            inviteCode: '',
            password_confirmation: ''
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData(prevFormData => (
            {...prevFormData, [name]: value}
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(formData.password !== formData.password_confirmation){
            toast.error("Password do not match")
            return
        }
        setRegisterLoading(true)
        setValidationError({})
        axiosInstance.post('/user/auth/register', formData)
            .then(res => {
                toast.success(t("otherText.8"))
                resetFormData()
                navigate("/auth/login")
            })
            .catch(err => {
                toast.error(t("otherText.6"))
                if(err.response.status == 422) {
                    setValidationError(err.response.data.errors)
                }
                console.log(err.response.data);
            })
            .finally(() => setRegisterLoading(false))
    }
    

  return (
    <div className="login-wrapper">
      <div className="form-container shadow-sms">
        <img src={logo} width='240' height='62' alt="SeaSMS Logo" className="img-fluid" />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>{labels[5]}</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder={placeholderText[2]}
                name='inviteCode'
                value={formData.inviteCode}
                onChange={handleChange}
            />
            {validationError.inviteCode && (<small className="text-danger mt-1 mb-0">{validationError.inviteCode[0]}</small>)}
          </div>

          <div className="mb-3">
            <label>{labels[0]}</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder={placeholderText[3]}
                name='userId'
                value={formData.userId}
                onChange={handleChange}
            />
            {validationError.userId && (<small className="text-danger mt-1 mb-0">{validationError.userId[0]}</small>)}
          </div>

          <div className="mb-3">
            <label>{labels[6]}</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder={placeholderText[4]} 
                name='name'
                value={formData.name}
                onChange={handleChange}
            />
            {validationError.name && (<small className="text-danger mt-1 mb-0">{validationError.name[0]}</small>)}
          </div>

          <div className="mb-4">
            <label>{labels[1]}</label>
            <input 
                type="password" 
                className="form-control"
                name='password'
                value={formData.password}
                onChange={handleChange} 
            />
            {validationError.password && (<small className="text-danger mt-1 mb-0">{validationError.password[0]}</small>)}
          </div>

          <div className="mb-4">
            <label>{labels[7]}</label>
            <input 
                type="password" 
                className="form-control" 
                name='password_confirmation'
                value={formData.password_confirmation}
                onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100" disabled={registerLoading}>
            {registerLoading ? <div class="spinner-border spinner-border-sm text-light"></div> : labels[8]}
          </button>
        </form>

        <div className="footer">
          {labels[9]} <NavLink to="/auth/login">{labels[4]}</NavLink>
        </div>

        <div className="telegram">
          <a className="text-decoration-none" href="https://t.me/HIP100">{t("otherText.4")} <b>@HIP100</b></a>
        </div>
      </div>
    </div>
  )
}

export default Register