import { Fragment } from "react";
import MainNavigation from "../components/layout/MainNavigation";
import Home from "./Home";
import Form from "./Form";
import Result from "./Result";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Fragment>
      <MainNavigation />
      <main className="mt-5">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </Fragment>
  );
};

export default App;
