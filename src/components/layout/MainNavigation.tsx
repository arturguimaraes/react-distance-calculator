import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          React Distance Calculator
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/form" className="nav-link">
              Form
            </Link>
            <Link to="/result" className="nav-link">
              Result
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
