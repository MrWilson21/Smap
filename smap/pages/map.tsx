// pages/index.js
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./mapWrapper'), {
  ssr: false,
});

const MapPage = () => {
  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
};

export default MapPage;
