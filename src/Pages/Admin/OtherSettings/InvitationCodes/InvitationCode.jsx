import React, { useEffect, useState } from 'react'
import "./InvitationCode.css"
import axiosInstance from '../../../../hooks/axiosInstance';
import { toast } from 'react-toastify';
import { Pagination } from '@mui/material';
import { Modal } from 'react-bootstrap';
import Loader from '../../../../components/utilities/Loader/Loader';
import CreateCode from '../../../../components/Modal/InvitationCodes/CreateCode';
import EditCode from '../../../../components/Modal/InvitationCodes/EditCode';

const InvitationCode = () => {
    const [inviteCodes, setInviteCodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCode, setSelectedCode] = useState(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const openUpdateInviteCode = (code) => {
        setSelectedCode(code)
        setIsEditModalOpen(true)
    }

    const handlePageChange = (_, value) => {
        setPage(value);
    };


    const fetchInviteCodes = () => {
        setLoading(true)
            axiosInstance.get(`/admin/invite_code?page=${page}`)
                        .then(res => {
                            setInviteCodes(res.data.data.data)
                            const pageCount = Math.ceil(
                                res.data.data.total / res.data.data.per_page
                            );
                            setPageCount(pageCount);
                        })
                        .catch(err => {
                            console.log(err.response);
                            toast.error(err.response.data.message)
                        })
                        .finally(() => setLoading(false))

    };

    useEffect(() => {
        fetchInviteCodes();
    }, [page]);

  return (
    <div className='card shadow-sms'>
        <div className="card-header">
            <h6>Invitation Codes</h6>
        </div>
        <div className="card-body">
            <div>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div class="hstack gap-2 mt-2 mb-4 justify-content-end">
                            <button type="button" className="btn btn-outline-dark" onClick={() => setIsCreateModalOpen(true)}>
                                <i className='fa fa-plus me-2'></i>
                                Add New
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table outer-bordered-table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Invitation Code</th>
                                    <th>Status</th>
                                    <th width="5%">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {inviteCodes.length > 0 ? (
                                    inviteCodes.map((code, i) => (
                                    <tr key={code.id}>
                                        <td>{i+1}</td>
                                        <td>{code.invite_code ? code.invite_code : '-'}</td>
                                        <td>
                                        <span
                                            className={`badge px-3 py-2 rounded-pill text-capitalize ${
                                            code.status === "active"
                                                ? "bg-success text-white"
                                                : "bg-danger text-white"
                                            }`}
                                        >
                                            {code.status}
                                        </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-sm btn-light"
                                                    type="button"
                                                    id={`dropdownMenuButton${code.id}`}
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                <i className="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby={`dropdownMenuButton${code.id}`}
                                                >
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => openUpdateInviteCode(code)}
                                                    >
                                                    Edit
                                                    </button>
                                                </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="7" className="text-center">
                                        No Record Found.
                                    </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {inviteCodes.length > 0 && (
                <div className="d-flex justify-content-end mt-3">
                    <Pagination
                        onChange={handlePageChange}
                        count={pageCount}
                        color="primary"
                        // shape="rounded"
                        size="small"
                        page={page}
                    />
                </div>
            )}

            {/* Create Invitation Code Modal */}
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={isCreateModalOpen}
                onHide={() => setIsCreateModalOpen(false)}
            >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5>New Invitation Code</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateCode 
                        close={() => setIsCreateModalOpen(false)} 
                        reload={fetchInviteCodes}
                    />
                </Modal.Body>
            </Modal>

            {/* Update User sms Credit recharge Modal */}
            {selectedCode && (
                <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={isEditModalOpen}
                    onHide={() => setIsEditModalOpen(false)}
                >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title id="contained-modal-title-vcenter">
                    <h5>Update <b className="text-uppercase text-info">{selectedCode?.invite_code}</b> code</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditCode 
                        selectedCode={selectedCode}
                        close={() => setIsEditModalOpen(false)} 
                        reload={fetchInviteCodes}
                    />
                </Modal.Body>
                </Modal>
            )}
        </div>
    </div>
  )
}

export default InvitationCode