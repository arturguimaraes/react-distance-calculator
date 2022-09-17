import { Fragment } from "react";
import { Table } from "react-bootstrap";
import IDistance from "../../types/IDistance";
import Header from "./Header";
import Item from "./Item";
import classes from "./ResultTable.module.scss";

interface Props {
  distances: IDistance[];
}

const ResultTable = (props: Props) => {
  //Order from closest to farthest
  props.distances.sort((a, b) => {
    if (a.distance < b.distance) return -1;
    return 1;
  });
  
  return (
    <Fragment>
      <div className={classes.tableContainer}>
        <Table striped bordered hover responsive size="sm">
          <Header />
          <tbody>
            {props.distances.map((distance, index) => {
              return (
                <Item
                  key={`${distance.origin.address}-${distance.destination.address}`}
                  index={index}
                  distance={distance}
                  lastIndex={props.distances.length - 1}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

export default ResultTable;
