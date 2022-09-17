import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import MapHelper from "../../helpers/MapHelper";
import Loader from "../ui/Loader";
import Map from "./Map";

const Wrapper = () => {
  //RENDERS MAP
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: MapHelper.libraries,
  });

  //MAP ERROR
  if (loadError) return <p>Error loading maps</p>;

  //MAP NOT READY
  if (!isLoaded) return <Loader>Loading map...</Loader>;

  //MAP LOAD
  return <Map />;
};

export default React.memo(Wrapper);
