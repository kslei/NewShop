import React, {useMemo, useState} from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import myMarker from '../images/marker.png';
import myMarker1 from '../images/marker1.png';
import styles from '../styles/components/Map.module.scss';
import { useTranslation } from 'react-i18next';

const Map = () => {
  const {t, i18n} = useTranslation()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    language: i18n.language,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [mapRef, setMapRef] = useState();
  const [infoWindowData, setInfoWindowData] = useState();
  //const center = useMemo(() => ({ lat: 47.86367335887368, lng: 35.09411607159396 }), []);
  const markers = [
    { address: `${t("address0")}`, name: 'NEWSHOP', marker: myMarker, lat: 47.863214, lng: 35.094835 },
    { address: `${t("address1")}`, name: '', marker: myMarker1, lat: 47.866198, lng: 35.091137 },
    { address: `${t("address2")}`, name: '', marker: myMarker1, lat: 47.858156, lng: 35.103956 }
  ]
  
  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({lat, lng}) => bounds.extend({lat, lng}));
    map.fitBounds(bounds);
  }

  const handleMarkerClick = (id, lat, lng, address, name) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address, name });
    setIsOpen(true);
  };

  return (
    <div className={styles.map}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName={styles.mapContainer} onLoad={onLoad} onClick={() => setIsOpen(false)}
          /* center={center}
          zoom={15} */
        >
          {markers.map(({address, name, lat, lng, marker}, ind) => <Marker
            key={ind}
            position={{ lat, lng }}
            icon={marker}
            onClick={() => {
              handleMarkerClick(ind, lat, lng, address, name);
            }}
          >
            {isOpen && infoWindowData?.id === ind && (
              <InfoWindow
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                <div>
                  <div className={styles.info__title}>{infoWindowData.name}</div>
                  <div className={styles.info__adress}>{infoWindowData.address}</div>
                </div>
               </InfoWindow>
            )}
          </Marker>)}
        </GoogleMap>
      )}
    </div>
  )
};
export default Map;