import { Table } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import Addresses from "./Addresses";
import Empty from "./Empty";
import Header from "./Header";

interface Props {
  mapShown: boolean;
}

const AddressTable = (props: Props) => {
  const addressState = useAppSelector((state) => state.address);
  const hasAddresses = addressState.count > 0;

  return (
    <Table striped bordered hover responsive size="sm">
      <Header mapShown={props.mapShown} />
      <tbody>
        {!hasAddresses && <Empty />}
        <Addresses mapShown={props.mapShown} />
      </tbody>
    </Table>
  );
};

export default AddressTable;
