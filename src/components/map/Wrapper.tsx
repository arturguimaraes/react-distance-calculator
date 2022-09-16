import { useLoadScript } from "@react-google-maps/api";
import Loader from "../ui/Loader";
import { MapLibraries } from "./Helper";
import Map from "./Map";

const Wrapper = () => {
  //RENDERS MAP
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCfDK9vibIF7-ZJBoD-VlWxOqu8RK3KYg",
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: MapLibraries,
  });

  //MAP NOT LOADED
  if (!isLoaded) return <Loader />;

  //MAP ERROR
  if (loadError) return <p>Error loading maps</p>;

  //MAP LOAD
  return <Map />;
};

export default Wrapper;
