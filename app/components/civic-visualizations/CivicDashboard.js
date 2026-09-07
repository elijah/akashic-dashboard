"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const GovernmentMeetingsMap_1 = __importDefault(require("./GovernmentMeetingsMap"));
const ElectionCandidatesVisualization_1 = __importDefault(require("./ElectionCandidatesVisualization"));
const CivicProjectTracker_1 = __importDefault(require("./CivicProjectTracker"));
const PolicySignalFilters_1 = __importDefault(require("./PolicySignalFilters"));
function CivicDashboard() {
    const [activeView, setActiveView] = (0, react_1.useState)('meetings');
    const [filters, setFilters] = (0, react_1.useState)({
        focus: 'all',
        minConfidence: 0.3
    });
    return (<div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-6">Civic Dashboard</h2>
        <nav className="space-y-2">
          <button onClick={() => setActiveView('meetings')} className={`w-full text-left px-4 py-2 rounded ${activeView === 'meetings'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'}`}>
            Government Meetings
          </button>
          <button onClick={() => setActiveView('candidates')} className={`w-full text-left px-4 py-2 rounded ${activeView === 'candidates'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'}`}>
            Election Candidates
          </button>
          <button onClick={() => setActiveView('projects')} className={`w-full text-left px-4 py-2 rounded ${activeView === 'projects'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'}`}>
            Civic Projects
          </button>
        </nav>
        <div className="mt-8">
          <PolicySignalFilters_1.default signals={[]} // placeholder; will be populated from API in production
     onFilterChange={setFilters}/>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'meetings' && <GovernmentMeetingsMap_1.default filters={filters}/>}
        {activeView === 'candidates' && <ElectionCandidatesVisualization_1.default filters={filters}/>}
        {activeView === 'projects' && <CivicProjectTracker_1.default filters={filters}/>}
      </div>
    </div>);
}
exports.default = CivicDashboard;
