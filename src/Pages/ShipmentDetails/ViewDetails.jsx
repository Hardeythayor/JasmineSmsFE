import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./ViewDetails.css"
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";

const ViewDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false)
  const [reportDetails, setReportDetails] = useState(null)

  const fetchSingleSmsReport = () => {
    setLoading(true)
        axiosInstance.get(`/user/message/report/single/${id}`)
                    .then(res => {
                      setReportDetails(res.data.data)
                    })
                    .catch(err => {
                        console.log(err.response);
                        toast.error(err.response.data.message)
                    })
                    .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchSingleSmsReport()
  }, [id])

  return (
    <div className="mx-0">
      {/* <div className="content-header-wrapper">
        <h3 className="mb-0 content-header">Shipment Details View {id}</h3>
      </div> */}

      <NavLink className="back-button mt-4 text-black fw-semibold" to="/messages">
        <i className="mdi mdi-arrow-left me-2"></i>
        Go Back
      </NavLink>

      <div className="card col-xl-8">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div className="mt-0 mb-0">
              <h2 className="heading-view">Message Information</h2>
              <p className="subtitle paragraph mb-3">
                {reportDetails?.send_type == 'immediately' ? 'Send immediately' : 'Reserved'} ( {reportDetails?.created_at} )
              </p>
              <p className="paragraph mb-0">details</p>
              <p className="paragraph2 mt-0 mb-0">{reportDetails?.content}</p>
            </div>
          </div>

          <div className="mt-0">
            <div className="d-flex py-2">
              <div className="col-4 paragraph mb-0">situation</div>
              <div className="col-4 paragraph mb-0">Sending Type</div>
              <div className="col-4 paragraph mb-0">Time of dispatch</div>
            </div>

            <div className="d-flex m-0">
              <div className="col-4">
                <span
                  className="badge rounded-pill text-success"
                  style={{backgroundColor: '#DCFCE7'}}
                >
                  {reportDetails?.status}
                </span>
              </div>
              <div className="col-4">
                <span
                  className="badge rounded-pill text-success border"
                  style={{backgroundColor: '#DCFCE7'}}
                >
                  {reportDetails?.send_type}
                </span>
              </div>
              <div className="col-4">{reportDetails?.created_at}</div>
            </div>
          </div>

          <div className="mt-2 mb-0 px-2 p-3" style={{backgroundColor: "#FCFCFC"}}>
            <p className="paragraph2 mb-1 px-2">Delivery status</p>
            <div className="row gx-2 gy-2">
              <div className="col-6 col-xl-3">
                <div className="status-box status-success paragraph text-start">
                  <div className="text-success fw-medium">
                    Transmission successful
                  </div>
                  <div className="sub-heading ms-0">{reportDetails?.success_count} items</div>
                </div>
              </div>
              <div className="col-6 col-xl-3">
                <div className="status-box status-failed paragraph text-start">
                  <div className="text-danger fw-medium">Failed to send</div>
                  <div className="sub-heading ms-0">{reportDetails?.fail_count} items</div>
                </div>
              </div>
              <div className="col-6 col-xl-3">
                <div className="status-box status-waiting paragraph text-start">
                  <div className="text-muted fw-medium">Waiting for dispatch</div>
                  <div className="sub-heading ms-0">0 items</div>
                </div>
              </div>
              <div className="col-6 col-xl-3">
                <div className="status-box status-cancel paragraph text-start">
                  <div className="text-danger fw-medium">Cancel sending</div>
                  <div className="sub-heading ms-0">0 items</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card col-xl-8">
        <div className="card-body">
          <h2 className="heading-view">Recipient list</h2>
          <div className="paragraph">
            Recipients who can be cancelled will have a checkbox displayed
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-hover border">
              <thead>
                <tr>
                    <th className="text-muted paragraph py-3 mobile-th">
                        phone number
                    </th>
                <th className="text-muted paragraph py-3 mobile-th">situation</th>
                    <th className="text-muted paragraph py-3 mobile-th">
                        Time of dispatch
                    </th>
                </tr>
              </thead>
              <tbody>
                {reportDetails?.message_recipients.length > 0 && reportDetails?.message_recipients.map(recipient => (
                    <tr>
                        <td className="py-3 paragraph2">{recipient.phone_number}</td>
                        <td className="py-3 paragraph2">
                            <span
                            className="badge rounded-pill d-sm-none text-success mobile-badge"
                            style={{backgroundColor: '#DCFCE7'}}
                            >
                            <i className="fa-solid fa-check"></i>
                            </span>

                            <span
                                className="badge rounded-pill d-none d-sm-inline text-success"
                                style={{backgroundColor: '#DCFCE7'}}
                            >
                                shipment {recipient.status}
                            </span>
                        </td>
                        <td className="py-3 paragraph2">{recipient.sent_at}</td>
                    </tr>
                ))}
                {reportDetails?.message_recipients.length == 0 &&
                    <tr><td colSpan={3}><p className="text-center">No record found</p></td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
