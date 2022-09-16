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
    navigator.geolocation.getCurrentPosition(
      //Success
      (position) => {
        const id = uuidV4();
        const address: IAddress = {
          id: id,
          address: id,
          clicked: true,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        //Adds address to addresses list
        dispatch(addAddress(address));
        //Center in click
        onLocate(address);
      },
      //Error
      () => console.log("Error atrieving browser's geolocation")
    );
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
