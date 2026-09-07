import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchCivicEntities } from '@/data-pipeline';

function CivicProjectTracker() {
  const [projects, setProjects] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 36.1621,
    longitude: -86.1589,
    zoom: 10
  });

  useEffect(() => {
    // Fetch civic entities and filter for civic projects
    fetchCivicEntities().then((data) => {
      const projects = data.filter(
        entity => entity.type === 'CivicProject'
      );
      setProjects(projects);
    });
  }, []);

  return (
    <div>
      <Map
        {...viewport}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/topographic"
        onMove={(e) => setViewport({...e, zoom: Math.min(e.zoom, 15)})}
      >
        {projects.map(project => (
          <Marker
            key={project.id}
            latitude={project.location?.coordinates?.[1] || 0}
            longitude={project.location?.coordinates?.[0] || 0}
          >
            <Popup
              closeOnClick
              anchor="bottom"
            >
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
            </Popup>
          </Marker>
        )}
      </Map>
    </div>
  );
}

export default CivicProjectTracker;