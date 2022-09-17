import { Fragment } from "react";
import MainNavigation from "../components/layout/MainNavigation";
import Home from "./Home";
import Form from "./Form";
import Results from "./Results";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Fragment>
      <MainNavigation />
      <main className="my-5">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/result" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </Fragment>
  );
};

export default App;
