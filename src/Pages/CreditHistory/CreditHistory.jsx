import React, { useEffect, useState } from 'react'
import "./CreditHistory.css"
import axiosInstance from '../../hooks/axiosInstance'
import { toast } from 'react-toastify'
import useAuth from '../../hooks/useAuthContext'
import CreditHistoryTable from '../../components/CreditHistoryTable'
import Loader from '../../components/utilities/Loader/Loader'

const CreditHistory = () => {
    const {userData} = useAuth()

    const [loading, setLoading] = useState(false)
    const [creditHistory, setCreditHistory] = useState([])
    const [filter, setFilter] = useState({
        type: ''
    })

    const handleFilterChange = (value) => {
      setFilter({type: value})
    }

    const fetchUserCreditHistory = () => {
        setLoading(true)
        axiosInstance.post(`/user/credit/history/${userData.userInfo?.id}`, filter)
            .then(res => {
                setCreditHistory(res.data.data)
            })
            .catch(err => {
                console.log(err.response)
                toast.error(err.response.message)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if(userData.userInfo) {
            fetchUserCreditHistory()
        }
    }, [userData, filter])

  return (
    <div className="mx-0">
        <div className="content-header-wrapper">
            <h3 className="mb-0 content-header">Credit History</h3>
        </div>
        <div className="tab-wrapper mb-3 justify-content-between col-xl-5">
            <ul className="nav nav-pills d-flex w-100" id="creditTab" role="tablist">
            <li className="nav-item flex-fill text-center paragraph" role="presentation">
                <button className="nav-link active w-100" id="entire-tab" 
                    data-bs-toggle="tab" data-bs-target="#entire" type="button" role="tab"
                    onClick={() => handleFilterChange('')}
                >Entire</button>
            </li>
            <li className="nav-item flex-fill text-center" role="presentation">
                <button className="nav-link w-100" id="charge-tab" data-bs-toggle="tab"
                 data-bs-target="#charge" type="button" role="tab" onClick={() => handleFilterChange('charge')}
                >Charge/Refund</button>
            </li>
            <li className="nav-item flex-fill text-center" role="presentation">
                <button className="nav-link w-100" id="deduction-tab" data-bs-toggle="tab" 
                data-bs-target="#deduction" type="button" role="tab" onClick={() => handleFilterChange('deduction')}
            >Deduction</button>
            </li>
            </ul>
        </div>
  
        <div className="tab-content">
            <div className="tab-pane fade show active col-xl-10" id="entire" role="tabpanel">
                <CreditHistoryTable creditHistory={creditHistory}/>
            </div>

            <div className="tab-pane fade col-xl-10" id="charge" role="tabpanel">
               <CreditHistoryTable creditHistory={creditHistory}/>
            </div>

            <div className="tab-pane fade col-xl-10" id="deduction" role="tabpanel">
                <CreditHistoryTable creditHistory={creditHistory}/>
            </div>
        </div>

        {loading && <Loader />}
    </div>
  )
}

export default CreditHistory
