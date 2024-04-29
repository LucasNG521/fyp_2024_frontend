import React, { useEffect, useState } from 'react';
import { fetchReports } from '../api/report';
import { fetchAnimals } from '../api/animal';
import { getLogs } from '../api/common';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [totalReports, setTotalReports] = useState(0);
  const [totalAnimals, setTotalAnimals] = useState(0);
  const [totalData, setTotalData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [currentPageLogs, setCurrentPageLogs] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    async function loadData() {
      const reportsData = await fetchReports();
      setReports(reportsData);
      setTotalReports(reportsData.length);

      const animalsData = await fetchAnimals();
      setTotalAnimals(animalsData.length);

      const logsData = await getLogs();
      setActivityLogs(logsData);
      processChartData(reportsData);

      setTotalData({
        labels: ['Reports', 'Animals'],
        datasets: [{
          data: [reportsData.length, animalsData.length],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }]
      });
    };

    loadData();
  }, []);

  const processChartData = (reportsData) => {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const counts = Array(7).fill(0);
    reportsData.forEach(report => {
      const day = new Date(report.timestamp).getDay();
      counts[day]++;
    });

    setChartData({
      labels: weekDays,
      datasets: [{
        label: 'Reports per Day',
        data: counts,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }]
    });
  };

  const paginate = (array, pageNumber, pageSize) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  function getClassForMessage(message) {
    if (message.includes('new') || message.includes('created')) {
      return 'new';
    } else if (message.includes('deleted')) {
      return 'deleted';
    } else if (message.includes('updated')) {
      return 'updated';
    } else {
      return 'other';
    }
  }

  activityLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const displayedLogs = paginate(activityLogs, currentPageLogs, itemsPerPage);
  const totalPagesLogs = Math.ceil(activityLogs.length / itemsPerPage);

  const handlePageChangeLogs = (newPage) => {
    setCurrentPageLogs(newPage);
  };


  return (
    <div className="dashboard-container">
      <h3>Weekly Reports</h3>
      <div className="top-container">
        <div className="chart-container" style={{ width: '70%' }}>
          <Bar data={chartData} />
        </div>
        <div className="chart-data">
          <h4>Result:</h4>
          <ul>
            {chartData.datasets?.[0].data.map((count, index) => (
              <li key={index}>{chartData.labels[index]}: {count}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bottom-container">
        <div className="activity-logs">
          <h3>Activity Logs:</h3>
          {displayedLogs.length > 0 ? (
            <div>
              <div style={{ minHeight: '350px' }}>
                {displayedLogs.map((log, index) => {
                  // Check if the log message starts with "Received new report:"
                  const reportMatch = log.message.match(/Received new report: (\w+)/);
                  return (
                    <div key={index} className={`activity-log ${getClassForMessage(log.message)}`}>
                      <div>{new Date(log.timestamp).toLocaleString()}</div>
                      <div>
                        {reportMatch ? (
                          <Link to={`/report/${reportMatch[1]}`}>
                            {log.message}
                          </Link>
                        ) : (
                          log.message
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {totalPagesLogs > 1 && (
                <>
                  <button className="button-nav" onClick={() => handlePageChangeLogs(currentPageLogs - 1)} disabled={currentPageLogs === 1}>
                    Previous
                  </button>
                  <span>Page {currentPageLogs} of {totalPagesLogs}</span>
                  <button className="button-nav" onClick={() => handlePageChangeLogs(currentPageLogs + 1)} disabled={currentPageLogs === totalPagesLogs}>
                    Next
                  </button>
                </>
              )}
            </div>
          ) : (
            <p>No activity logs available.</p>
          )}
        </div>

        <div className="summary" style={{ width: '50%' }}>
          <h3>Total:</h3>
          <div >
            <Pie data={totalData} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
