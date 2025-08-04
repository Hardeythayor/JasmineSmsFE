import React, { useEffect, useState } from 'react'
import "./SpamFilters.css"
import axiosInstance from '../../../../hooks/axiosInstance';
import { toast } from 'react-toastify';
import { Pagination } from '@mui/material';
import { Modal } from 'react-bootstrap';
import Loader from '../../../../components/utilities/Loader/Loader';
import CreateSpamWord from '../../../../components/Modal/SpamFilters/CreateSpamWord';
import EditSpamWord from '../../../../components/Modal/SpamFilters/EditSpamWord';

const SpamFilters = () => {
    const [spamWords, setSpamWords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const openUpdateSpamWord = (code) => {
        setSelectedWord(code)
        setIsEditModalOpen(true)
    }

    const handlePageChange = (e, value) => {
        setPage(value);
    };


    const fetchSpamWords = () => {
        setLoading(true)
            axiosInstance.post(`/admin/spam_filter?page=${page}`, {paginated: true})
                        .then(res => {
                            setSpamWords(res.data.data.data)
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
        fetchSpamWords();
    }, [page]);

  return (
    <div className='card shadow-sms'>
        <div className="card-header">
            <h6>Spam Filters</h6>
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
                                    <th>Spam Word</th>
                                    <th>Status</th>
                                    <th width="5%">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {spamWords.length > 0 ? (
                                    spamWords.map((spamWord, i) => (
                                    <tr key={spamWord.id}>
                                        <td>{i+1}</td>
                                        <td>{spamWord.word ? spamWord.word : '-'}</td>
                                        <td>
                                        <span
                                            className={`badge px-3 py-2 rounded-pill text-capitalize ${
                                            spamWord.status === "active"
                                                ? "bg-success text-white"
                                                : "bg-danger text-white"
                                            }`}
                                        >
                                            {spamWord.status}
                                        </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-sm btn-light"
                                                    type="button"
                                                    id={`dropdownMenuButton${spamWord.id}`}
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                <i className="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby={`dropdownMenuButton${spamWord.id}`}
                                                >
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => openUpdateSpamWord(spamWord)}
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

            {spamWords.length > 0 && (
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

            {/* Create Spam Filters Modal */}
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={isCreateModalOpen}
                onHide={() => setIsCreateModalOpen(false)}
            >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5>New Spam Word</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateSpamWord 
                        close={() => setIsCreateModalOpen(false)} 
                        reload={fetchSpamWords}
                    />
                </Modal.Body>
            </Modal>

            {/* Update User sms Credit recharge Modal */}
            {selectedWord && (
                <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={isEditModalOpen}
                    onHide={() => setIsEditModalOpen(false)}
                >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title id="contained-modal-title-vcenter">
                    <h5>Update <b className="text-uppercase text-info">{selectedWord?.word}</b></h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditSpamWord 
                        selectedWord={selectedWord}
                        close={() => setIsEditModalOpen(false)} 
                        reload={fetchSpamWords}
                    />
                </Modal.Body>
                </Modal>
            )}
        </div>
    </div>
  )
}

export default SpamFilters