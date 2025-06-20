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
          <a className="text-decoration-none" href="https://t.me/HIP100">
            <span className="me-2" style={{fontSize: '25px'}}>
              <svg stroke="#0088cc" fill="#0088cc" stroke-width="0" viewBox="0 0 496 512" class="text-[#0088cc] h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"></path></svg>
            </span>
            {t("otherText.4")} <b>@HIP100</b>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Register