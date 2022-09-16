import React, { useCallback, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import IAddress from "../../types/IAddress";
import { MapHelper } from "./Helper";
import { v4 as uuidV4 } from "uuid";
import Search from "./Search";
import Markers from "./Markers";
import classes from "./Map.module.scss";
import { useAppDispatch } from "../../store/hooks";
import { addAddress } from "../../store/addressSlice";
import Locate from "./Locate";

const Map = () => {
  //DISPATCH REDUX ACTION
  const dispatch = useAppDispatch();

  //LOAD ADDRESSESS
  //const addresses = useAppSelector((state) => state.address.addresses);

  //MAP
  const mapRef = useRef<google.maps.Map>();
  const mapLoadHandler = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  //MAP PAN TO LAT AND LNG
  const mapPanToHandler = useCallback((address: IAddress) => {
    if (mapRef.current) {
      //Set center
      mapRef.current.panTo({ lat: address.lat, lng: address.lng });
      //Set zoom
      mapRef.current.setZoom(MapHelper.onChooseZoomLevel);
    }
  }, []);

  //MAP PAN TO LAT AND LNG
  /*const mapPanToAddress = useCallback((lat: number, lng: number)  => {
    mapPanTo(address.lat, address.lng);
  }, [mapPanTo]);  */

  //MAP CLICK HANDLER
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
        mapPanToHandler(address);
      }
    },
    [dispatch, mapPanToHandler]
  );

  return (
    <React.Fragment>
      <h1 className={classes.mapTitle}>
        Distance Calculator
        <span role="img" aria-label="map">
          🗺️
        </span>
      </h1>
      <GoogleMap
        mapContainerStyle={MapHelper.mapContainerStyle}
        zoom={MapHelper.initialMapZoomLevel}
        center={MapHelper.center}
        options={MapHelper.options}
        onClick={mapClickHandler}
        onLoad={mapLoadHandler}
      >
        <Search onSelectPlace={mapPanToHandler} />
        <Locate onLocate={mapPanToHandler} />
        <Markers />
      </GoogleMap>
    </React.Fragment>
  );
};

export default Map;
