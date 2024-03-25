import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="light" variant="light">
      <Container>
        <div className="d-lg-flex align-items-center">
          {window.innerWidth < 992 ? <div className="d-none d-sm-flex flex-column mt-3 mt-sm-0">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/amigos">Amigos</Link>
            <Link to="/gastos">Gastos</Link>
            <Link to="/grupos">Grupos</Link>
          </Nav>
        </div> : (
            <>
              <Navbar.Brand href="#home" className="me-lg-4">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Link to="/amigos">Amigos</Link>
                <Link to="/gastos">Gastos</Link>
                <Link to="/grupos">Grupos</Link>
              </Nav>
            </>
          )}
        </div>
      </Container>
    </Navbar>
    </>
  );
}

export default ColorSchemesExample;