import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import IAddress from "../types/IAddress";

const DUMMY_ADDRESSES: IAddress[] = [];

const Home = () => {
  const [addresses, setAddresses] = useState(DUMMY_ADDRESSES);
  const hasAddresses = addresses.length > 0;

  return (
    <section>
      <h2 className="text-center">React Distance Calculator App</h2>
      <Card>
        <Card.Header>Your Addresses</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              {!hasAddresses && (
                <p>
                  You don't have any addresse choosen. Please click{" "}
                  <Link to="/form">here</Link> to register.
                </p>
              )}
              {addresses.map((address: IAddress) => (
                <p>
                  `${address.id}: ${address.address}`
                </p>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Home;
