import React, { useState } from "react";
import "./Setting.css";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";
import { useTranslation } from "react-i18next";

const Setting = () => {
  const {t} = useTranslation()
  const {
    pageHeading, pageSubHeading, oldPasswordLabel,passwordLabel, 
    formHeading, formSubHeading, confirmPasswordLabel, submitButton
  } = t("settings")

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
            toast.error(t("otherText.6"))
            if(err.response.status == 422) {
                setValidationError(err.response.data.errors)
            }
        })
        .finally(() => setLoading(false))
  }

  return (
    <div className="mx-0">
        <div className="content-header-wrapper">
            <h3 className="mb-0 content-header">{pageHeading}</h3>
            <p className="content-subheading">{pageSubHeading}</p>
        </div>

      <div className="card shadow-sms">
        <div className="card-body p-4">
          <h5
            className="card-title fw-bold"
            style={{fontSize: "24px", fontWeight: 600, lineHeight: "24px", color: "rgb(10, 10, 10)"}}
          >
            {formHeading}
          </h5>
          <p className="paragraph">{formSubHeading}</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label paragraph2">
                {oldPasswordLabel}
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
                {passwordLabel}
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
                {confirmPasswordLabel}
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
              {loading ? <div class="spinner-border spinner-border-sm text-light"></div> : submitButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
