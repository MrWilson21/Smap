// components/Map.js
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef } from 'react';
import "leaflet/dist/images/marker-shadow.png";
import Modal from './modalComponent';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import SmellRatingModal from './smellRatingModal';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src
});

// Breadsource - 52.62952658732376, 1.2859931587362452
// Strangers - 52.630166203372205, 1.2920765062333093
// The Waffle House - 52.63076388691691, 1.3913047578653808
// Sainsburys petrol station - 52.622505081627374, 1.2967404597303773
// Nicks house - wingfield road - 52.639006795570765, 1.2894668554757982
// Florish - 52.629570713003304, 1.2862641131470753
// Norwich Recycling - 52.58863180894606, 1.2706696974739864
// LCR - UEA - 52.621633449858294, 1.2421635912338216
// Plantation Garden 52.62986785084428, 1.2824378529987093

L.Marker.prototype.options.icon = DefaultIcon;

const initialMarkerData = [
  { id: 1, position: [52.6293,  1.2979], info: 'Marker 1 Info' },
  { id: 2, position: [51.51, -0.1], info: 'Marker 2 Info' },
]

function CreateRating() {
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState<[number, number] | null>(null)

  const map = useMapEvents({
    click: () => {
      map.locate()
    },
    locationfound: (location) => {
      console.log('location found:', location)
      setLocation([location.latlng.lat, location.latlng.lng])
      setOpen(true)
    },
  })

  return <>
    <SmellRatingModal open={open} onOpenChange={() => setOpen(!open)} />  </>
}

const MapComponent = () => {
  const [modalData, setModalData] = useState(null);
  const mapRef = useRef(null); // Reference to the map instance

  const [markers, setMarkers] = useState([...initialMarkerData])

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
            <CreateRating />
          </MapContainer>
        )}
      </div>
      {modalData && <Modal data={modalData} onClose={() => setModalData(null)} />}
    </>
  );
};

export default MapComponent;
