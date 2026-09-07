import React from 'react';
import { useEffect, useState } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchCivicEntities } from '@/data-pipeline';

function ElectionCandidatesVisualization() {
  const [candidates, setCandidates] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 36.1621, // Putnam County center
    longitude: -86.1589,
    zoom: 10
  });

  useEffect(() => {
    // Fetch candidates from data pipeline
    fetchCivicEntities().then((data) => {
      const candidates = data.filter(entity => entity.type === 'Candidate');
      setCandidates(candidates);
    });
  }, []);

  return (
    <div>
      <Map
        {...viewport}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onMove={(e) => setViewport({...e, zoom: Math.min(e.zoom, 15)})}
      >
        {candidates.map(candidate => (
          <Marker
            key={candidate.id}
            latitude={candidate.location?.coordinates?.[1] || 0}
            longitude={candidate.location?.coordinates?.[0] || 0}
          >
            <Popup
              closeOnClick
              anchor="bottom"
            >
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
            </Popup>
          </Marker>
        )}
      </Map>
    </div>
  );
}

export default ElectionCandidatesVisualization;