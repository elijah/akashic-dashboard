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
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_map_gl_1 = __importStar(require("react-map-gl"));
require("mapbox-gl/dist/mapbox-gl.css");
const data_pipeline_1 = require("@/data-pipeline"); // Assuming this function exists
function GovernmentMeetingsMap() {
    const [meetings, setMeetings] = (0, react_2.useState)([]);
    const [viewport, setViewport] = (0, react_2.useState)({
        width: '100%',
        height: '100vh',
        latitude: 36.1621,
        longitude: -86.1589,
        zoom: 10
    });
    (0, react_2.useEffect)(() => {
        // Fetch civic entities and filter for government meetings
        (0, data_pipeline_1.fetchCivicEntities)().then((data) => {
            // Assuming data is an array of CivicEntity
            const meetings = data.filter((entity) => entity.type === 'GovernmentMeeting');
            setMeetings(meetings);
        });
    }, []);
    return (<div>
      <react_map_gl_1.default {...viewport} mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/light-v9" onMove={(e) => {
            const { latitude, longitude, zoom } = e;
            setViewport((prev) => ({
                ...prev,
                latitude,
                longitude,
                zoom
            }));
        }}>
        {meetings.map((meeting) => (<react_map_gl_1.Marker key={meeting.id} latitude={meeting.location?.coordinates?.[1] || 0} longitude={meeting.location?.coordinates?.[0] || 0}>
            <react_map_gl_1.Popup closeOnClick closeButton anchor="top" offset={{ top: [0, -40], left: [0, 0] }}>
              <div>
                <h3>{meeting.title}</h3>
                <p>
                  <strong>Date:</strong>{' '}
                  {meeting.date ? new Date(meeting.date).toLocaleDateString() : 'TBD'}
                </p>
                <p>
                  <strong>Source:</strong>{' '}
                  {meeting.source}
                </p>
              </div>
            </react_map_gl_1.Popup>
          </react_map_gl_1.Marker>))}
      </react_map_gl_1.default>
    </div>);
}
exports.default = GovernmentMeetingsMap;
