import { useCallback } from "react";
import IAddress from "../../types/IAddress";
import { v4 as uuidV4 } from "uuid";
import classes from "./Locate.module.scss";
import { useAppDispatch } from "../../store/hooks";
import { addAddress } from "../../store/addressSlice";

interface Props {
  onLocate: (address: IAddress) => void;
}

const Locate = (props: Props) => {
  //DISPATCH REDUX ACTION
  const dispatch = useAppDispatch();

  const { onLocate } = props;

  //ON CLICK LOCATE
  const clickHandler = useCallback(() => {
    //Success
    const success = (position: GeolocationPosition) => {
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
    };

    //Error
    const error = (error: GeolocationPositionError) => {
      console.log("Error atrieving browser's geolocation:", error);
    };

    //Geolocation options
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    //Get geolocation
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch, onLocate]);

  return (
    <button className={classes.locate} onClick={clickHandler}>
      <span role="img" aria-label="compass">
        🧭
      </span>
    </button>
  );
};

export default Locate;
