import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../hooks/axiosInstance';
import { toast } from 'react-toastify';
import Loader from '../../utilities/Loader/Loader';

const EditTestNumber = ({selectedNumber, close, reload}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    phoneNumber: '',
    status: ''
  })
  
  const handleChange = (e) => {
      const {name, value} = e.target

      setFormData(prevFormData => (
          {...prevFormData, [name]: value}
      ))
  }

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosInstance
      .put(`/admin/thirdparty/numbers/${selectedNumber?.id}`, formData)
      .then((res) => {
        toast.success(res.data.message);
        close();
        reload();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
      setFormData({
          label: selectedNumber?.label,
          phoneNumber: selectedNumber?.phone,
          status: selectedNumber?.status
      })
    }, [selectedNumber])

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="mb-2">Label</label>
            <input
              type="text"
              className="form-control"
              name="label"
              placeholder="Enter Label"
              value={formData.label}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="mb-2">Phone number</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="mb-2">Status</label>
            <select 
                name="status" 
                className='form-control'
                value={formData.status}
                onChange={handleChange}
            >
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
            </select>
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
  )
}

export default EditTestNumber