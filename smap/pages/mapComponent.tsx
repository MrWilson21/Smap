// components/Map.js
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef } from 'react';
import "leaflet/dist/images/marker-shadow.png";
import Modal from './modalComponent';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src
});

L.Marker.prototype.options.icon = DefaultIcon;

const markers = [
  { id: 1, position: [52.6293,  1.2979], info: 'Marker 1 Info' },
  { id: 2, position: [51.51, -0.1], info: 'Marker 2 Info' },
]

const MapComponent = () => {
  const [modalData, setModalData] = useState(null);
  const mapRef = useRef(null); // Reference to the map instance

  // Example marker data
  const markers = [
    { id: 1, position: [52.6293,  1.2979], info: 'Marker 1 Info' },
    { id: 2, position: [51.51, -0.1], info: 'Marker 2 Info' },
  ];

  const handleMarkerClick = (info) => {
    setModalData(info);
  };

  return (
    <>
      <div id="map" style={{ height: '100vh', width: '100%' }}>
        {mapRef.current === null && (
          <MapContainer
            center={[52.6293,  1.2979]}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
            whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                eventHandlers={{
                  click: () => handleMarkerClick(marker.info),
                }}
              />
            ))}
          </MapContainer>
        )}
      </div>
      {modalData && <Modal data={modalData} onClose={() => setModalData(null)} />}
    </>
  );
};

export default MapComponent;
