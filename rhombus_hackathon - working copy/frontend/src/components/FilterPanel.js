import React from 'react';

const FilterPanel = ({ filters, onFilterChange, weaponTypes, statuses }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleRiskScoreChange = (e) => {
    onFilterChange({ min_risk_score: parseInt(e.target.value, 10) });
  };

  return (
    <div className="filter-panel">
      <h2>Filters</h2>
      <div className="filter-group">
        <label htmlFor="weaponType">Weapon Type:</label>
        <select
          id="weaponType"
          name="type"
          value={filters.type}
          onChange={handleInputChange}
        >
          <option value="">All Types</option>
          {weaponTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleInputChange}
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="minRiskScore">Min Risk Score:</label>
        <input
          type="range"
          id="minRiskScore"
          name="min_risk_score"
          min="1"
          max="5"
          value={filters.min_risk_score}
          onChange={handleRiskScoreChange}
        />
        <span>{filters.min_risk_score}</span>
      </div>
    </div>
  );
};

export default FilterPanel;