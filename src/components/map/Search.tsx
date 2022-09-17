import { Autocomplete } from "@react-google-maps/api";
import { useCallback, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { addAddress } from "../../store/addressSlice";
import { useAppDispatch } from "../../store/hooks";
import IAddress from "../../types/IAddress";

interface Props {
  onSelectPlace: (address: IAddress) => void;
}

const Search = (props: Props) => {
  //DISPATCH REDUX ACTION
  const dispatch = useAppDispatch();

  //SEARCH BOX - AUTO COMPLETE
  const searchBoxRef = useRef<any>(null);
  const loadHandler = useCallback((autocomplete: any) => {
    searchBoxRef.current = autocomplete;
  }, []);

  //GETS ON SELECT PLACE
  const { onSelectPlace } = props;

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
      
      searchBoxRef.current.setValues(null);
    } catch (error) {
      console.log("Error loading auto complete place:", error);
    }
  }, [dispatch, onSelectPlace]);

  return (
    <Autocomplete onLoad={loadHandler} onPlaceChanged={placeChangedHandler}>
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
          top: "1rem",
          right: "4rem",
          marginLeft: "-120px",
        }}
      />
    </Autocomplete>
  );
};

export default Search;
