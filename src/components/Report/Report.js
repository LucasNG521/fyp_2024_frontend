import React, { useEffect, useState } from 'react';
import { fetchReports, removeReport } from '../../api/report'; 
import { useNavigate } from 'react-router-dom';  
import ConfirmationModal from '../ConfirmationModal';
import '../../styles/Report.css';

function ReportPage() {
  const navigate = useNavigate(); 
  const [reports, setReports] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [currentPageReports, setCurrentPageReports] = useState(1);
  const [currentPageLogs, setCurrentPageLogs] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const itemsPerPage = 5;
  
  useEffect(() => {
    async function loadData() {
      try {
        const reportsData = await fetchReports();
        // Sort reports by timestamp in descending order
        const sortedReports = reportsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setReports(sortedReports);
        
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
    setReportToDelete(reportId);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeReport(reportToDelete);
      setReports(reports.filter(report => report.reportId !== reportToDelete));
      setShowConfirmationModal(false);
    } catch (error) {
      alert('Failed to delete report: ' + error.message);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
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
  
  const displayedReports = paginate(reports, currentPageReports, itemsPerPage);
  const displayedLogs = paginate(activityLogs, currentPageLogs, itemsPerPage);
  const totalPagesReports = Math.ceil(reports.length / itemsPerPage);
  const totalPagesLogs = Math.ceil(activityLogs.length / itemsPerPage);

  return (
    <div className="reports-page-container">
      <h1>Reports Management</h1>
      <h4>Total Reports: {reports.length}</h4>
      {displayedReports.map((report, index) => (
        <div key={index} className="report-item">
          <div className="report-image-container">
            <img src={report.image} alt={report.nickName} />
            <p><strong>@{report.nickName}</strong></p>
          </div>
          <div className="report-details">
            <p><strong>Type:</strong> {report.type}</p>
            <p><strong>Breed:</strong> {report.breed}</p>
            <p><strong>Color:</strong> {report.color}</p>
            <p><strong>Description:</strong> {report.description}</p>
            <p><strong>Timestamp:</strong> {new Date(report.timestamp).toLocaleString()}</p>
            <button className="button button-view-details" onClick={() => navigate(`/report/${report.reportId}`)}>View Details</button>
            <button className="button button-delete" onClick={() => handleDeleteReport(report.reportId)}>Delete</button>
          </div>
        </div>
      ))}
      {totalPagesReports > 1 && (
        <>
          <button className="button-nav" onClick={() => handlePageChangeReports(currentPageReports - 1)} disabled={currentPageReports === 1}>
            Previous
          </button>
          <span>Page {currentPageReports} of {totalPagesReports}</span>

          <button className="button-nav" onClick={() => handlePageChangeReports(currentPageReports + 1)} disabled={currentPageReports === totalPagesReports}>
            Next
          </button>
        </>
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this report?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default ReportPage;
