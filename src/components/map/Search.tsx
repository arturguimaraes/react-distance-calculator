import { Autocomplete } from "@react-google-maps/api";
import { useCallback, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { addAddress } from "../../store/addressSlice";
import { useAppDispatch } from "../../store/hooks";
import IAddress from "../../types/IAddress";
import classes from "./Search.module.scss";

interface Props {
  onSelectPlace: (address: IAddress) => void;
  onShowAlert: (style: string, text: string) => void;
}

const Search = (props: Props) => {
  //DISPATCH REDUX ACTION
  const dispatch = useAppDispatch();

  //SEARCH BOX - AUTO COMPLETE
  const searchBoxRef = useRef<any>(null);
  const loadHandler = useCallback((autocomplete: any) => {
    searchBoxRef.current = autocomplete;
  }, []);

  //GETS PROPS
  const { onSelectPlace, onShowAlert } = props;

  //ON AUTOCOMPLETE CHANGE
  const placeChangedHandler = useCallback(() => {
    try {
      const place = searchBoxRef.current.getPlace();
      const address: IAddress = {
        id: uuidV4(),
        address: place.name,
        clicked: false,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      //Adds address to addresses list
      dispatch(addAddress(address));
      //Center in click
      onSelectPlace(address);
      //Show success
      onShowAlert("success", `${address.address} was added successfully.`);
    } catch (error: any) {
      //Show error
      console.log("Error loading auto complete place:", error);
      onShowAlert("danger", "Error loading address. Please try again.");
    }
  }, [dispatch, onSelectPlace, onShowAlert]);

  return (
    <Autocomplete onLoad={loadHandler} onPlaceChanged={placeChangedHandler}>
      <input
        id="searchBox"
        className={classes.search}
        type="text"
        placeholder="Search your address here"
      />
    </Autocomplete>
  );
};

export default Search;
