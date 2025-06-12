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
  const { pageHeading, dashboardText } = t("dashboard");

  const analyticsData = {
    messaging: {
      total_sms: 12000,
      direct_sms: 5000,
      test_sms: 200,
      completed: 11800,
      failed: 200,
    },
    financial: {
      total_credit: 15000,
      current_credit: 5000,
    },
    users: {
      total_users: 150,
    },
    performance: {
      success_rate: ((11800 / 12000) * 100).toFixed(1),
      failure_rate: ((200 / 12000) * 100).toFixed(1),
    }
  };

  const creditHistory = [
    { 
      id: 1, 
      type: 'charge', 
      purpose: 'bulk_sms', 
      recipient_count: 100, 
      amount: 200, 
      created_at: '2025-06-12' 
    },
    { 
      id: 2, 
      type: 'debit', 
      purpose: 'single_sms', 
      recipient_count: 1, 
      amount: 5, 
      created_at: '2025-06-10' 
    },
  ];

  const chartData = {
    days: ['10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07', '10/08', '10/09', '10/10', '10/11', '10/12', '10/13', '10/14'],
    sms_count: [100, 200, 150, 300, 250, 180, 220, 280, 190, 350, 400, 320, 210, 260], 
  };

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

  const chartConfig = {
    labels: chartData.days,
    datasets: [
      {
        label: dashboardText[6] || 'SMS Count',
        data: chartData.sms_count,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const analyticsCards = [
    [
      {
        title: dashboardText[0] || 'Total SMS',
        value: analyticsData.messaging.total_sms,
        subtitle: dashboardText[2] || 'Overall total',
        icon: 'fa-regular fa-message',
        suffix: dashboardText[7] || 'messages',
        color: 'primary'
      },
      {
        title: dashboardText[12] || 'Total Users',
        value: analyticsData.users.total_users,
        subtitle: dashboardText[13] || 'Total registered users',
        icon: 'fa fa-users',
        color: 'warning'
      },
      {
        title: dashboardText[10] || 'Total Credit',
        value: analyticsData.financial.total_credit,
        subtitle: dashboardText[11] || 'Total credit across all users',
        icon: 'fa fa-credit-card',
        color: 'success'
      }
    ],
    [
      {
        
        title: dashboardText[8] || 'Total Direct SMS',
        value: analyticsData.messaging.direct_sms,
        subtitle: dashboardText[9] || 'Total direct messages sent',
        icon: 'fa-solid fa-paper-plane',
        suffix: dashboardText[7] || 'messages',
        color: 'info'
      },
      {
        title: dashboardText[14] || 'Total Test SMS',
        value: analyticsData.messaging.test_sms,
        subtitle: dashboardText[15] || 'Total test messages sent',
        icon: 'fa-solid fa-vial-circle-check',
        suffix: dashboardText[7] || 'messages',
        color: 'secondary'
      },
      {
        title: dashboardText[16] || 'Total Completed',
        value: analyticsData.messaging.completed,
        subtitle: dashboardText[17] || 'Total successfully completed messages',
        icon: 'fa-solid fa-check-circle',
        suffix: dashboardText[7] || 'messages',
        color: 'success',
        iconColor: '#28a745'
      },
      {
        title: dashboardText[18] || 'Total Failed',
        value: analyticsData.messaging.failed,
        subtitle: dashboardText[19] || 'Total failed messages',
        icon: 'fa-solid fa-times-circle',
        suffix: dashboardText[7] || 'messages',
        color: 'danger',
        iconColor: '#dc3545'
      }
    ]
  ];
  

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
              style={card.iconColor ? { color: card.iconColor } : {}}
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