import React from 'react'

const SendMessage = () => {
  return (
    <div className="mx-0 col-12 col-xl-10">
        <div className="content-header-wrapper d-flex justify-content-between align-items-center">
            <div>
                <h3 className="mb-0 content-header mt-5">Send text</h3>
                <p className="content-subheading">
                You can compose and send SMS messages
                </p>
            </div>
            <button className="btn paragraph2 btn-hover">
                <i className="fa fa-refresh me-1 p-2" aria-hidden="true"></i> Full
                Initialization
            </button>
        </div>


        <div className="row g-4">
            <div className="col-12 col-xl-8 d-flex flex-column gap-5">
                <div className="card">
                    <div className="card-body mt-2 p-4 shadow-sm">
                    <h5 className="card-title sub-heading">Write a message</h5>
                    <p className="paragraph">Please enter the message you want to send</p>
                    <div
                        className="mb-3 d-flex gap-2 flex-nowrap overflow-auto align-items-center"
                    >
                        <button
                        id="emoji-btn"
                        className="btn btn-outline-secondary btn-sm paragraph2 flex-shrink-0 btn-hover p-2"
                        type="button"
                        >
                        <i className="fa fa-smile-o paragraph2" aria-hidden="true"></i>
                        <span className="d-none d-sm-inline ms-1">Emoticon</span>
                        </button>

                        <a
                        href="https://tinyurl.com/"
                        target="_blank"
                        className="btn btn-outline-secondary btn-sm paragraph2 text-decoration-none flex-shrink-0 btn-hover p-2"
                        >
                        <i className="fas fa-up-right-from-square"></i>
                        <span className="d-none d-sm-inline ms-1">Short URL</span>
                        </a>

                        <span className="ms-auto small paragraph flex-shrink-0"
                        >0/70byte</span
                        >

                        <button
                        id="rewrite"
                        onclick="document.getElementById('messageTextarea').value = ''"
                        className="btn btn-outline-secondary btn-sm text-black fw-semibold flex-shrink-0 btn-hover p-2 px-3 g-2"
                        >
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                        <span className="d-none d-sm-inline ms-1">Rewrite</span>
                        </button>
                    </div>

                    <textarea
                        id="messageTextarea"
                        className="form-control mb-2 paragraph4"
                        rows="15"
                        placeholder="Please enter your message"
                    />
                    </div>
                </div>
                <div className="card">
                    <div className="card-body gap-3 p-4 align-items-center shadow-sm">
                    <h5 className="fw-semibold sub-heading">Sending Settings</h5>

                    <div
                        className="mt-4 d-flex flex-column flex-sm-row gap-3"
                        role="tablist"
                    >
                        <button
                        className="btn tab-btn w-100 w-sm-50 active btn-text2 send-hover"
                        id="ship-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#ship-pane"
                        type="button"
                        role="tab"
                        aria-controls="ship-pane"
                        aria-selected="true"
                        >
                        Shipped immediately
                        </button>

                        <button
                        className="btn tab-btn w-100 w-sm-50 btn-text2 send-hover"
                        id="reserve-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#reserve-pane"
                        type="button"
                        role="tab"
                        aria-controls="reserve-pane"
                        aria-selected="false"
                        >
                        Reservation Send
                        </button>
                    </div>

                    <hr />

                    <div className="tab-content mt-3">
                        <div
                        className="tab-pane fade show active"
                        id="ship-pane"
                        role="tabpanel"
                        aria-labelledby="ship-tab"
                        >
                        <div
                            className="form-check form-switch d-flex align-items-center gap-2 p-0 m-0 justify-content-between"
                        >
                            <label
                            className="form-check-label paragraph5"
                            for="splitSendSwitch"
                            >Split sending settings</label
                            >
                            <input
                            className="form-check-input"
                            type="checkbox"
                            id="splitSendSwitch"
                            />
                        </div>
                        <span className="paragraph"
                            >Split the message and send it sequentially</span
                        >
                        <div className="mt-2 d-none" id="immediateSplitOptions">
                            <select className="form-select">
                            <option value="2">1 each</option>
                            <option value="3">5 each</option>
                            <option value="4">10 each</option>
                            <option value="5">20 each</option>
                            <option value="6">50 each</option>
                            </select>
                        </div>
                        </div>
                        <div
                        className="tab-pane fade"
                        id="reserve-pane"
                        role="tabpanel"
                        aria-labelledby="reserve-tab"
                    >
                        <div className="d-flex gap-3 flex-wrap mb-3">
                        <div className="flex-grow-1">
                            <input
                            type="date"
                            className="form-control"
                            id="reserve-date"
                            value="2025-05-09"
                            />
                        </div>
                    
                        <div className="flex-grow-1">
                            <input
                            type="number"
                            className="form-control"
                            id="reserve-hour"
                            min="0"
                            max="23"
                            placeholder="09"
                            />
                        </div>
                    
                        <div className="flex-grow-1">
                            <input
                            type="number"
                            className="form-control"
                            id="reserve-minute"
                            min="0"
                            max="59"
                            placeholder="00"
                            />
                        </div>
                        </div>
                    
                        <hr />
                    
                        <div
                        className="form-check form-switch d-flex align-items-center gap-2 p-0 m-0 justify-content-between"
                        >
                        <label
                            className="form-check-label paragraph5"
                            for="reserveSplitSendSwitch"
                            >Split sending settings</label
                        >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="reserveSplitSendSwitch"
                        />
                        </div>
                        <span className="paragraph"
                        >Split the message and send it sequentially</span
                        >
                        <div className="mt-2 d-none" id="reserveSplitOptions">
                        <select className="form-select">
                            <option value="2">1 each</option>
                            <option value="3">5 each</option>
                            <option value="4">10 each</option>
                            <option value="5">20 each</option>
                            <option value="5">50 each</option>
                        </select>
                        </div>
                    </div>

                    
                    </div>
                    </div>
                </div>
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                    <span className="sub-heading">Recent Shipments</span>
                    <p className="text-muted paragraph">Here is the last 10 Shipment</p>
                    <p className="text-center paragraph">There is no recent shipment</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-xl-4">
                <div className="card">
                    <div className="card-body p-4 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title sub-heading">Enter recipient number</h5>
                        <span className="badge rounded-pill">Total: 02</span>
                    </div>

                    <div className="mb-2 paragraph">
                        Please enter your phone number. Multiple numbers are separated
                        by commas (,) or line breaks.
                    </div>
                    <div className="mb-2">
                        <div className="form-check form-switch ms-2 mt-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="fixedNumberSwitch"
                        />
                        <label
                            className="form-check-label ms-2 paragraph2"
                            for="fixedNumberSwitch"
                            >Fixed number</label
                        >
                        </div>
                    </div>
                    <div className="row mb-2 g-2">
                        <div className="d-flex gap-2 flex-wrap mb-2">
                        <button
                            className="btn btn-outline-secondary btn-sm flex-fill paragraph2 btn-hover"
                            style={{flex: "1 1 30%"}}
                        >
                            array
                        </button>
                        <button
                            className="btn btn-outline-secondary btn-sm flex-fill paragraph2 btn-hover"
                            style={{flex: "1 1 40%"}}
                        >
                            Remove duplicates
                        </button>
                        <button
                            className="btn btn-sm flex-fill paragraph2 paste-color"
                            style={{flex: "1 1 30%"}}
                        >
                            Paste
                        </button>
                        </div>
                    </div>

                    <textarea className="form-control mb-2" rows="10"></textarea>
                    <ul className="ps-3 mb-0 paragraph">
                        <li>
                        Hyphens (-) and special characters are automatically removed
                        </li>
                        <li>All formats +8210, 8210, 010, 10 are supported</li>
                        <li>
                        Duplicate numbers are allowed (use the remove duplicate button
                        if necessary)
                        </li>
                        <li>Numbers with incorrect format are excluded</li>
                    </ul>
                    <hr />
                    <button
                        className="btn btn-dark px-5 py-2 btn-text2 w-100 send-hover"
                        id="reservation-send-btn"
                    >
                        Send
                    </button>
                    </div>
                </div>
            </div>
        </div>



        
    </div>
  )
}

export default SendMessage