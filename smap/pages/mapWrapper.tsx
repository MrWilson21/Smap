// components/MapWrapper.js
import { useState, useEffect } from 'react';
import Map from './mapComponent';

const MapWrapper = () => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setShowMap(true);
  }, []);

  return showMap ? <Map /> : null;
};

export default MapWrapper;
