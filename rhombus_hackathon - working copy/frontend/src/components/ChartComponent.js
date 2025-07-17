import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ summaryData }) => {
  const typeData = summaryData.summary_by_type
    ? Object.keys(summaryData.summary_by_type).map(key => ({
        name: key,
        count: summaryData.summary_by_type[key]
      }))
    : [];

  const statusData = summaryData.summary_by_status
    ? Object.keys(summaryData.summary_by_status).map(key => ({
        name: key,
        count: summaryData.summary_by_status[key]
      }))
    : [];

  return (
    <div className="charts-container">
      <h2>Data Summary</h2>

      {summaryData.most_recent_report && (
        <div className="most-recent-report">
          <h3>Most Recent Report:</h3>
          <p><strong>Type:</strong> {summaryData.most_recent_report.type}</p>
          <p><strong>Status:</strong> {summaryData.most_recent_report.status}</p>
          <p><strong>Location:</strong> {summaryData.most_recent_report.latitude}, {summaryData.most_recent_report.longitude}</p>
          <p><strong>Time:</strong> {new Date(summaryData.most_recent_report.last_reported_at).toLocaleString()}</p>
        </div>
      )}

      <h3>Weapons by Type</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={typeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Weapons by Status</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={statusData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;