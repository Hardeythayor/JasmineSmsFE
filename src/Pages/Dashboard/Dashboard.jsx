import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuthContext";
import Loader from "../../components/utilities/Loader/Loader";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const {t} = useTranslation()
  const {pageHeading, dashboardText} = t("dashboard")

  const {userData} = useAuth()

  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [chartLoading, setChartLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState([])
  const [creditHistory, setCreditHistory] = useState([])
  const [chartData, setChartData] = useState([])

  const fetchSmsAnalytics = () => {
    setAnalyticsLoading(true)
    axiosInstance.get('/user/dashboard/me')
      .then(res => {
        setAnalyticsData(res.data.data)
      })
      .catch(err => {
        console.log(err)
        toast.error(err.response.data.message)
      })
      .finally(() => setAnalyticsLoading(false))
  }

  const fetchUserCreditHistory = () => {
    setHistoryLoading(true)
    axiosInstance.post(`/user/credit/history/${userData.userInfo?.id}`, {paginated: true})
        .then(res => {
            setCreditHistory(res.data.data.data.slice(0,5))
        })
        .catch(err => {
            console.log(err.response)
            toast.error(err.response.message)
        })
        .finally(() => setHistoryLoading(false))
  }

  const fetchSmsChartData = () => {
    setChartLoading(true)
    axiosInstance.get('/user/dashboard/chart_data')
        .then(res => {
            setChartData(res.data.data)
        })
        .catch(err => {
            console.log(err.response)
            toast.error(err.response.message)
        })
        .finally(() => setChartLoading(false))
  }


  useEffect(() => {
    fetchSmsAnalytics()
    fetchUserCreditHistory()
    fetchSmsChartData()
  }, [userData])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  let data = {
    labels: chartData?.days,
    datasets: [
      {
        label: dashboardText[6],
        data: chartData?.sms_count,
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  return (
    <div className="mx-0">
      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header mt-5">{pageHeading}</h3>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sms">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="mb-2 fw-semibold">{dashboardText[0]}</div>
                <div className="fw-bold fs-4">{Number(analyticsData?.total_sms).toLocaleString()} {dashboardText[7]}</div>
                <div className="text-muted small">{dashboardText[2]}</div>
              </div>
              <i className="fa-regular fa-message fa-lg text-secondary"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sms">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="mb-2 fw-semibold">{dashboardText[1]}</div>
                <div className="fw-bold fs-3">{Number(analyticsData?.credit).toLocaleString()}</div>
                <div className="text-muted small">{dashboardText[3]}</div>
              </div>
              <i
                className="fa fa-credit-card fa-lg text-secondary"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
        {analyticsLoading && <Loader />}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card shadow-sms">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="fw-semibold fs-5">
                  {dashboardText[4]}
                </div>
                <i className="fa-solid fa-clock text-secondary fs-5"></i>
              </div>

              <div className="d-flex flex-column gap-3">
                {creditHistory.length > 0 && creditHistory.map((history, i) => (
                  <>
                    <div className="d-flex align-items-center justify-content-between" key={history.id}>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={`${history.type == 'charge' ? 'text-success' : 'text-danger'} d-flex justify-content-center align-items-center rounded-circle`}
                          style={{backgroundColor: history.type == 'charge' ? '#dcfce7' : '#fee2e2', width: "40px", height: "40px"}}
                        >
                          <i className="fa-solid fa-arrow-down"></i>
                        </span>
                        <div>
                          <h6 className="mb-0">{history.purpose == '3rd party test sent' ? t("creditHistory.msgPurposeTwo") : t("creditHistory.msgPurposeOne", {count: history.recipient_count})}</h6>
                          <small className="text-muted">{history.created_at}</small>
                        </div>
                      </div>
                      <span className={`${history.type == 'charge' ? 'text-success' : 'text-danger'} fw-semibold`}>
                        {history.type == 'charge' ? '+' : '-'}{Number(history.amount).toLocaleString()}
                      </span>
                    </div>
                    <hr className={`${ i == (creditHistory.length - 1) ? 'd-none' : ''} m-0`} key={`hr${i}`} />
                  </>
                ))}
              </div>
            </div>
          </div>
          {historyLoading && <Loader />}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sms">
            <div className="card-body">
              <div className="fw-semibold fs-5 mb-3">
                {dashboardText[5]}
              </div>
              <div className="custom-height">
                <Bar options={options} data={data} className="chart-size"/>
              </div>
            </div>
          </div>
          {chartLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
