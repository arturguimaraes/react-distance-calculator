import { Card } from "react-bootstrap";
import AddressTable from "../components/address/AddressTable";
import Result from "../components/result/Result";
import { useAppSelector } from "../store/hooks";

const Results = () => {
  const addressState = useAppSelector((state) => state.address);
  const hasMinimumAddresses = addressState.count >= 3;

  return (
    <section>
      <h2 className="text-center">Results</h2>
      <Card>
        <Card.Header>Your Addresses</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              <AddressTable resultPage={true} />
            </div>
          </div>
        </Card.Body>
      </Card>
      {hasMinimumAddresses && (
        <Card className="mt-5">
          <Card.Header>Results</Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-md-12">
                <Result />
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </section>
  );
};

export default Results;
