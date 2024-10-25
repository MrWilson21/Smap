import { Marker, Tooltip } from 'react-leaflet';
import { icons, type Marker as IMarker } from './mapComponent';
import { Button } from '@/components/ui/button';
import { Typography } from '@mui/material';

type MarkerPopupProps = {
  marker: IMarker;
  onClick: (m: IMarker) => void;

};

export const Markers = ({ markers, onClick}: { markers: IMarker[], onClick: (marker: IMarker) => void }) => {
  return (
    <>
      {markers.map((marker) => (
        <MarkerPopup key={marker.id} marker={marker} onClick={onClick} />
      ))}
    </>
  );
};

const MarkerPopup = ({ marker, onClick }: MarkerPopupProps) => {
  return (
    <Marker
      icon={icons[marker.icon]}
      key={marker.id}
      position={marker.position}
      eventHandlers={{
        click: () => {
          onClick(marker);
        },
      }}
    >
      <Tooltip direction="top">
        <img src={marker.pictureUrl}></img>
        <Typography>{marker.title}</Typography>
      </Tooltip>
    </Marker>
  );
};

export default MarkerPopup;
