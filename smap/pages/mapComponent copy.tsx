// components/Map.js
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef } from 'react';
import "leaflet/dist/images/marker-shadow.png";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import SmellRatingModal from './smellRatingModal';
import { randomUUID } from 'crypto';

const iconSize: [number, number] = [50, 50];
const iconAnchor: [number, number] = [25, 25];

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src
});

const beerIcon = new L.Icon({
  iconUrl: 'markerIcons/beer.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});
const breadIcon = new L.Icon({
  iconUrl: 'markerIcons/bread.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});
const burgerIcon = new L.Icon({
  iconUrl: 'markerIcons/burger.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});
const coffeeIcon = new L.Icon({
  iconUrl: 'markerIcons/coffee.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});
const flowerIcon = new L.Icon({
  iconUrl: 'markerIcons/flower.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});
const icecreamIcon = new L.Icon({
  iconUrl: 'markerIcons/icecream.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});
const petrolIcon = new L.Icon({
  iconUrl: 'markerIcons/petrol.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});
const sheepIcon = new L.Icon({
  iconUrl: 'markerIcons/sheep.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});
const sushiIcon = new L.Icon({
  iconUrl: 'markerIcons/sushi.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});
const toxicIcon = new L.Icon({
  iconUrl: 'markerIcons/toxic.png',
  iconSize: iconSize,
  iconAnchor: iconAnchor,
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

const icons = {
  beerIcon,
  breadIcon,
  burgerIcon,
  coffeeIcon,
  flowerIcon,
  icecreamIcon,
  petrolIcon,
  sheepIcon,
  sushiIcon,
  toxicIcon,
}

type Marker = {
  id: string;
  position: [number, number];
  reviews: { message: string, rating: number }[];
  icon: keyof typeof icons;
};

const initialMarkerData: Marker[] = [
  { id: randomUUID(), position: [52.62952658732376, 1.2859931587362452], reviews: [], icon: 'breadIcon' },
  { id: randomUUID(), position: [52.630166203372205, 1.2920765062333093], reviews: [], icon: 'coffeeIcon' },
  { id: randomUUID(), position: [52.62931346641531, 1.2895524445823923], reviews: [], icon: 'icecreamIcon' },
  { id: randomUUID(), position: [52.622505081627374, 1.2967404597303773], reviews: [], icon: 'petrolIcon' },
  { id: randomUUID(), position: [52.639006795570765, 1.2894668554757982], reviews: [], icon: 'toxicIcon' },
  { id: randomUUID(), position: [52.629570713003304, 1.2862641131470753], reviews: [], icon: 'flowerIcon' },
  { id: randomUUID(), position: [52.58863180894606, 1.2706696974739864], reviews: [], icon: 'toxicIcon' },
  { id: randomUUID(), position: [52.621633449858294, 1.2421635912338216], reviews: [], icon: 'beerIcon' },
  { id: randomUUID(), position: [52.62986785084428, 1.2824378529987093], reviews: [], icon: 'flowerIcon' },
];

type CreateRatingProps = {
  markers: Marker[];
  setMarkers: (markers: Marker[]) => void;
};

function CreateRating(props: CreateRatingProps) {
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState<[number, number] | null>(null)

  const onCreateRating = (data: { message: string, rating: number }) => {
    if (location === null) {
      return
    }

    const newMarker: Marker = {
      id: randomUUID(),
      position: location,
      reviews: [data],
      icon: 'toxicIcon',
    }

    props.setMarkers([...props.markers, newMarker])
    setOpen(false)
  }

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
    <SmellRatingModal open={open} onOpenChange={() => setOpen(!open)} onSubmit={() => null} />  </>
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
                icon={icons[marker.icon]}
                key={marker.id}
                position={marker.position}
                eventHandlers={{
                  click: () => null,
                }}
              />
            ))}
            <CreateRating markers={markers} setMarkers={setMarkers} />
          </MapContainer>
        )}
      </div>
    </>
  );
};

export default MapComponent;
