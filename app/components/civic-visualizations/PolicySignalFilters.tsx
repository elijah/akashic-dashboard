import React from 'react';
import { PolicySignal } from '@/lib/geo-intelligence/policy-engine/policy-signal-analyzer';

function PolicySignalFilters({ signals, onFilterChange }: any) {
  // Get unique policy focuses from signals
  const focuses = [...new Set(signals.map((s: any) => s.focus))];
  
  // Get confidence range
  const minConfidence = Math.min(...signals.map((s: any) => s.strength));
  const maxConfidence = Math.max(...signals.map((s: any) => s.strength));
  
  return (
    <div className="policy-filters">
      <h4>Filter Signals</h4>
      <div className="filter-group">
        <label>Focus: </label>
        <select 
          value={onFilterChange.focus || 'all'}
          onChange={(e) => onFilterChange({ ...onFilterChange, focus: e.target.value })}
        >
          <option value="all">All Focuses</option>
          {focuses.map(focus => (
            <option key={focus} value={focus}>
              {focus}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Min Confidence: </label>
        <input 
          type="range"
          min={minConfidence.toFixed(2)}
          max={maxConfidence.toFixed(2)}
          step="0.01"
          value={onFilterChange.minConfidence || minConfidence}
          onChange={(e) => onFilterChange({ ...onFilterChange, minConfidence: parseFloat(e.target.value) })}
        />
        <span>{parseFloat(onFilterChange.minConfidence || minConfidence).toFixed(2)}</span>
      </div>
    </div>
  );
}

export default PolicySignalFilters;