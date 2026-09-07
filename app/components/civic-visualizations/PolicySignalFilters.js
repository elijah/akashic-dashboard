"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function PolicySignalFilters({ signals, onFilterChange }) {
    // Get unique policy focuses from signals
    const focuses = [...new Set(signals.map((s) => s.focus))];
    // Get confidence range
    const minConfidence = Math.min(...signals.map((s) => s.strength));
    const maxConfidence = Math.max(...signals.map((s) => s.strength));
    return (<div className="policy-filters">
      <h4>Filter Signals</h4>
      <div className="filter-group">
        <label>Focus: </label>
        <select value={onFilterChange.focus || 'all'} onChange={(e) => onFilterChange({ ...onFilterChange, focus: e.target.value })}>
          <option value="all">All Focuses</option>
          {focuses.map(focus => (<option key={focus} value={focus}>
              {focus}
            </option>))}
        </select>
      </div>
      <div className="filter-group">
        <label>Min Confidence: </label>
        <input type="range" min={minConfidence.toFixed(2)} max={maxConfidence.toFixed(2)} step="0.01" value={onFilterChange.minConfidence || minConfidence} onChange={(e) => onFilterChange({ ...onFilterChange, minConfidence: parseFloat(e.target.value) })}/>
        <span>{parseFloat(onFilterChange.minConfidence || minConfidence).toFixed(2)}</span>
      </div>
    </div>);
}
exports.default = PolicySignalFilters;
