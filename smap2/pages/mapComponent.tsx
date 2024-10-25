// components/Map.js
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef } from 'react';
import Modal from './modalComponent';

const MapComponent = () => {
  const [modalData, setModalData] = useState(null);
  const mapRef = useRef(null); // Reference to the map instance

  // Example marker data
  const markers = [
    { id: 1, position: [51.5, -0.09], info: 'Marker 1 Info' },
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
            center={[51.505, -0.09]}
            zoom={13}
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
