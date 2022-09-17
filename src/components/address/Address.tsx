import { useCallback } from "react";
import { Button } from "react-bootstrap";
import TextHelper from "../../helpers/TextHelper";
import { removeAddress, setSelectedAddress } from "../../store/addressSlice";
import { useAppDispatch } from "../../store/hooks";
import IAddress from "../../types/IAddress";
import classes from "./Address.module.scss";

interface Props {
  address: IAddress;
  mapPage: boolean;
  index: number;
}

const Address = (props: Props) => {
  //DISPATCH
  const dispatch = useAppDispatch();

  //GETS ADDRESS VIA PROPS AND PROPERTIES
  const address = props.address;
  const addressString = address.clicked
    ? `Address ${TextHelper.getLetter(props.index)} (clicked)`
    : address.address;
  const index = props.index;

  //SELECT ADDRESS
  const selectAddressHandler = useCallback(
    (index: number) => {
      dispatch(setSelectedAddress(index));
    },
    [dispatch]
  );

  //DELETE ADDRESS
  const deleteAddressHandler = useCallback(
    (id: string) => {
      dispatch(removeAddress(id));
    },
    [dispatch]
  );

  return (
    <tr>
      <td className="text-center">
        <Button className={classes.button} variant="success" size="sm">
          {TextHelper.getLetter(props.index)}
        </Button>
      </td>
      <td>{addressString}</td>
      {!props.mapPage && (
        <>
          <td>{address.lat}</td>
          <td>{address.lng}</td>
        </>
      )}
      {props.mapPage && (
        <td className="text-center">
          <Button
            className={classes.button}
            variant="primary"
            size="sm"
            onClick={selectAddressHandler.bind(null, index)}
          >
            <span role="img" aria-label="view">
              👁️
            </span>
          </Button>
        </td>
      )}
      <td className="text-center">
        <Button
          className={classes.button}
          variant="danger"
          size="sm"
          onClick={deleteAddressHandler.bind(null, address.id)}
        >
          X
        </Button>
      </td>
    </tr>
  );
};

export default Address;
