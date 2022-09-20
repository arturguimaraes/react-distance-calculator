import { useCallback } from "react";
import IAddress from "../../types/IAddress";
import { v4 as uuidV4 } from "uuid";
import classes from "./Locate.module.scss";
import { useAppDispatch } from "../../store/hooks";
import { addAddress } from "../../store/addressSlice";

interface Props {
  onLocate: (address: IAddress) => void;
  onShowAlert: (style: string, text: string) => void;
}

const Locate = (props: Props) => {
  //DISPATCH REDUX ACTION
  const dispatch = useAppDispatch();

  //GETS PROPS
  const { onLocate, onShowAlert } = props;

  //ON CLICK LOCATE
  const clickHandler = useCallback(() => {
    //Success
    const successHandler = (position: GeolocationPosition) => {
      const id = uuidV4();
      const address: IAddress = {
        id: id,
        address: "Browser's location",
        clicked: false,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      //Adds address to addresses list
      dispatch(addAddress(address));
      //Center in click
      onLocate(address);
      //Show success
      onShowAlert("success", `${address.address} was added successfully.`);
    };
    //Error
    const errorHandler = (error: GeolocationPositionError) => {
      console.log("Error atrieving browser's geolocation:", error);
      onShowAlert(
        "danger",
        "Error atrieving browser's geolocation. Please try again."
      );
    };
    //Geolocation options
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    //Get geolocation
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );
  }, [dispatch, onLocate, onShowAlert]);

  return (
    <button className={classes.locate} onClick={clickHandler}>
      <span role="img" aria-label="compass">
        🧭
      </span>
    </button>
  );
};

export default Locate;
