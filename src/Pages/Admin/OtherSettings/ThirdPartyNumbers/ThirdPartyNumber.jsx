import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../hooks/axiosInstance';
import { toast } from 'react-toastify';
import { Pagination } from '@mui/material';
import { Modal } from 'react-bootstrap';
import Loader from '../../../../components/utilities/Loader/Loader';
import CreateTestNumber from '../../../../components/Modal/ThirdPartyNumbers/CreateTestNumber';
import EditTestNumber from '../../../../components/Modal/ThirdPartyNumbers/EditTestNumber';

const ThirdPartyNumber = () => {
    const [testNumbers, setTestNumbers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const openUpdateTestNumber = (num) => {
        setSelectedNumber(num)
        setIsEditModalOpen(true)
    }

    const handlePageChange = (_, value) => {
        setPage(value);
    };


    const fetchThirdPartyNumbers = () => {
        setLoading(true)
            axiosInstance.get(`/admin/thirdparty/numbers`)
                .then(res => {
                    setTestNumbers(res.data.data)
                    // const pageCount = Math.ceil(
                    //     res.data.data.total / res.data.data.per_page
                    // );
                    // setPageCount(pageCount);
                })
                .catch(err => {
                    console.log(err.response);
                    toast.error(err.response.data.message)
                })
                .finally(() => setLoading(false))
    };

    useEffect(() => {
        fetchThirdPartyNumbers();
    }, [page]);

  return (
    <div className='card shadow-sms'>
        <div className="card-header">
            <h6>3rd Party Numbers</h6>
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
                                    <th>label</th>
                                    <th>Phone Number</th>
                                    <th>Status</th>
                                    <th width="5%">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {testNumbers.length > 0 ? (
                                    testNumbers.map((testNumber, i) => (
                                    <tr key={testNumber.id}>
                                        <td>{i+1}</td>
                                        <td>{testNumber.label}</td>
                                        <td>{testNumber.phone}</td>
                                        <td>
                                            <span
                                                className={`badge px-3 py-2 rounded-pill text-capitalize ${
                                                testNumber.status === "active"
                                                    ? "bg-success text-white"
                                                    : "bg-danger text-white"
                                                }`}
                                            >
                                                {testNumber.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-sm btn-light"
                                                    type="button"
                                                    id={`dropdownMenuButton${testNumber.id}`}
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                <i className="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby={`dropdownMenuButton${testNumber.id}`}
                                                >
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => openUpdateTestNumber(testNumber)}
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

            {/* {testNumbers.length > 0 && (
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
            )} */}

            {/* Create ThirdParty Number Modal */}
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={isCreateModalOpen}
                onHide={() => setIsCreateModalOpen(false)}
            >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5>New 3rd party Number</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateTestNumber
                        close={() => setIsCreateModalOpen(false)} 
                        reload={fetchThirdPartyNumbers}
                    />
                </Modal.Body>
            </Modal>

            {/* Update User sms Credit recharge Modal */}
            {selectedNumber && (
                <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={isEditModalOpen}
                    onHide={() => setIsEditModalOpen(false)}
                >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title id="contained-modal-title-vcenter">
                    <h5>Update <b className="text-uppercase text-info">{selectedNumber?.label}</b> details</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditTestNumber 
                        selectedNumber={selectedNumber}
                        close={() => setIsEditModalOpen(false)} 
                        reload={fetchThirdPartyNumbers}
                    />
                </Modal.Body>
                </Modal>
            )}
        </div>
    </div>
  )
}

export default ThirdPartyNumber