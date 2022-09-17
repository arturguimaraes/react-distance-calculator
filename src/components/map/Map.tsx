import { Fragment, useCallback, useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import IAddress from "../../types/IAddress";
import MapHelper from "../../helpers/MapHelper";
import { v4 as uuidV4 } from "uuid";
import Search from "./Search";
import Markers from "./Markers";
import classes from "./Map.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addAddress } from "../../store/addressSlice";
import Locate from "./Locate";

const Map = () => {
  //DISPATCH REDUX ACTION
  const dispatch = useAppDispatch();

  //LOAD ADDRESSESS
  const addressState = useAppSelector((state) => state.address);

  //MAP LOAD
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapLoadHandler = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  //MAP UNMOUNT
  const mapUnmountHandler = useCallback(() => {
    setMap(null);
  }, []);

  //MAP PAN TO
  const mapPanToAddressHandler = useCallback(
    (address: IAddress) => {
      if (map) MapHelper.mapPanToAddress(map, address);
    },
    [map]
  );

  //SETS MAP CENTER
  const [mapCenter, setMapCenter] = useState(MapHelper.center);
  useEffect(() => {
    const addresses = addressState.addresses;
    if (addresses.length > 0) {
      const lastAddress = addresses[addressState.selected];
      setMapCenter({ lat: lastAddress.lat, lng: lastAddress.lng });
      mapPanToAddressHandler(lastAddress);
    }
  }, [addressState, mapPanToAddressHandler]);

  //MAP CLICK
  const mapClickHandler = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const id = uuidV4();
        const address: IAddress = {
          id: id,
          address: id,
          clicked: true,
          lat: event.latLng?.lat(),
          lng: event.latLng?.lng(),
        };
        //Adds address to addresses list
        dispatch(addAddress(address));
        //Center in click
        mapPanToAddressHandler(address);
      }
    },
    [dispatch, mapPanToAddressHandler]
  );

  return (
    <Fragment>
      <h1 className={classes.mapTitle}>
        Distance Calculator
        <span role="img" aria-label="map">
          🗺️
        </span>
      </h1>
      <GoogleMap
        mapContainerStyle={MapHelper.mapContainerStyle}
        zoom={MapHelper.initialMapZoomLevel}
        center={mapCenter}
        options={MapHelper.options}
        onLoad={mapLoadHandler}
        onUnmount={mapUnmountHandler}
        onClick={mapClickHandler}
      >
        <Search onSelectPlace={mapPanToAddressHandler} />
        <Locate onLocate={mapPanToAddressHandler} />
        <Markers />
      </GoogleMap>
    </Fragment>
  );
};

export default Map;
