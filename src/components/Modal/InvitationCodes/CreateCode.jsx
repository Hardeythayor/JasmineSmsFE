import React, { useState } from 'react'
import axiosInstance from '../../../hooks/axiosInstance';
import { toast } from 'react-toastify';
import Loader from '../../utilities/Loader/Loader';

const CreateCode = ({close, reload}) => {
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosInstance
      .post(`/admin/invite_code`, {
        inviteCode,
      })
      .then((res) => {
        toast.success(res.data.message);
        setInviteCode('')
        close();
        reload();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="mb-2">Invitation Code</label>
            <input
              type="text"
              className="form-control"
              name="inviteCode"
              placeholder="Enter Code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              required
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
  )
}

export default CreateCode