import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import "./SendMessage.css";
import shuffleArray from "../../hooks/useArrayShuffle";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";
import { useTranslation } from "react-i18next";

const hours = shuffleArray.generateNumbersWithLeadingZeros(24);
const minutes = shuffleArray.generateNumbersWithLeadingZeros(60);
const validPrefixes = ['8210', '010', '10', '23490', '23470', '23481'];
const pageLengths = [71, 142, 213, 284, 355, 426]
const today = new Date();
const dateString = today.toISOString().split('T')[0];
const hourString = today.toISOString().split('T')[1].slice(0,2)
const minuteString = today.toISOString().split('T')[1].slice(3,5)

const SendMessage = () => {
  const {t} = useTranslation()
  const {
    pageHeading, pageSubHeading, recipientField, recentShipmentField, sendingSettingsField
  } = t("homePage")

  const textareaRef = useRef(null);
  const dateFieldRef = useRef(null);

  const [loading, setLoading] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false);
  const [date, setDate] = useState(dateString);
  const [hour, setHour] = useState(hourString);
  const [minute, setMinute] = useState(minuteString);
  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [pages, setPages] = useState(1)
  const [error, setError] = useState('');
  const [smsCharge, setSmsCharge] = useState(16)

  const [formData, setFormData] = useState({
    sendMode: "immediately",
    sendDate: "",
    splitSend: "no",
    splitNumber: "",
    recipients: [],
    recipientCount: "",
    content: "",
    smsAmount: "",
    type: 'normal'
  });
  

  const handleDateChange = (e) => setDate(e.target.value);

  const handleHourChange = (e) => setHour(e.target.value);

  const handleMinuteChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0 && value <= 59) {
      setMinute(value);
    }
  };

  const toggleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (emojiObject) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    const cursorPosition = textarea.selectionStart;
    const newText =
      formData.content.substring(0, cursorPosition) +
      emojiObject.emoji +
      formData.content.substring(cursorPosition);

    setFormData({ ...formData, content: newText });
    toggleShowEmoji();
    textarea.focus(); // Keep focus on the textarea after adding the emoji
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleToggle = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      splitSend: e.target.checked == true ? "yes" : "no",
    }));
  };

  // Handle input change (allow only digits, comma, newline)
  const handlePhoneInputChange = (e) => {
    const value = e.target.value.replace(/[^\d,\n+]/g, ''); // allow digits, comma, newline, and +
    setInput(value);
    setError('');
  };

  const resetForm = () => {
    setFormData({
        sendMode: "immediately",
        sendDate: `${date} ${hour}:${minute}:00`,
        splitSend: "no",
        splitNumber: "",
        recipients: [],
        recipientCount: "",
        content: "",
        smsAmount: "",
        type: 'normal'
    });
    setInput('')
    setNumbers([])
    setDate(dateString)
    setHour("09");
    setMinute("00");
  };

  const handleRewrite = () => {
    setFormData((prevFormData) => ({ ...prevFormData, content: "" }));
  };

  // Combine date and time into a single ISO string (optional)
  const getCombinedDateTime = () => {
    if (!date || !hour || minute === "") return null;
    const paddedMinute = minute.toString().padStart(2, "0");
    setFormData((prevFormData) => ({
      ...prevFormData,
      sendDate: `${date} ${hour}:${paddedMinute}:00`,
    }));
  };

  const pickDate = () => {
    dateFieldRef.current?.showPicker?.(); // modern browsers
    // fallback
    if (dateFieldRef.current) {
      dateFieldRef.current.focus();
      dateFieldRef.current.click();
    }
  };

  const setSendMode = (mode) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sendMode: mode,
    }));
  }

  // Split input into an array
  const parseInputToArray = () => {
    let filteredInput = input.replace(/[^\d,\n]/g, '') //remove any special characters (only digits, comma, newline kept)
    filteredInput = input.replace(/,/g, '\n') //Convert commas to new lines;
    const entries = filteredInput
      .split(/[\n,]+/)
      .map(num => num.trim())
      .filter(num => num.length > 0);
    return entries;
  };

  // Sort numbers ignoring leading zeros
  const handleSort = async() => {
    const numbers = await handleValidation();
    
    const entries = numbers;

    // Sort ignoring leading zeros
    const sorted = entries.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    setNumbers(sorted);
    setInput(sorted.join('\n'));
  };

  // Validate numbers (must start with valid prefix, and the rest must be exactly 8 digits)
  const handleValidation = async () => {
    const entries = parseInputToArray();
    const validList = [];

    for (let number of entries) {
      const prefix = validPrefixes.find(p => number.startsWith(p));
      if (prefix) {
        const remaining = number.slice(prefix.length);
          if (remaining.length === 8) {
              validList.push(number);
          } 
      }
        
    }
    if(validList.length == 0) {
        toast.error(t("otherText.9"))
        return
    }
    return validList
  };

  const handleDeduplicate = async() => {
    const numbers = await handleValidation();
    
    const entries = numbers;
    const seenBodies = new Set();
    const uniqueNumbers = [];

    for (let number of entries) {
        const prefix = validPrefixes.find(p => number.startsWith(p)) || '';
        const body = number.slice(prefix.length);

        if (!seenBodies.has(body)) {
            seenBodies.add(body);
            uniqueNumbers.push(number);
        }
    }

    setNumbers(uniqueNumbers);
    setInput(uniqueNumbers.join('\n'));
 };

 const handlePasteFromClipboard = async () => {
  try {
    const clipboardText = await navigator.clipboard.readText();

    // Append to existing input
    setInput(prev => (prev ? `${prev}\n${clipboardText}` : clipboardText));
  } catch (err) {
    console.error('Failed to read clipboard: ', err);
    // toast.error('Unable to access clipboard');
  }
};

const handleFullInitialization = () => {
    resetForm()
}

const caclulateSmsPages = async() => {
    let arr = []
    pageLengths.forEach(l => {
        if (l > formData.content.length) {
            arr.push(l) 
        }
    });
    let length = arr[0];
    return pageLengths.indexOf(length) + 1;
}

const fetchSmsCharge = () => {
  axiosInstance.get("/user/message/charge")
    .then(res => {
      setSmsCharge(res.data.data)
    })
    .catch(err => {
      console.log(err.response);
      toast.error(t("otherText.6"))
    })
}

 const sendMessage = async(e) => {
    e.preventDefault()
    const numbers = await handleValidation();
    const pageCount = await caclulateSmsPages()

    if(formData.content.length > 70) {
      toast.error(t("otherText.11"))
      return
    }
    
    if(numbers) {
        setLoading(true)
        formData.recipients = numbers
        formData.recipientCount = numbers.length
        // fetch
        formData.smsAmount = (pageCount * smsCharge) * numbers.length
    
        axiosInstance.post('/user/message/send', formData)
                    .then(res => {
                        toast.success(t("otherText.5"))
                        resetForm()
                    })
                    .catch(err => {
                        console.log(err.response);
                        toast.error(t("otherText.6"))
                    })
                    .finally(() => setLoading(false))
    }
 }

  useEffect(() => {
    fetchSmsCharge()
  }, [])

  useEffect(() => {
    getCombinedDateTime();
  }, [date, hour, minute]);

  return (
    <div className="mx-0 col-12 col-xl-11">
      <div className="content-header-wrapper d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-0 content-header mt-5">{pageHeading}</h3>
          <p className="content-subheading">
            {pageSubHeading}
          </p>
        </div>
        <button className="btn btn-outline-secondary text-black fw-semibold mt-5" onClick={handleFullInitialization}>
          <i className="fa fa-refresh me-1 p-2" aria-hidden="true"></i> {t("messageText.5")}
        </button>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-8 d-flex flex-column gap-5">
          <div className="card shadow-sms position-relative">
            <div className="card-body p-4">
              <h5 className="card-title sub-heading ms-0">{t("messageText.6")}</h5>
              <p className="paragraph">
                {t("messageText.7")}
              </p>
              <div className="position-relative">
                <div className="mb-3 d-flex gap-2 flex-nowrap overflow-auto align-items-center">
                  <button
                    id="emoji-btn"
                    className="btn btn-outline-secondary btn-sm text-black fw-semibold h-9 px-3"
                    type="button"
                    onClick={toggleShowEmoji}
                  >
                    <i
                      className="mdi mdi-emoticon-happy-outline me-lg-2"
                      aria-hidden="true"
                    ></i>
                    <span className="d-none d-sm-inline">{t("messageText.0")}</span>
                  </button>

                  <a
                    href="https://tinyurl.com/"
                    target="_blank"
                    className="btn align-items-center d-flex btn-outline-secondary btn-sm text-black fw-semibold text-decoration-none h-9 px-3"
                  >
                    <i className="fas fa-up-right-from-square me-lg-2"></i>
                    <span className="d-none d-sm-inline ms-1">{t("messageText.1")}</span>
                  </a>

                  <span className={`ms-auto small paragraph flex-shrink-0 ${formData?.content?.length > 70 ? 'text-yellow' : ''}`}>
                    {formData?.content?.length}/70byte
                  </span>

                  <button
                    id="rewrite"
                    className="btn btn-outline-secondary btn-sm text-black fw-semibold g-2 h-9 px-3"
                    onClick={handleRewrite}
                  >
                    <i
                      className="mdi mdi-refresh me-lg-2"
                      aria-hidden="true"
                    ></i>
                    <span className="d-none d-sm-inline ms-1">{t("messageText.2")}</span>
                  </button>
                </div>

                <textarea
                  id="messageTextarea"
                  className="form-control mb-2 paragraph4 d-none d-lg-block"
                  rows="20"
                  placeholder={t("messageText.3")}
                  ref={textareaRef}
                  value={formData.content}
                  name="content"
                  onChange={handleChange}
                />
                <textarea
                  id="messageTextarea"
                  className="form-control mb-2 paragraph4 d-lg-none"
                  rows="8"
                  placeholder={t("messageText.3")}
                  ref={textareaRef}
                  value={formData.content}
                  name="content"
                  onChange={handleChange}
                />
              </div>
              <div className="emoji-section">
                <EmojiPicker open={showEmoji} onEmojiClick={handleEmojiClick} />
              </div>
            </div>
          </div>
          {/* <div className="card shadow-sms">
            <div className="card-body gap-3 p-4 align-items-center">
              <h5 className="fw-semibold sub-heading ms-0">{sendingSettingsField[0]}</h5>

              <div
                className="mt-4 mb-3 d-flex flex-column flex-sm-row gap-3 tab-section"
                role="tablist"
              >
                <button
                  className="w-100 w-sm-50 active btn btn-outline-secondary text-black fw-semibold"
                  id="ship-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#ship-pane"
                  type="button"
                  role="tab"
                  aria-controls="ship-pane"
                  aria-selected="true"
                  onClick={() => setSendMode('immediately')}
                >
                  {sendingSettingsField[1]}
                </button>

                <button
                  className="w-100 w-sm-50 btn btn-outline-secondary text-black fw-semibold"
                  id="reserve-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#reserve-pane"
                  type="button"
                  role="tab"
                  aria-controls="reserve-pane"
                  aria-selected="false"
                  onClick={() => setSendMode('reserved')}
                >
                  {sendingSettingsField[2]}
                </button>
              </div>

              <hr />

              <div className="tab-content mt-4">
                <div
                  className="tab-pane fade show active"
                  id="ship-pane"
                  role="tabpanel"
                  aria-labelledby="ship-tab"
                ></div>
                <div
                  className="tab-pane fade"
                  id="reserve-pane"
                  role="tabpanel"
                  aria-labelledby="reserve-tab"
                >
                  <div className="row">
                    <div className="col-lg-7 position-relative mb-lg-1 mb-3">
                      <button
                        onClick={pickDate}
                        className="btn btn-outline-secondary text-black h-9 w-100  align-items-center d-flex justify-content-left"
                      >
                        <i className="mdi mdi-calendar me-3"></i>
                        {date}
                      </button>
                      <input
                        ref={dateFieldRef}
                        type="date"
                        className="form-control"
                        id="reserve-date"
                        value={date}
                        onChange={handleDateChange}
                        style={{
                          visibility: "hidden",
                          position: "absolute",
                          top: 5,
                        }}
                      />
                    </div>

                    <div className="col-lg-2 mb-lg-1 mb-3">
                      <select
                        className="form-control form-select"
                        value={hour}
                        onChange={handleHourChange}
                      >
                        {hours &&
                          hours.map((hour, i) => (
                            <option key={`hour-${i}`} value={hour}>
                              {hour}시
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-lg-2 mb-lg-1 mb-3">
                      <select
                        className="form-control form-select"
                        value={minute}
                        onChange={handleMinuteChange}
                      >
                        {minutes &&
                          minutes.map((minute, i) => (
                            <option key={`min-${i}`} value={minute}>
                              {minute}분
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <hr />
                </div>
                <div className="d-flex align-items-center p-0 m-0 justify-content-between">
                  <div>
                    <p className="paragraph5 mb-1">{sendingSettingsField[3]}</p>
                    <p className="paragraph">
                      {sendingSettingsField[4]}
                    </p>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="reserveSplitSendSwitch"
                      name="splitSend"
                      role="switch"
                      // value={formData.splitSend}
                      onChange={handleToggle}
                    />
                    <label
                      className="form-check-label ms-2 fw-semibold"
                      for="reserveSplitSendSwitch"
                    >
                      <small>
                        {formData.splitSend == "yes" ? sendingSettingsField[6] : sendingSettingsField[5]}
                      </small>
                    </label>
                  </div>
                </div>
                {formData.splitSend == 'yes' && (
                    <div className="mt-2">
                        <select 
                            className="form-select"
                            name="splitNumber"
                            value={formData.splitNumber}
                            onChange={handleChange}
                        >
                            <option value="1">1{sendingSettingsField[7]}</option>
                            <option value="5">5{sendingSettingsField[7]}</option>
                            <option value="10">10{sendingSettingsField[7]}</option>
                            <option value="20">20{sendingSettingsField[7]}</option>
                            <option value="50">50{sendingSettingsField[7]}</option>
                        </select>
                    </div>
                )}
              </div>
            </div>
          </div>
          <div className="card shadow-sms">
            <div className="card-body p-4">
              <span className="sub-heading ms-0">{recentShipmentField[0]}</span>
              <p className="text-muted paragraph">
                {recentShipmentField[1]}
              </p>
              <p className="text-center paragraph">
                {recentShipmentField[2]}
              </p>
            </div>
          </div> */}
        </div>
        <div className="col-12 col-xl-4">
          <div className="card shadow-sms">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title sub-heading ms-0">
                  {recipientField[0]}
                </h5>
                <span className="badge rounded-pill text-black">{t("homePage.recipientTotal", {count: numbers.length})}</span>
              </div>

              <div className="mb-3 paragraph">
                {recipientField[1]}
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
                  >
                    {recipientField[2]}
                  </label>
                </div>
              </div>
              <div className="row mb-2 g-2">
                <div className="d-flex gap-2 flex-wrap mb-2">
                  <button
                    className="btn btn-outline-secondary btn-sm flex-fill paragraph2 text-black fw-semibold"
                    style={{ flex: "1 1 30%" }}
                    onClick={handleSort}
                  >
                    <i className="mdi mdi-sort-descending me-2"></i>
                    {recipientField[3]}
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm flex-fill paragraph2 text-black fw-semibold"
                    style={{ flex: "1 1 40%" }}
                    onClick={handleDeduplicate}
                  >
                    <i className="mdi mdi-filter-outline me-2"></i>
                    {recipientField[4]}
                  </button>
                  <button
                    className="btn btn-sm flex-fill paragraph2 paste-color btn-light text-black fw-semibold"
                    style={{ flex: "1 1 30%" }}
                    onClick={handlePasteFromClipboard}
                  >
                    <i className="mdi mdi-content-paste me-2"></i>
                    {recipientField[5]}
                  </button>
                </div>
              </div>

              <textarea 
                className="form-control mb-2" 
                rows="12"
                name="input"
                value={input}
                onChange={handlePhoneInputChange}
              />
              <ul className="ps-3 mb-0 paragraph">
                <li>
                  {recipientField[6]}
                </li>
                <li>{recipientField[7]}</li>
                <li>
                  {recipientField[8]}
                </li>
                <li>{recipientField[9]}</li>
              </ul>
              <hr />
              <button
                className="btn btn-dark px-5 py-2 btn-text2 w-100 send-hover"
                id="reservation-send-btn"
                onClick={sendMessage}
                disabled={loading}
              >
                {loading ? <div class="spinner-border spinner-border-sm text-light"></div> : recipientField[10]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
