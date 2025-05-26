import React, { useEffect, useRef, useState } from "react";
import "./ThirdParty.css";
import EmojiPicker from "emoji-picker-react";
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuthContext";

const pageLengths = [91, 182, 273, 364, 455, 546];

const Thirdparty = () => {
  const {userData} = useAuth()

  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [smsCharge, setSmsCharge] = useState(16);
  const [testReport, setTestReport] = useState([])

  const [formData, setFormData] = useState({
    sendMode: "immediately",
    sendDate: '',
    splitSend: "no",
    splitNumber: "",
    recipients: [],
    recipientCount: "",
    content: "",
    smsAmount: "",
    type: "test",
  });

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

  const resetForm = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      sendMode: "immediately",
      // sendDate: `${dateString} ${hourString}:${minuteString}:00`,
      content: "",
      smsAmount: "",
    }));
  };

  const handleRewrite = () => {
    setFormData((prevFormData) => ({ ...prevFormData, content: "" }));
  };

  const caclulateSmsPages = async () => {
    let arr = [];
    pageLengths.forEach((l) => {
      if (l > formData.content.length) {
        arr.push(l);
      }
    });
    let length = arr[0];
    return pageLengths.indexOf(length) + 1;
  };

  const fetchThirdpartyNumbers = async() => {
    axiosInstance
      .get("/user/message/test_numbers")
      .then((res) => {
        setFormData((prevFormData) => ({ ...prevFormData, recipients: res.data.data, recipientCount: res.data.data.length}));
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  const fetchThirdpartyTest = () => {
    axiosInstance
      .get(`/user/message/test_result/${userData?.userInfo.id}`)
      .then((res) => {
        setTestReport(res.data.data.data)
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const pageCount = await caclulateSmsPages();
    // return console.log(formData);
    
    if (formData.recipientCount > 0) {
      setLoading(true);
      // fetch
      const today = new Date();
      const dateString = today.toISOString().split("T")[0];
      const hourString = today.toISOString().split("T")[1].slice(0, 2);
      const minuteString = today.toISOString().split("T")[1].slice(3, 5);
      const secondString = today.toISOString().split("T")[1].slice(6, 8);

      formData.smsAmount = pageCount * smsCharge * formData.recipientCount;
      formData.sendDate = `${dateString} ${hourString}:${minuteString}:${secondString}`

      axiosInstance
        .post("/user/message/send", formData)
        .then((res) => {
          toast.success(res.data.message);
          resetForm();

          setTimeout(() => {
            fetchThirdpartyTest()  
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchThirdpartyNumbers()
    fetchThirdpartyTest()
  }, [userData])

  return (
    <div className="mx-0">
      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header">3rd party test</h3>
        <p className="content-subheading">
          You can check whether the message is sent normally by testing it
          before sending it.
        </p>
      </div>

      <div className="card mb-4 col-12 col-xl-6 px-2 py-2 shadow-sm">
        <div className="card-body">
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
                <span className="d-none d-sm-inline">Emoticon</span>
              </button>

              <a
                href="https://tinyurl.com/"
                target="_blank"
                className="btn align-items-center d-flex btn-outline-secondary btn-sm text-black fw-semibold text-decoration-none h-9 px-3"
              >
                <i className="fas fa-up-right-from-square me-lg-2"></i>
                <span className="d-none d-sm-inline ms-1">Short URL</span>
              </a>

              <span
                className={`ms-auto small paragraph flex-shrink-0 ${
                  formData?.content?.length > 90 ? "text-yellow" : ""
                }`}
              >
                {formData?.content?.length}/90byte
              </span>

              <button
                id="rewrite"
                className="btn btn-outline-secondary btn-sm text-black fw-semibold g-2 h-9 px-3"
                onClick={handleRewrite}
              >
                <i className="mdi mdi-refresh me-lg-2" aria-hidden="true"></i>
                <span className="d-none d-sm-inline ms-1">Rewrite</span>
              </button>
            </div>

            <textarea
              id="messageTextarea"
              className="form-control mb-2 paragraph4"
              rows="8"
              placeholder="Please enter your message"
              ref={textareaRef}
              value={formData.content}
              name="content"
              onChange={handleChange}
            />
          </div>
          <div className="emoji-section third-party">
            <EmojiPicker open={showEmoji} onEmojiClick={handleEmojiClick} />
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn px-4 btn-dark btn-text2 send-hover"
              id="start-testing-btn"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? (
                <div class="spinner-border spinner-border-sm text-light"></div>
              ) : (
                "Start testing"
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        <h5
          className="mb-3 mt-5"
          style={{
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "28px",
            color: "rgb(10, 10, 10)",
          }}
        >
          Recent test results
        </h5>
        <div
          className="table-responsive p-4 me-3 shadow-sm"
          style={{ border: "1px solid #e5e5e5", borderRadius: "5px" }}
        >
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-muted fw-normal" width="27%">hour</th>
                <th className="text-muted fw-normal" width="40%">detail</th>
                <th className="text-muted fw-normal text-center">SKT</th>
                <th className="text-muted fw-normal text-center">KT</th>
                <th className="text-muted fw-normal text-center">LGU+</th>
              </tr>
            </thead>
            <tbody>
              {testReport.length > 0 && testReport.map(report => (
                <tr style={{ fontSize: "14px" }} key={report.id}>
                  <td>{report.created_at}</td>
                  <td>{report.content}</td>
                  <td className={`${report.skt == 'completed' ? 'text-success' : 'text-danger'} text-center`}>
                    <i className={`fa-solid ${report.skt == 'completed' ? 'fa-check' : 'fa-xmark'}`}></i>
                  </td>
                  <td className={`${report.kt == 'completed' ? 'text-success' : 'text-danger'} text-center`}>
                    <i className={`fa-solid ${report.kt == 'completed' ? 'fa-check' : 'fa-xmark'}`}></i>
                  </td>
                  <td className={`${report.lgu == 'completed' ? 'text-success' : 'text-danger'} text-center`}>
                    <i className={`fa-solid ${report.lgu == 'completed' ? 'fa-check' : 'fa-xmark'}`}></i>
                  </td>
                </tr>
              ))}

              {testReport.length == 0 && (
                <tr><td colSpan={5}><p className="text-center">No record found</p></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div id="testModal" className="modal-overlay" style={{ display: "none" }}>
        <div className="modal-box">
          <span className="close-btn" onclick="closeModal()">
            &times;
          </span>
          <h3 className="text-sub">3rd party test confirmed</h3>
          <p className="paragraph">Would you like to conduct a 3-party test?</p>
          <p className="text-p">
            The test can only be taken once every 30 seconds.
          </p>
          <div className="modal-actions">
            <button onclick="closeModal()" className="cancel-btn">
              cancellation
            </button>
            <button className="check-btn btn-text2">check</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thirdparty;
