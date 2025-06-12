import React from "react";
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
import Loader from "../../components/utilities/Loader/Loader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const { t } = useTranslation();
  // const { pageHeading, dashboardText } = t("admindashboard");
  const { pageHeading, dashboardText } = t("dashboard");

  const analyticsData = {
    total_sms: 12000, 
    credit: 5000,
  };

  const creditHistory = [
    { id: 1, type: 'charge', purpose: 'bulk_sms', recipient_count: 100, amount: 200, created_at: '2025-06-12' },
    { id: 2, type: 'debit', purpose: 'single_sms', recipient_count: 1, amount: 5, created_at: '2025-06-10' },
  ];

  const chartData = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    sms_count: [100, 200, 150, 300, 250, 180, 220],
  };

  const chartOptions = {
    responsive: true,
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
  };

  const chartConfig = {
    labels: chartData.days,
    datasets: [
      {
        label: dashboardText[6],
        data: chartData.sms_count,
        backgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  return (
    <div className="mx-0">
      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header mt-5">{pageHeading} (Admin)</h3>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sms">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="mb-2 fw-semibold">{dashboardText[0]}</div>
                <div className="fw-bold fs-4">{analyticsData.total_sms.toLocaleString()} {dashboardText[7]}</div>
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
                <div className="fw-bold fs-3">{analyticsData.credit.toLocaleString()}</div>
                <div className="text-muted small">{dashboardText[3]}</div>
              </div>
              <i className="fa fa-credit-card fa-lg text-secondary" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card shadow-sms">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="fw-semibold fs-5">{dashboardText[4]}</div>
                <i className="fa-solid fa-clock text-secondary fs-5"></i>
              </div>

              <div className="d-flex flex-column gap-3">
                {creditHistory.map((history, i) => (
                  <React.Fragment key={history.id}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={`${history.type === 'charge' ? 'text-success' : 'text-danger'} d-flex justify-content-center align-items-center rounded-circle`}
                          style={{
                            backgroundColor: history.type === 'charge' ? '#dcfce7' : '#fee2e2',
                            width: "40px",
                            height: "40px"
                          }}
                        >
                          <i className="fa-solid fa-arrow-down"></i>
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
                      <span className={`${history.type === 'charge' ? 'text-success' : 'text-danger'} fw-semibold`}>
                        {history.type === 'charge' ? '+' : '-'}{history.amount.toLocaleString()}
                      </span>
                    </div>
                    {i < creditHistory.length - 1 && <hr className="m-0" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
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
                <Bar options={chartOptions} data={chartConfig} className="chart-size" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
