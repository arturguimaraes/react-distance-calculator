import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import MapHelper, { MapLibraries } from "./MapHelper";
import { v4 as uuidV4 } from "uuid";
import classes from "./MapWrapper.module.scss";
import IAddress from "../../types/IAddress";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addAddress } from "../../store/addressSlice";

const MapWrapper = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCfDK9vibIF7-ZJBoD-VlWxOqu8RK3KYg",
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: MapLibraries,
  });

  //const [addresses, setAddresses] = useState<IAddress[]>([]);
  //const [markers, setMarkers] = useState([]);

  const dispatch = useAppDispatch();
  const addressState = useAppSelector((state) => state.address);
  const addresses = addressState.addresses;

  useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  const clickHandler = (event: any) => {
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
    //setAddresses((current) => [...current, address]);
  };

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
      ></GoogleMap>
    </div>
  );
};

export default MapWrapper;
