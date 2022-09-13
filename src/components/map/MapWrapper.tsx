import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import MapHelper, { MapLibraries } from "./MapHelper";
import { v4 as uuidV4 } from "uuid";
import classes from "./MapWrapper.module.scss";
import IAddress from "../../types/IAddress";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addAddress } from "../../store/addressSlice";
import { useCallback, useEffect, useRef, useState } from "react";

const MapWrapper = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.addresses);

  console.log(addresses);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCfDK9vibIF7-ZJBoD-VlWxOqu8RK3KYg",
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: MapLibraries,
  });

  const clickHandler = useCallback((event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const id = uuidV4();
    const address: IAddress = {
      id: id,
      address: "address_" + id,
      lat: lat,
      lng: lng,
    };
    dispatch(addAddress(address));
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map : any) => {
    mapRef.current = map;
  }, []);

  /*const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new window.google.maps.Map(mapRef.current, {}));
    }
  }, [mapRef, map, addresses]);*/


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
        onClick={clickHandler}
        onLoad={onMapLoad}
      >
        {addresses.map((address) => (
          <Marker
            key={uuidV4()}
            title={address.address}
            position={{ lat: address.lat, lng: address.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapWrapper;
