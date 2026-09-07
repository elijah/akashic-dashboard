"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_map_gl_1 = require("react-map-gl");
require("mapbox-gl/dist/mapbox-gl.css");
const data_pipeline_1 = require("@/data-pipeline");
function ElectionCandidatesVisualization() {
    const [candidates, setCandidates] = (0, react_2.useState)([]);
    const [viewport, setViewport] = (0, react_2.useState)({
        latitude: 36.1621, // Putnam County center
        longitude: -86.1589,
        zoom: 10
    });
    (0, react_2.useEffect)(() => {
        // Fetch candidates from data pipeline
        (0, data_pipeline_1.fetchCivicEntities)().then((data) => {
            const candidates = data.filter(entity => entity.type === 'Candidate');
            setCandidates(candidates);
        });
    }, []);
    return (<div>
      <react_map_gl_1.Map {...viewport} mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/light-v9" onMove={(e) => setViewport({ ...e, zoom: Math.min(e.zoom, 15) })}>
        {candidates.map(candidate => (<react_map_gl_1.Marker key={candidate.id} latitude={candidate.location?.coordinates?.[1] || 0} longitude={candidate.location?.coordinates?.[0] || 0}>
            <react_map_gl_1.Popup closeOnClick anchor="bottom">
              <div>
                <h4>{candidate.name}</h4>
                <p><strong>Party:</strong> {candidate.party}</p>
                <p><strong>Platform:</strong>
                  {candidate.platform?.join(', ')}
                </p>
                <p><strong>Contact:</strong>
                  {candidate.contact?.website ?
                `<a href='${candidate.contact?.website}'>${candidate.contact?.website}</a>` : 'No website'}
                </p>
              </div>
            </react_map_gl_1.Popup>
          </react_map_gl_1.Marker>))}
      </react_map_gl_1.Map>
    </div>);
}
exports.default = ElectionCandidatesVisualization;
