import { Fragment, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Loader from "../ui/Loader";
import { GoogleMap } from "@react-google-maps/api";

const Result = () => {
  const addressState = useAppSelector((state) => state.address);

  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    setTimeout(() => {
      setIsLoaded(true);
    }, 4000);
    return (
      <Fragment>
        <Loader>Calculating results...</Loader>
      </Fragment>
    );
  }

  return <p>results here</p>;
};

export default Result;
