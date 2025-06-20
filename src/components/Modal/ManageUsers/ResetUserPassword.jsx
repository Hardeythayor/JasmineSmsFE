import React, { useState } from "react";
import axiosInstance from "../../../hooks/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../../utilities/Loader/Loader";

const ResetUserPassword = ({ selectedUser, close }) => {
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({})
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: ''
  });

  const resetFormData = () => {
    setFormData({
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

  const submitForm = (e) => {
    e.preventDefault();
    
    if(formData.password !== formData.password_confirmation) {
      toast.error("Password do not match")
      return
    }

    setLoading(true);
    
    axiosInstance
      .patch(`/admin/users/reset_password/${selectedUser?.id}`, formData)
      .then((res) => {
        toast.success(res.data.message);
        resetFormData()
        close();
      })
      .catch((err) => {
        console.log(err.response);
        if(err.response.status == 422) {
            setValidationError(err.response.data.errors)
        }
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="mb-4">
            <label>Password</label>
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
            <label>Confirm Password</label>
            <input 
                type="password" 
                className="form-control" 
                name='password_confirmation'
                value={formData.password_confirmation}
                onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <div class="hstack gap-2 justify-content-end">
            <button type="button" className="btn btn-light" onClick={close}>
              Close
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </form>
      {loading && <Loader />}
    </div>
  );
};

export default ResetUserPassword;
