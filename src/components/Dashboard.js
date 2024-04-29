import React, { useEffect, useState } from 'react';
import { fetchReports, removeReport } from '../api/report'; 
import { getLogs } from '../api/common';
import { useNavigate } from 'react-router-dom';  
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate(); 
  const [reports, setReports] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [currentPageReports, setCurrentPageReports] = useState(1);
  const [currentPageLogs, setCurrentPageLogs] = useState(1);
  const itemsPerPage = 5;
  
  useEffect(() => {
    async function loadData() {
      try {
        const reportsData = await fetchReports();
        setReports(reportsData);
        
        const logsData = await getLogs();
        setActivityLogs(logsData);
      } catch (error) {
        alert('Failed to fetch data: ' + error.message);
      }
    };

    loadData();
  }, []);

  const paginate = (array, pageNumber, pageSize) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const handlePageChangeReports = (newPage) => {
    setCurrentPageReports(newPage);
  };

  const handlePageChangeLogs = (newPage) => {
    setCurrentPageLogs(newPage);
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await removeReport(reportId); 
      setReports(reports.filter(report => report.reportId !== reportId));
    } catch (error) {
      alert('Failed to delete report: ' + error.message);
    }
  };

  const displayedReports = paginate(reports, currentPageReports, itemsPerPage);
  const displayedLogs = paginate(activityLogs, currentPageLogs, itemsPerPage);
  const totalPagesReports = Math.ceil(reports.length / itemsPerPage);
  const totalPagesLogs = Math.ceil(activityLogs.length / itemsPerPage);

  return (
    <div className="dashboard-container">
      <h1>Reports Dashboard</h1>

      <div className="reports">
        <h3>Latest Reports:</h3>
        {displayedReports.length > 0 ? (
          <div>
            {displayedReports.map((report, index) => (
              <div key={index} className="report-item">
                <div className="report-image-container">
                  <img src={report.image} alt={report.nickName} />
                  <p><strong>@{report.nickName}</strong></p>
                </div>
                <div className="report-details">
                  <p className="report-detail"><strong>Type:</strong> {report.type}</p>
                  <p className="report-detail"><strong>Breed:</strong> {report.breed}</p>
                  <p className="report-detail"><strong>Color:</strong> {report.color}</p>
                  <p className="report-detail"><strong>Description:</strong> {report.description}</p>
                  <p className="report-detail"><strong>Timestamp:</strong> {new Date(report.timestamp).toLocaleString()}</p>
                  <button onClick={() => navigate(`/report/${report.reportId}`)}>View Details</button>
                  <button onClick={() => handleDeleteReport(report.reportId)}>Delete</button> {/* Add delete button */}
                </div>
              </div>
            ))}
            {totalPagesReports > 1 && (
              <>
                <button className="button-nav" onClick={() => handlePageChangeReports(currentPageReports - 1)} disabled={currentPageReports === 1}>
                  Previous
                </button>
                <button className="button-nav" onClick={() => handlePageChangeReports(currentPageReports + 1)} disabled={currentPageReports === totalPagesReports}>
                  Next
                </button>
              </>
            )}
          </div>
        ) : (
          <p>No reports available.</p>
        )}
      </div>

      <div className="activity-logs">
        <h3>Activity Logs:</h3>
        {displayedLogs.length > 0 ? (
          <div>
            {displayedLogs.map((log, index) => (
              <div key={index} className="activity-log">
                <div>{new Date(log.timestamp).toLocaleString()}</div>
                <div>{log.message}</div>
              </div>
            ))}
            {totalPagesLogs > 1 && (
              <>
                <button className="button-nav" onClick={() => handlePageChangeLogs(currentPageLogs - 1)} disabled={currentPageLogs === 1}>
                  Previous
                </button>
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
    </div>
  );
}

export default Dashboard;
