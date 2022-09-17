import { Card } from "react-bootstrap";
import AddressTable from "../components/address/AddressTable";
import Result from "../components/result/Result";
import { useAppSelector } from "../store/hooks";
import classes from "./Results.module.scss";

const Results = () => {
  const addressState = useAppSelector((state) => state.address);
  const hasMinimumAddresses = addressState.count >= 3;

  return (
    <section>
      <h2 className="text-center">Results</h2>
      <Card>
        <Card.Header>
          <b>Your Addresses</b>
        </Card.Header>
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
          <Card.Header>
            <b>Results</b>{" "}
            <span className={classes.legend}>
              (In order from closest to farthest by walking distance, being{" "}
              <span className={classes.green}>green</span> closest, and{" "}
              <span className={classes.red}>red</span> farthest)
            </span>
            <span className={classes.legend}>
              (Font: DistanceMatrixService from Google Maps API)
            </span>
          </Card.Header>
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
