import { Popup, Marker } from 'react-leaflet';
import { icons, type Marker as IMarker } from './mapComponent';
import { Button } from '@/components/ui/button';

type MarkerPopupProps = {
  marker: IMarker;
};

const MarkerPopup = ({ marker }: MarkerPopupProps) => {
  return (
    <Marker
      icon={icons[marker.icon]}
      key={marker.id}
      position={marker.position}
      eventHandlers={{
        click: () => null,
      }}
    >
      <Popup>
        <div>
          <Button>Add smell</Button>
        </div>
      </Popup>
    </Marker>
  );
};

export default MarkerPopup;