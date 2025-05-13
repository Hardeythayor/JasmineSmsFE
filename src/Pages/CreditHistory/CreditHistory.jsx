import React from 'react'
import "./CreditHistory.css"

const CreditHistory = () => {
  return (
    <div className="mx-0">
        <div className="content-header-wrapper">
            <h3 className="mb-0 content-header">Credit History</h3>
        </div>
        <div className="tab-wrapper mb-3 justify-content-between col-xl-5">
            <ul className="nav nav-pills d-flex w-100" id="creditTab" role="tablist">
            <li className="nav-item flex-fill text-center paragraph" role="presentation">
                <button className="nav-link active w-100" id="entire-tab" data-bs-toggle="tab" data-bs-target="#entire" type="button" role="tab">Entire</button>
            </li>
            <li className="nav-item flex-fill text-center" role="presentation">
                <button className="nav-link w-100" id="charge-tab" data-bs-toggle="tab" data-bs-target="#charge" type="button" role="tab">Charge/Refund</button>
            </li>
            <li className="nav-item flex-fill text-center" role="presentation">
                <button className="nav-link w-100" id="deduction-tab" data-bs-toggle="tab" data-bs-target="#deduction" type="button" role="tab">Deduction</button>
            </li>
            </ul>
        </div>
  
        <div className="tab-content">
            <div className="tab-pane fade show active col-xl-10" id="entire" role="tabpanel">
                <div className="table-responsive">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th className="paragraph">Date</th>
                        <th className="paragraph">Division</th>
                        <th className="paragraph">Amount</th>
                        <th className="paragraph">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="paragraph2 py-3 ">May 8, 2025 07:56</td>
                        <td className="paragraph2 py-3 "><span className="badge rounded-pill bg-danger text-white">Deduction</span></td>
                        <td className="paragraph2 py-3">
                            <div className="amount-container text-danger paragraph2">-48
                            <div className="mobile-date paragraph2">May 8, 2025 07:56</div>
                            </div>
                        </td>
                        <td className="paragraph2 py-3">3rd party test sent</td>
                        </tr>
                        <tr>
                        <td className="paragraph2 py-3" >May 6, 2025 02:59</td>
                        <td className="paragraph2 py-3"><span className="badge rounded-pill bg-danger text-white">Deduction</span></td>
                        <td className="paragraph2 py-3">
                            <div className="amount-container text-danger paragraph2">-48
                            <div className="mobile-date paragraph2">May 6, 2025 02:59</div>
                            </div>
                        </td>
                        <td className="paragraph2 py-3">3rd party test sent</td>
                        </tr>
                        <tr>
                        <td className="paragraph2 py-3">May 6, 2025 02:58</td>
                        <td className="paragraph2 py-3"><span className="badge rounded-pill bg-success text-white">Charge</span></td>
                        <td className="paragraph2 py-3">
                            <div className="amount-container text-success paragraph2">+13,000
                            <div className="mobile-date paragraph2">May 6, 2025 02:58</div>
                            </div>
                        </td>
                        <td className="paragraph2 py-3">Admin Charge</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>

            <div className="tab-pane fade col-xl-10" id="charge" role="tabpanel">
                <div className="table-responsive">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th className="paragraph">Date</th>
                        <th className="paragraph">Division</th>
                        <th className="paragraph">Amount</th>
                        <th className="paragraph">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="paragraph2 py-3">May 6, 2025 02:58</td>
                        <td className="paragraph2 py-3"><span className="badge rounded-pill bg-success text-white">Charge</span></td>
                        <td className="paragraph2 py-3">
                            <div className="amount-container text-success">+13,000
                            <div className="mobile-date">May 6, 2025 02:58</div>
                            </div>
                        </td>
                        <td className="paragraph2 py-3">Admin Charge</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>

            <div className="tab-pane fade col-xl-10" id="deduction" role="tabpanel">
                <div className="table-responsive">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th className="paragraph">Date</th>
                        <th className="paragraph">Division</th>
                        <th className="paragraph">Amount</th>
                        <th className="paragraph">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="paragraph2 py-3">May 8, 2025 07:56</td>
                        <td className="paragraph2 py-3"><span className="badge rounded-pill bg-danger text-white">Deduction</span></td>
                        <td className="paragraph2 py-2">
                            <div className="amount-container text-danger py-2">-48
                            <div className="mobile-date">May 8, 2025 07:56</div>
                            </div>
                        </td>
                        <td className="paragraph2 py-2">3rd party test sent</td>
                        </tr>
                        <tr>
                        <td className="paragraph2 py-2">May 6, 2025 02:59</td>
                        <td className="paragraph2 py-2"><span className="badge rounded-pill bg-danger text-white">Deduction</span></td>
                        <td className="paragraph2 py-2">
                            <div className="amount-container text-danger py-2">-48
                            <div className="mobile-date py-2">May 6, 2025 02:59</div>
                            </div>
                        </td>
                        <td className="py-2">3rd party test sent</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreditHistory
