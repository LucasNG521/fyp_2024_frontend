import React, { useEffect, useState } from 'react';
import { fetchReports, removeReport } from '../api/report'; 
import { useNavigate } from 'react-router-dom';  
import ConfirmationModal from './ConfirmationModal';
import '../styles/ReportsPage.css';

function ReportsPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [currentPageReports, setCurrentPageReports] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const itemsPerPage = 5;
  
  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (error) {
        alert('Failed to fetch reports: ' + error.message);
      }
    };
    loadReports();
  }, []);

  const paginate = (array, pageNumber, pageSize) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const handlePageChangeReports = (newPage) => {
    setCurrentPageReports(newPage);
  };

  const handleDeleteReport = (reportId) => {
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

  const displayedReports = paginate(reports, currentPageReports, itemsPerPage);
  const totalPagesReports = Math.ceil(reports.length / itemsPerPage);

  return (
    <div className="reports-page-container">
      <h1>Reports</h1>
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

export default ReportsPage;
