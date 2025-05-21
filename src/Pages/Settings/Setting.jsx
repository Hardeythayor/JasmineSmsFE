import React, { useState } from "react";
import "./Setting.css";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";

const Setting = () => {
  const [loading, setLoading] = useState(false)
  const [validationError, setValidationError] = useState({})
  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    password_confirmation: ''
  })

  const resetFormData = () => {
    setFormData({
      oldPassword: '',
      password: '',
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
    setLoading(true)
    setValidationError({})
    axiosInstance.patch('/user/profile/change_password', formData)
        .then(res => {
            toast.success("Password updated Succesfully")
            resetFormData()
        })
        .catch(err => {
            toast.error("An error occured. Please, try again")
            if(err.response.status == 422) {
                setValidationError(err.response.data.errors)
            }
        })
        .finally(() => setLoading(false))
  }

  return (
    <div className="mx-0">
        <div className="content-header-wrapper">
            <h3 className="mb-0 content-header">setting</h3>
            <p className="content-subheading">Manage your account settings</p>
        </div>

      <div className="card shadow-sms">
        <div className="card-body p-4">
          <h5
            className="card-title fw-bold"
            style={{fontSize: "24px", fontWeight: 600, lineHeight: "24px", color: "rgb(10, 10, 10)"}}
          >
            Change Password
          </h5>
          <p className="paragraph">You can change your account password</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label paragraph2">
                Current password
              </label>
              <div className="input">
                <input
                  type="password"
                  className="form-control"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {validationError.oldPassword && (<small className="text-danger mt-1 mb-0">{validationError.oldPassword[0]}</small>)}
            </div>

            <div className="mb-3">
              <label className="form-label paragraph2">
                New Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {validationError.password && (<small className="text-danger mt-1 mb-0">{validationError.password[0]}</small>)}
            </div>

            <div className="mb-3">
              <label className="form-label paragraph2">
                Confirm new password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  required
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark custom-btn btn-lg" disabled={loading}>
              {loading ? <div class="spinner-border spinner-border-sm text-light"></div> : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
