import { useLoadScript } from "@react-google-maps/api";
import React, { ReactElement, Fragment, useState } from "react";
import { Alert } from "react-bootstrap";
import MapHelper from "../../helpers/MapHelper";
import Loader from "../ui/Loader";
import Map from "./Map";

const Wrapper = () => {
  //RENDERS MAP
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: MapHelper.libraries,
  });

  //ALERT
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<ReactElement | null>(null);

  //ALERT HANDLER
  const showAlertHandler = (style: string, text: string) => {
    setShowAlert(true);
    setAlert(
      <Alert
        variant={style}
        className="text-center"
        onClose={hideAlertHandler}
        dismissible
      >
        <span>{text}</span>
      </Alert>
    );
    //Hide after 'alterTime' seconds.
    setTimeout(() => {
      hideAlertHandler();
    }, MapHelper.alertShowSeconds * 1000);
  };

  //ALERT HIDE HANDLER
  const hideAlertHandler = () => {
    setShowAlert(false);
    setAlert(null);
  };

  //MAP ERROR
  if (loadError) return <p>Error loading maps</p>;

  //MAP NOT READY
  if (!isLoaded) return <Loader>Loading map...</Loader>;

  //MAP LOAD
  return (
    <Fragment>
      {showAlert && alert}
      <Map onShowAlert={showAlertHandler} />
    </Fragment>
  );
};

export default React.memo(Wrapper);
