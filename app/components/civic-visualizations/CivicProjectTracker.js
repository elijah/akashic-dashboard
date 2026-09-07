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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_map_gl_1 = require("react-map-gl");
require("mapbox-gl/dist/mapbox-gl.css");
const data_pipeline_1 = require("@/data-pipeline");
function CivicProjectTracker() {
    const [projects, setProjects] = (0, react_1.useState)([]);
    const [viewport, setViewport] = (0, react_1.useState)({
        latitude: 36.1621,
        longitude: -86.1589,
        zoom: 10
    });
    (0, react_1.useEffect)(() => {
        // Fetch civic entities and filter for civic projects
        (0, data_pipeline_1.fetchCivicEntities)().then((data) => {
            const projects = data.filter(entity => entity.type === 'CivicProject');
            setProjects(projects);
        });
    }, []);
    return (<div>
      <react_map_gl_1.Map {...viewport} mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/topographic" onMove={(e) => setViewport({ ...e, zoom: Math.min(e.zoom, 15) })}>
        {projects.map(project => (<react_map_gl_1.Marker key={project.id} latitude={project.location?.coordinates?.[1] || 0} longitude={project.location?.coordinates?.[0] || 0}>
            <react_map_gl_1.Popup closeOnClick anchor="bottom">
              <div>
                <h4>{project.name}</h4>
                <p><strong>Type:</strong> {project.type}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Budget:</strong> ${project.budgetEstimate?.toLocaleString()}</p>
                <p><strong>Estimated Completion:</strong> 
                  {project.timeline?.completionDate ?
                new Date(project.timeline.completionDate).toLocaleDateString() : 'TBD'}
                </p>
              </div>
            </react_map_gl_1.Popup>
          </react_map_gl_1.Marker>))}
      </react_map_gl_1.Map>
    </div>);
}
exports.default = CivicProjectTracker;
