import React, { useEffect, useState } from 'react'
import Loader from '../../utilities/Loader/Loader'
import axiosInstance from '../../../hooks/axiosInstance'
import { toast } from 'react-toastify'

const UpdateCharge = ({selectedGateway, close, reload}) => {
    const [loading, setLoading] = useState(false)
    const [smsCharge, setSmsCharge] = useState('')

    const submitForm = (e) => {
        e.preventDefault()
        setLoading(true);

        axiosInstance.patch(`/admin/sms_gateway/charge/${selectedGateway?.id}`, {charge: smsCharge})
            .then(res => {
                toast.success(res.data.message)
                close()
                reload()
            })
            .catch(err => {
                console.log(err.response);
                toast.error(err.response.data.message)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setSmsCharge(selectedGateway?.sms_charge)
    }, [selectedGateway])

  return (
    <div>
        <form onSubmit={submitForm}>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <label className='mb-2'>Sms Charge (Krw)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="smsCharge"
                        placeholder="Enter Sms Charge"
                        value={smsCharge}
                        onChange={(e) => setSmsCharge(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="mt-4">
                <div class="hstack gap-2 justify-content-end">
                    <button type="button" className="btn btn-light" onClick={close}>
                        Close
                    </button>
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </div>
        </form>
        {loading && <Loader />}
    </div>
  )
}

export default UpdateCharge