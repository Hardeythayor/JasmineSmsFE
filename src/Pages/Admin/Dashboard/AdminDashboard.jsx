import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../hooks/axiosInstance";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { pageHeading, dashboardText } = t("dashboard");

  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [chartLoading, setChartLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState([])
  const [creditHistory, setCreditHistory] = useState([])
  const [chartData, setChartData] = useState([])

  const fetchSmsAnalytics = () => {
    setAnalyticsLoading(true)
    axiosInstance.get('/admin/dashboard/analytics')
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
    axiosInstance.post(`/user/credit/history`)
        .then(res => {
            setCreditHistory(res.data.data.data.slice(0,10))
        })
        .catch(err => {
            console.log(err.response)
            toast.error(err.response.message)
        })
        .finally(() => setHistoryLoading(false))
  }

  const fetchSmsChartData = () => {
    setChartLoading(true)
    axiosInstance.get('/admin/dashboard/chart_data')
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
  }, [])


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: false,
        text: 'Admin SMS Activity',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  let data = {
    labels: chartData?.days,
    datasets: [
      {
        label: 'Number of Shipments',
        data: chartData?.sms_count,
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  const renderAnalyticsCard = (card, index) => (
    <div key={index} className={`col-12 col-md-${12 / analyticsCards.find(row => row.includes(card)).length}`}>
      <div className="card h-100 shadow-sms">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="flex-grow-1">
            <div className="mb-2 fw-semibold text-muted small">{card.title}</div>
            <div className="fw-bold fs-4 mb-1">
              {card.value.toLocaleString()}
              {card.suffix && <span className="fs-6 text-muted ms-1">{card.suffix}</span>}
            </div>
            <div className="text-muted small">{card.subtitle}</div>
          </div>
          <div className="d-flex align-items-center">
            <i 
              className={`${card.icon} fa-lg text-secondary`}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsRows = () => (
    analyticsCards.map((row, rowIndex) => (
      <div key={rowIndex} className="row g-4 mb-4">
        {row.map((card, cardIndex) => renderAnalyticsCard(card, cardIndex))}
      </div>
    ))
  );

  const renderCreditHistoryItem = (history, index, isLast) => (
    <React.Fragment key={history.id}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <span
            className={`${history.type === 'charge' ? 'text-success' : 'text-danger'} d-flex justify-content-center align-items-center rounded-circle`}
            style={{
              backgroundColor: history.type === 'charge' ? '#dcfce7' : '#fee2e2',
              width: "40px",
              height: "40px"
            }}
          >
            <i className={`fa-solid ${history.type === 'charge' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
          </span>
          <div>
            <h6 className="mb-0">
              {history.purpose === 'bulk_sms'
                ? t("creditHistory.msgPurposeOne", { count: history.recipient_count })
                : t("creditHistory.msgPurposeTwo")}
            </h6>
            <small className="text-muted">{history.created_at}</small>
          </div>
        </div>
        <div className="text-end">
          <span className={`${history.type === 'charge' ? 'text-success' : 'text-danger'} fw-semibold fs-5`}>
            {history.type === 'charge' ? '+' : '-'}{history.amount.toLocaleString()}
          </span>
          <div className="text-muted small">
            {history.recipient_count > 1 ? `${history.recipient_count} recipients` : '1 recipient'}
          </div>
        </div>
      </div>
      {!isLast && <hr className="my-3" />}
    </React.Fragment>
  );

  return (
    <div className="mx-0">

      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header mt-5">{pageHeading} (Admin)</h3>
        <div className="text-muted small mt-2">
          Success Rate: {analyticsData.performance.success_rate}% | 
          Failure Rate: {analyticsData.performance.failure_rate}%
        </div>
      </div>

      {renderAnalyticsRows()}

      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card shadow-sms">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <div className="fw-semibold fs-5">{dashboardText[4] || 'Credit History'}</div>
                  <div className="text-muted small">Recent transactions</div>
                </div>
                <i className="fa-solid fa-clock text-secondary fs-5"></i>
              </div>

              <div className="d-flex flex-column">
                {creditHistory.length > 0 ? (
                  creditHistory.map((history, index) => 
                    renderCreditHistoryItem(history, index, index === creditHistory.length - 1)
                  )
                ) : (
                  <div className="text-center text-muted py-4">
                    <i className="fa-solid fa-inbox fa-2x mb-3"></i>
                    <p>No credit history available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sms">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <div className="fw-semibold fs-5">{dashboardText[5] || 'SMS Activity'}</div>
                  <div className="text-muted small">Weekly SMS statistics</div>
                </div>
                <div className="text-end">
                  <div className="text-muted small">
                    Total: {chartData.sms_count.reduce((a, b) => a + b, 0).toLocaleString()} messages
                  </div>
                  <div className="text-muted small">
                    Average: {Math.round(chartData.sms_count.reduce((a, b) => a + b, 0) / chartData.sms_count.length).toLocaleString()} per day
                  </div>
                </div>
              </div>
              <div style={{ height: '400px' }}>
                <Bar options={chartOptions} data={chartConfig} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;