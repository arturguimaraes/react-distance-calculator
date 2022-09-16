import { Card } from "react-bootstrap";
import AddressTable from "../components/address/AddressTable";

const Result = () => {
  return (
    <section>
      <h2 className="text-center">Results</h2>
      <Card>
        <Card.Header>Results</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              <AddressTable mapShown={false} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Result;
