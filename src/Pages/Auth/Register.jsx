import React, { useState } from 'react'
import "./Auth.css"
import { NavLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../../hooks/axiosInstance'
import { toast } from 'react-toastify'

const Register = () => {
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
                toast.success("Account Created Succesfully")
                resetFormData()
                navigate("/auth/login")
            })
            .catch(err => {
                toast.error("An error occured. Please, try again")
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
        <img src="https://www.bada-sms.com/logo.png" width='240' height='62' alt="SeaSMS Logo" className="img-fluid" />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Invitation Code</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Please enter your invitation code" 
                name='inviteCode'
                value={formData.inviteCode}
                onChange={handleChange}
            />
            {validationError.inviteCode && (<small className="text-danger mt-1 mb-0">{validationError.inviteCode[0]}</small>)}
          </div>

          <div className="mb-3">
            <label>id</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder="English letters, numbers, and underscores (_) can be used." 
                name='userId'
                value={formData.userId}
                onChange={handleChange}
            />
            {validationError.userId && (<small className="text-danger mt-1 mb-0">{validationError.userId[0]}</small>)}
          </div>

          <div className="mb-3">
            <label>name</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Please enter your name" 
                name='name'
                value={formData.name}
                onChange={handleChange}
            />
            {validationError.name && (<small className="text-danger mt-1 mb-0">{validationError.name[0]}</small>)}
          </div>

          <div className="mb-4">
            <label>password</label>
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
            <label>verify password</label>
            <input 
                type="password" 
                className="form-control" 
                name='password_confirmation'
                value={formData.password_confirmation}
                onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100" disabled={registerLoading}>
            {registerLoading ? <div class="spinner-border spinner-border-sm text-light"></div> : 'join the membership'}
          </button>
        </form>

        <div className="footer">
          Already have an account? <NavLink to="/auth/login">Log in</NavLink>
        </div>

        <div className="telegram">
          inquiry <b>@SeaSMS</b>
        </div>
      </div>
    </div>
  )
}

export default Register