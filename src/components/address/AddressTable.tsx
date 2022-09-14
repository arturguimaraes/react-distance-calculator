import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeAddress } from "../../store/addressSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import IAddress from "../../types/IAddress";
import { getLetter } from "../map/MapHelper";

interface Props {
  latLng?: boolean;
}

const AddressTable = (props: Props) => {
  const dispatch = useAppDispatch();
  const addressState = useAppSelector((state) => state.address);
  const addresses = addressState.addresses;
  const hasAddresses = addressState.count > 0;
  const latLng = props.latLng === undefined ? true : props.latLng;

  const deleteAddressHandler = (id: string) => {
    dispatch(removeAddress(id));
  };

  return (
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th>Address</th>
          {latLng && (
            <>
              <th>Latitude</th>
              <th>Longitude</th>
            </>
          )}
          <th className="text-center">Remove</th>
        </tr>
      </thead>
      <tbody>
        {!hasAddresses && (
          <tr>
            <td colSpan={4} className="text-center">
              You don't have any addresse choosen. Please click{" "}
              <Link to="/form">here</Link> to choose at least 3.
            </td>
          </tr>
        )}
        {addresses.map((address: IAddress, index: number) => {
          const addressString = address.clicked
            ? `Addres ${index + 1} (clicked)`
            : address.address;
          return (
            <tr key={address.id}>
              <td className="text-center">
                <Button variant="danger" size="sm">
                  {getLetter(index)}
                </Button>
              </td>
              <td>{addressString}</td>
              {latLng && (
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
        })}
      </tbody>
    </Table>
  );
};

export default AddressTable;
