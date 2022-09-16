import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="row mt-5">
      <div className="mt-5 offset-sm-5 col-sm-2">
        <Spinner animation="border" />
      </div>
    </div>
  );
};

export default Loader;
