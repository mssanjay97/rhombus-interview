import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './components/MapComponent';
import FilterPanel from './components/FilterPanel';
import ChartComponent from './components/ChartComponent';
import './App.css'; // For basic styling

function App() {
  const [weapons, setWeapons] = useState([]);
  const [filteredWeapons, setFilteredWeapons] = useState([]);
  const [weaponTypes, setWeaponTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    min_risk_score: 1 // Default to show all
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Fetch initial data and filter options
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [weaponsRes, typesRes, statusesRes, summaryRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/weapons`),
          axios.get(`${API_BASE_URL}/api/weapon_types`),
          axios.get(`${API_BASE_URL}/api/statuses`),
          axios.get(`${API_BASE_URL}/api/data_summary`)
        ]);
        setWeapons(weaponsRes.data);
        setFilteredWeapons(weaponsRes.data); // Initially show all
        setWeaponTypes(typesRes.data);
        setStatuses(statusesRes.data);
        setSummaryData(summaryRes.data);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  // Apply filters whenever filters state changes
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setLoading(true);
        const params = {
          ...(filters.type && { type: filters.type }),
          ...(filters.status && { status: filters.status }),
          ...(filters.min_risk_score > 1 && { min_risk_score: filters.min_risk_score }) // Only send if not default
        };
        const response = await axios.get(`${API_BASE_URL}/api/weapons`, { params });
        setFilteredWeapons(response.data);
      } catch (err) {
        console.error("Error fetching filtered data:", err);
        setError("Failed to apply filters.");
      } finally {
        setLoading(false);
      }
    };
    applyFilters();
  }, [filters, API_BASE_URL]);


  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  if (loading && weapons.length === 0) return <div className="loading">Loading data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rhombus Power - Weapons Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          weaponTypes={weaponTypes}
          statuses={statuses}
        />
        <div className="map-and-charts">
          <MapComponent weapons={filteredWeapons} />
          <ChartComponent summaryData={summaryData} />
        </div>
      </div>
    </div>
  );
}

export default App;