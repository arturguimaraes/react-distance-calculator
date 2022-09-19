import { Fragment, useEffect, useState } from "react";
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
    setErrorCalculating(false);
    //Loads Google Maps API
    const loader = new GoogleMapsLoader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: MapHelper.libraries,
    });
    //Success handler function
    const successHandler = () => {
      console.log("Success loading google maps service.");
      //Mock loading for too fast occurrencies
      setTimeout(() => {
        //Stop Loading
        setIsLoading(false);
        //Set error FALSE
        setErrorLoading(false);
        //Distances without calculation
        const distancesWithNoCalculation =
          ResultHelper.getDistancesCombinations(addressState.addresses);
        //Updates previous state
        //setDistancesPreviousState(distances);
        //Updates distanceState
        setDistances(distancesWithNoCalculation);
        //Calculates distances
        calculateDistances(distancesWithNoCalculation);
      }, ResultHelper.useLoadingTime);
    };
    //Error loading function
    const errorHandler = (error: any) => {
      console.log("Error loading google maps service:", error);
      //Stop Loading
      setIsLoading(false);
      //Set error TRUE
      setErrorLoading(true);
    };
    //Callback
    loader.loadCallback((e) => {
      //CALLBACK ERROR
      if (e) errorHandler(e);
      //SUCCESS, PROCEED
      else successHandler();
    });
  }, [addressState]);

  //GET DISTANCE FOR EACH PAIR
  const calculateDistances = (distances: IDistance[]) => {
    //If distances not loaded yet
    if (distances.length === 0) {
      console.log(
        `Distances array not loaded yet (${distances.length} distances). Not calculating.`
      );
      return;
    }
    /*//If removing address or same lenght, doesn't need to calculate again
    const calculate = distancesPreviousState.length <= distances.length;
    //Compare state with previous state
    console.log(`Comparing previous state (${distancesPreviousState.length} distances) with current state (${distances.length}  distances). Recalculate: ${calculate ? "YES" : "NO"}`);
    if (!calculate) {
      setIsCalculating(false);
      return;
    }*/
    //Calculates distances
    console.log(
      `Calculating ${distances.length} distances using DistanceMatrixService from Google Maps API.`,
      distances
    );
    //For each distance
    distances.forEach((distance, index) => {
      //Gets origin and destination latLng Object
      const origin = ResultHelper.getLatLng(distance.origin);
      const destination = ResultHelper.getLatLng(distance.destination);
      //Loads google map DistanceMatrixService
      const service = new google.maps.DistanceMatrixService();
      service
        .getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.WALKING,
        })
        .then((result: any) => {
          //console.log("Success calculating distance:", index, distance);
          try {
            if (
              result &&
              result.rows &&
              result.rows.length > 0 &&
              result.rows[0].elements &&
              result.rows[0].elements.length > 0
            ) {
              //Value of distance
              const value = result.rows[0].elements[0].distance.value / 1000;
              //Updates distances
              const newDistances = [...distances];
              newDistances.forEach((newDistance) => {
                if (
                  newDistance.origin === distance.origin &&
                  newDistance.destination === distance.destination
                )
                  newDistance.distance = value;
              });
              //Updates array
              setDistances(newDistances);
            }
          } catch (error) {
            console.log("Error calculating distance:", error, index, distance);
            setErrorCalculating(true);
          }
        })
        .catch((error) => {
          console.log("Error calculating distance:", error, distance);
          setErrorCalculating(true);
        });
      //Stops loading add final
      if (index === distances.length - 1) {
        console.log("Finished Calculation");
        setIsCalculating(false);
        return;
      }
    });
    // let index = 0;
    // for (const distance of distances) {}
  };

  //GET DISTANCE FOR PAIR OF ADDRESSES
  //const calculateDistance = (index: number, distance: IDistance) => {};

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
