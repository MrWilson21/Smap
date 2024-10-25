// pages/index.js
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./mapWrapper'), {
  ssr: false,
});

const HomePage = () => {
  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
};

export default HomePage;
