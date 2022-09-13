import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import MapHelper from "./MapHelper";
import classes from './MapWrapper.module.scss';

const MapWrapper = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: MapHelper.libraries,
  });

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <h1 className={classes.mapTitle}>
        Distance Calculator
        <span role="img" aria-label="map">
          🗺️
        </span>
      </h1>
      <GoogleMap
        mapContainerStyle={MapHelper.mapContainerStyle}
        options={MapHelper.options}
        center={MapHelper.center}
        zoom={MapHelper.initialMapZoomLevel}
      ></GoogleMap>
    </div>
  );
};

export default MapWrapper;
