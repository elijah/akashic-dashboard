import React from 'react';
import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchCivicEntities } from '@/data-pipeline'; // Assuming this function exists

function GovernmentMeetingsMap() {
  const [meetings, setMeetings] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 36.1621,
    longitude: -86.1589,
    zoom: 10
  });

  useEffect(() => {
    // Fetch civic entities and filter for government meetings
    fetchCivicEntities().then((data) => {
      // Assuming data is an array of CivicEntity
      const meetings = data.filter(
        (entity) => entity.type === 'GovernmentMeeting'
      );
      setMeetings(meetings);
    });
  }, []);

  return (
    <div>
      <Map
        {...viewport}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onMove={(e) => {
          const { latitude, longitude, zoom } = e;
          setViewport((prev) => ({
            ...prev,
            latitude,
            longitude,
            zoom
          }));
        }}
      >
        {meetings.map((meeting) => (
          <Marker
            key={meeting.id}
            latitude={meeting.location?.coordinates?.[1] || 0}
            longitude={meeting.location?.coordinates?.[0] || 0}
          >
            <Popup
              closeOnClick
              closeButton
              anchor="top"
              offset={{ top: [0, -40], left: [0, 0] }}
            >
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
            </Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
}

export default GovernmentMeetingsMap;