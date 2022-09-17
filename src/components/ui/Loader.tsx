import { Spinner } from "react-bootstrap";

interface Props {
  children?: any;
}

const Loader = (props: Props) => {
  return (
    <div className="row my-5 text-center">
      <div className="col-md-12">{props.children}</div>
      <div className="mt-4 offset-sm-5 col-sm-2">
        <Spinner animation="border" />
      </div>
    </div>
  );
};

export default Loader;
