import React from "react";
import MainNavigation from "../components/layout/MainNavigation";
import Home from "./Home";
import Form from "./Form";
import Result from "./Result";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main className="mt-5">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<p>Not found.</p>} />
          </Routes>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default App;
