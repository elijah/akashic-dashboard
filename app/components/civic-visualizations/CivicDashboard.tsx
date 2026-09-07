import React, { useState } from 'react';
import GovernmentMeetingsMap from './GovernmentMeetingsMap';
import ElectionCandidatesVisualization from './ElectionCandidatesVisualization';
import CivicProjectTracker from './CivicProjectTracker';
import PolicySignalFilters from './PolicySignalFilters';

function CivicDashboard() {
  const [activeView, setActiveView] = useState('meetings');
  const [filters, setFilters] = useState({
    focus: 'all',
    minConfidence: 0.3
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-6">Civic Dashboard</h2>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveView('meetings')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeView === 'meetings' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Government Meetings
          </button>
          <button
            onClick={() => setActiveView('candidates')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeView === 'candidates' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Election Candidates
          </button>
          <button
            onClick={() => setActiveView('projects')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeView === 'projects' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Civic Projects
          </button>
        </nav>
        <div className="mt-8">
          <PolicySignalFilters
            signals={[]} // placeholder; will be populated from API in production
            onFilterChange={setFilters}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'meetings' && <GovernmentMeetingsMap filters={filters} />}
        {activeView === 'candidates' && <ElectionCandidatesVisualization filters={filters} />}
        {activeView === 'projects' && <CivicProjectTracker filters={filters} />}
      </div>
    </div>
  );
}

export default CivicDashboard;