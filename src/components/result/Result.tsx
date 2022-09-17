import { Fragment, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Loader from "../ui/Loader";
import { Loader as GoogleMapsLoader } from "@googlemaps/js-api-loader";
import MapHelper from "../../helpers/MapHelper";
import { Alert } from "react-bootstrap";
import IDistance from "../../types/IDistance";
import ResultTable from "./ResultTable";
import ResultHelper from "../../helpers/ResultHelper";

const Result = () => {
  //GETS ADDRESS STATE
  const addressState = useAppSelector((state) => state.address);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [distances, setDistances] = useState<IDistance[]>([]);
  const [errorCalculating, setErrorCalculating] = useState(false);

  //ONLY LOADS ONCE
  useEffect(() => {
    //Restart all values
    setIsLoading(true);
    setIsCalculating(true);
    setErrorLoading(false);
    setDistances([]);
    setErrorCalculating(false);

    //Loads Google Maps API
    const loader = new GoogleMapsLoader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: MapHelper.libraries,
    });

    //Callback
    loader.loadCallback((e) => {
      //CALLBACK ERROR
      if (e) {
        console.log("Error loading google maps service:", e);
        setIsLoading(false);
        setErrorLoading(true);
      }
      //SUCCESS, PROCEED
      else {
        setTimeout(() => {
          setIsLoading(false);
          setErrorLoading(false);
          getDistancesCombinations();
        }, 3000);
      }
    });
  }, [addressState]);

  //GET DISTANCE FOR EACH PAIR
  const getDistances = useCallback(() => {
    //Loads google map DistanceMatrixService
    const service = new google.maps.DistanceMatrixService();
    //For each distance
    distances.forEach((distance, index) => {
      if (index === distances.length - 1) {
        console.log("stopped loading");
        setIsCalculating(false);
        return;
      }
      const origin = ResultHelper.getLatLng(distance.origin);
      const destination = ResultHelper.getLatLng(distance.destination);
      service
        .getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.WALKING,
        })
        .then((result: any) => {
          try {
            if (
              result &&
              result.rows &&
              result.rows.length > 0 &&
              result.rows[0].elements &&
              result.rows[0].elements.length > 0
            ) {
              //Value of distance
              const value = result.rows[0].elements[0].distance.value;
              //Updates distances
              const newDistances = [...distances];
              newDistances.find((newDistance) => {
                if(newDistance.origin === distance.origin && newDistance.destination === distance.destination)
                  newDistance.distance = value;
              })
              //setDistances(newDistances);
              //Updates array
              console.log("Success", distance);
            }
          } catch (error) {
            console.log("Error calculating distance:", error, distance);
            setErrorCalculating(true);
          }
        })
        .catch((error) => {
          console.log("Error calculating distance:", error, distance);
          setErrorCalculating(true);
        });
    });
  }, []);

  //DEFINE THE ARRAY OF DISTANCES
  const getDistancesCombinations = useCallback(() => {
    //Rename address clicked
    const renamedAddresses = ResultHelper.renameAddresses(
      addressState.addresses
    );
    //Iterate all to put in array
    const distances = ResultHelper.getAllCombinations(renamedAddresses);
    //Distances without calculation
    setDistances(distances);
    //Calculates distances
    getDistances();
  }, [addressState, getDistances]);

  //USER SIMULATE WAITING
  if (isLoading || isCalculating) {
    return (
      <Fragment>
        <Loader>Calculating results...</Loader>
      </Fragment>
    );
  }

  //ERROR LOADING API
  if (!errorLoading) {
    <Alert variant="danger" className="text-center">
      Error loading Google Maps API.
    </Alert>;
  }

  //ERROR CALCULATING
  if (!errorCalculating) {
    <Alert variant="danger" className="text-center">
      Error calculating values. Try to refresh the page.
    </Alert>;
  }

  return <ResultTable distances={distances} />;
};

export default Result;
