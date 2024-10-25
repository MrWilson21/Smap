// components/Map.js
import { MapContainer, TileLayer, Marker as IMarker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef } from 'react';
import 'leaflet/dist/images/marker-shadow.png';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import SmellRatingModal from './smellRatingModal';
import { v4 as randomUUID } from 'uuid';
import { Markers } from './markerPopup';
import Head from 'next/head';
import RatingsSidebar from './sidebar';

const iconSize: [number, number] = [50, 50];
const iconAnchor: [number, number] = [25, 25];

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
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

L.Marker.prototype.options.icon = DefaultIcon;

export const icons = {
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
};

type Info = {
  tags: string[];
  reviews: {userName: string, message: string, rating: number }[];
  avgRating: number;
  pictureUrl: string;
}

export type IMarker = {
  id: string;
  position: [number, number];
  title: string,
  info: Info,
  icon: keyof typeof icons;
};

const defaultInfo: Info = {
  tags: ['Smell tag'],
  reviews: [
    {
      userName: 'username',
      message: 'message', 
      rating: 5 
    }
  ],
  avgRating: 5,
  pictureUrl: ''
}

const nickInfo: Info = {
  tags: ['Toxic', 'haunted', 'smelly'],
  reviews: [
    {
      userName: 'Vin Diesel',
      message: 'Smells like diesel', 
      rating: 2 
    },
    {
      userName: 'Gordon Ramsey',
      message: 'This house is a toxic wasteland', 
      rating: 1 
    },
    {
      userName: 'Martin',
      message: 'Smells good, 4/5 would smell again', 
      rating: 4 
    }
  ],
  avgRating: 2.3,
  pictureUrl: '/reviewImages/nick.png'
}

const GreggsInfo: Info = {
  tags: ['Yummers', 'Warm', 'Bread'],
  reviews: [
    {
      userName: 'Greg',
      message: 'EXTREMELY satisfactory smelling experience', 
      rating: 2 
    },
    {
      userName: 'Gregory',
      message: 'I love sausage rolls!', 
      rating: 4
    },
    {
      userName: 'Gregson',
      message: 'Such incredible smells', 
      rating: 5
    },
  ],
  avgRating: 2.3,
  pictureUrl: '/reviewImages/nick.png'
}

const initialMarkerData : IMarker[] = [
  { id: randomUUID(), position: [52.62952658732376, 1.2859931587362452], title: 'Breadsource', info: defaultInfo, icon: 'breadIcon' },
  { id: randomUUID(), position: [52.630166203372205, 1.2920765062333093], title: 'Strangers', info: defaultInfo, icon: 'coffeeIcon' },
  { id: randomUUID(), position: [52.62931346641531, 1.2895524445823923], title: 'The Waffle House', info: defaultInfo, icon: 'icecreamIcon' },
  { id: randomUUID(), position: [52.622505081627374, 1.2967404597303773], title: 'Sainsburys petrol station', info: defaultInfo, icon: 'petrolIcon' },
  { id: randomUUID(), position: [52.639006795570765, 1.2894668554757982], title: 'Nicks house', info: nickInfo, icon: 'toxicIcon' },
  { id: randomUUID(), position: [52.629570713003304, 1.2862641131470753], title: 'Florish', info: defaultInfo, icon: 'flowerIcon' },
  { id: randomUUID(), position: [52.58863180894606, 1.2706696974739864], title: 'Norwich Recycling', info: defaultInfo, icon: 'toxicIcon' },
  { id: randomUUID(), position: [52.621633449858294, 1.2421635912338216], title: 'LCR', info: defaultInfo, icon: 'beerIcon' },
  { id: randomUUID(), position: [52.62986785084428, 1.2824378529987093], title: 'Plantation Garden', info: defaultInfo, icon: 'flowerIcon' },
  { id: randomUUID(), position: [52.62854663672642, 1.292875860959917], title: 'Norwich Market', info: defaultInfo, icon: 'burgerIcon' },
  { id: randomUUID(), position: [52.64761870316902, 1.242524960828406], title: 'Horsies', info: defaultInfo, icon: 'sheepIcon' },
  { id: randomUUID(), position: [52.61903978403072, 1.34784857842603], title: 'Pig Farm', info: defaultInfo, icon: 'sheepIcon' },
  { id: randomUUID(), position: [52.623478429257354, 1.3067264980024775], title: 'Morrisons Petrol station', info: defaultInfo, icon: 'petrolIcon' },
  { id: randomUUID(), position: [52.62514576123289, 1.3037817615181821], title: 'Iceni', info: defaultInfo, icon: 'beerIcon' },
  { id: randomUUID(), position: [52.65439457241453, 1.268521906841431], title: 'The whiffler', info: defaultInfo, icon: 'beerIcon' },
  { id: randomUUID(), position: [52.65456317601651, 1.2692931884116867], title: 'Mcdonalds', info: defaultInfo, icon: 'burgerIcon' },
  { id: randomUUID(), position: [52.62827788228205, 1.293113930022428], title: 'Fish market stall', info: defaultInfo, icon: 'sushiIcon' },
  { id: randomUUID(), position: [52.61445416758018, 1.294416760681079], title: 'Chippy', info: defaultInfo, icon: 'sushiIcon' },
  { id: randomUUID(), position: [52.658425374601805, 1.3246473184151666], title: 'Golden Plaice', info: defaultInfo, icon: 'sushiIcon' },
  { id: randomUUID(), position: [52.6286031714963, 1.3596467009324849], title: 'Thorpe Fish Bar', info: defaultInfo, icon: 'sushiIcon' },
  { id: randomUUID(), position: [52.60800338097941, 1.251767012326038], title: 'Waitrose coffee shop', info: defaultInfo, icon: 'coffeeIcon' },
  { id: randomUUID(), position: [52.620924983224384, 1.2991711646488293], title: 'Brew & Biscuit', info: defaultInfo, icon: 'coffeeIcon' },
  { id: randomUUID(), position: [52.65832124036193, 1.2960896250555982], title: 'Catton Park Sheeps', info: defaultInfo, icon: 'sheepIcon' },
  { id: randomUUID(), position: [52.64419485067767, 1.2365348924891855], title: 'Easters Bakery', info: defaultInfo, icon: 'breadIcon' },
  { id: randomUUID(), position: [52.622892803578814, 1.3071276682641961], title: 'Greggs', info: GreggsInfo, icon: 'breadIcon' },
  { id: randomUUID(), position: [52.619871166259536, 1.2971095949095677], title: 'Lakenham Creamery', info: defaultInfo, icon: 'icecreamIcon' },
  { id: randomUUID(), position: [52.61518476798714, 1.3122940290204816], title: 'Sweet shop', info: defaultInfo, icon: 'icecreamIcon' },
  { id: randomUUID(), position: [52.64523377601617, 1.2578130254040563], title: 'Chemical factory', info: defaultInfo, icon: 'toxicIcon' },
];

type CreateRatingProps = {
  markers: IMarker[];
  setMarkers: (markers: IMarker[]) => void;
};

function CreateRating(props: CreateRatingProps) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<[number, number] | null>(null);

  const onCreateRating = (data: { message: string; rating: number }) => {
    if (location === null) {
      return;
    }

    const newMarker: IMarker = {
      id: randomUUID(),
      title: 'New Marker',
      position: [52.62952658732376, 1.2859931587362452],
      info: {
        tags: ['Smell tag'],
        reviews: [
          {
            userName: 'username',
            message: data.message,
            rating: data.rating,
          },
        ],
        avgRating: data.rating,
        pictureUrl: '',
      },
      icon: 'toxicIcon',
    };

    props.setMarkers([...props.markers, newMarker]);
    setOpen(false);
  };

  const map = useMapEvents({
    click: () => {
      map.locate({ enableHighAccuracy: true });
    },
    locationfound: (location) => {
      setOpen(true);
      console.log('location found:', location);
      setLocation([location.latlng.lat, location.latlng.lng]);
    },
  });

  return (
    <>
      <SmellRatingModal
        open={open}
        onOpenChange={() => setOpen(!open)}
        onSubmit={(data) => onCreateRating(data)}
      />
    </>
  );
}

const MapComponent = () => {
  const [modalData, setModalData] = useState(null);
  const [sidebarMarker, setShowSidebar] = useState<IMarker | null>(null);
  const mapRef = useRef(null); // Reference to the map instance

  const [markers, setMarkers] = useState([...initialMarkerData]);

  const handleMarkerClick = (marker: IMarker) => {
    setShowSidebar(marker);
  }

  return (
    <>
      <Head><title>Smap</title></Head>
      <div id="map" style={{ width: '100%', display: 'flex' }}>
        {sidebarMarker && <RatingsSidebar marker={sidebarMarker} />}
        <MapContainer
          center={[52.6293, 1.2979]}
          zoom={14}
          style={{ height: '100vh', width: '100%' }}
         >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers markers={markers} onClick={handleMarkerClick} />
          <CreateRating markers={markers} setMarkers={setMarkers} />
        </MapContainer>
      </div>
    </>
  );
};

export default MapComponent;
