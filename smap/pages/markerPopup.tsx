import { Marker, Tooltip } from 'react-leaflet';
import { icons, type Marker as IMarker } from './mapComponent';
import { Button } from '@/components/ui/button';
import { Typography } from '@mui/material';

type MarkerPopupProps = {
  marker: IMarker;
};

const MarkerPopup = ({ marker }: MarkerPopupProps) => {
  return (
    <Marker
      icon={icons[marker.icon]}
      key={marker.id}
      position={marker.position}
    >
      <Tooltip direction="top">
        <img src={marker.pictureUrl}></img>
        <Typography>
        {marker.title}
        </Typography>
      </Tooltip>
    </Marker>
  );
};

export default MarkerPopup;