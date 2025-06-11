import React, { useState } from "react";
import axiosInstance from "../../../hooks/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../../utilities/Loader/Loader";

const RechargeCredit = ({ selectedUser, close, reload }) => {
  const [loading, setLoading] = useState(false);
  const [creditAmount, setCreditAmount] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosInstance
      .post(`/admin/users/sms_credit/${selectedUser?.id}`, {
        amount: creditAmount,
      })
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

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="mb-2">Credit Amount (Krw)</label>
            <input
              type="text"
              className="form-control"
              name="creditAmount"
              placeholder="Enter Amount"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
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
  );
};

export default RechargeCredit;
