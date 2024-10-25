// pages/index.js
import dynamic from 'next/dynamic';
import Navbar from './nav';

const MapWithNoSSR = dynamic(() => import('./mapWrapper'), {
  ssr: false,
});

const MapPage = () => {
  return (
    <div>
      <Navbar />
      <MapWithNoSSR />
    </div>
  );
};

export default MapPage;
