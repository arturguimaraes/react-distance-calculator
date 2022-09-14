import {
  Autocomplete,
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import IAddress from "../../types/IAddress";
import { MapHelper, MapLibraries, MarkerHelper } from "./MapHelper";
import { v4 as uuidV4 } from "uuid";
import classes from "./Map.module.scss";
import { useCallback, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

interface Props {
  addresses: IAddress[];
  onAddAddress: (event: any) => void;
}

const Map = (props: Props) => {
  //RENDERS MAP
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCfDK9vibIF7-ZJBoD-VlWxOqu8RK3KYg",
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: MapLibraries,
  });
  const [selected, setSeleted] = useState<IAddress | null>(null);

  //MAP CLICK HANDLER
  const { onAddAddress } = props;
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
        onAddAddress(address);
      }
    },
    [onAddAddress]
  );

  //MAP
  const mapRef = useRef<google.maps.Map>();
  const mapLoadHandler = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  //SEARCH BOX - AUTO COMPLETE
  const autoCompleteRef = useRef<any>(null);
  const loadAutoCompleteHandler = useCallback((autocomplete: any) => {
    autoCompleteRef.current = autocomplete;
  }, []);

  //ON CHANGE
  const placeChangedHandler = useCallback(() => {
    if (autoCompleteRef.current) {
      const place = autoCompleteRef.current.getPlace();
      const address: IAddress = {
        id: uuidV4(),
        address: place.name,
        clicked: false,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      onAddAddress(address);
    }
  }, [onAddAddress]);

  if (!isLoaded) {
    return (
      <div className="row mt-5">
        <div className="mt-5 offset-sm-5 col-sm-2">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  if (loadError) return <p>Error loading maps</p>;

  return (
    <>
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
        <Autocomplete
          onLoad={loadAutoCompleteHandler}
          onPlaceChanged={placeChangedHandler}
        >
          <input
            type="text"
            placeholder="Search your address here"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              top: "5px",
              right: "5px",
              marginLeft: "-120px",
            }}
          />
        </Autocomplete>
        {props.addresses.map((address, index) => (
          <Marker
            key={uuidV4()}
            title={address.address}
            position={{ lat: address.lat, lng: address.lng }}
            icon={{
              url: MarkerHelper.getIcon(index),
              scaledSize: MarkerHelper.getSize(),
              origin: MarkerHelper.getOrigin(),
              anchor: MarkerHelper.getAnchor(),
            }}
            onClick={(event) => {
              event.domEvent.preventDefault();
              setSeleted(address);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSeleted(null);
            }}
          >
            <>
              <h5>New Position</h5>
              <p>{selected.address}</p>
            </>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};

export default Map;
