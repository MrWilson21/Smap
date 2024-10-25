import { Popup, Marker } from 'react-leaflet';
import { icons, type Marker as IMarker } from './mapComponent';
import { Button } from '@/components/ui/button';

type MarkerPopupProps = {
  marker: IMarker;
};

export const Markers = ({ markers }: { markers: IMarker[] }) => {
  return (
    <>
      {markers.map((marker) => (
        <MarkerPopup key={marker.id} marker={marker} />
      ))}
    </>
  );
}

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