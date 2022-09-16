import { Button } from "react-bootstrap";
import { removeAddress } from "../../store/addressSlice";
import { useAppDispatch } from "../../store/hooks";
import IAddress from "../../types/IAddress";
import { getLetter } from "../map/Helper";

interface Props {
  address: IAddress;
  mapShown: boolean;
  index: number;
}

const Address = (props: Props) => {
  const dispatch = useAppDispatch();

  const address = props.address;
  const addressString = address.clicked
    ? `Addres ${props.index + 1} (clicked)`
    : address.address;

  const deleteAddressHandler = (id: string) => {
    dispatch(removeAddress(id));
  };

  return (
    <tr>
      <td className="text-center">
        <Button variant="danger" size="sm">
          {getLetter(props.index)}
        </Button>
      </td>
      <td>{addressString}</td>
      {!props.mapShown && (
        <>
          <td>{address.lat}</td>
          <td>{address.lng}</td>
        </>
      )}
      <td className="text-center">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={deleteAddressHandler.bind(null, address.id)}
        >
          x
        </Button>
      </td>
    </tr>
  );
};

export default Address;
