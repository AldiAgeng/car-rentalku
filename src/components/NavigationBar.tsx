
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, Offcanvas, NavDropdown } from "react-bootstrap";
import useUserInfoStore from "../stores/UserInfoStore";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export default function NavigationBar() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  const whoami = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setRole(response.data.data.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const logout = () => {
    axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/logout`,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    }).then(() => {
      Swal.fire({
        text: 'Logout Success',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      useUserInfoStore.setState({ name: '' })
      Cookies.remove('token')
      navigate('/login')
    });
  };

  useEffect(() => {
    whoami();
  }, []);

  return (
    <div>
      {["md"].map((expand) => (
        <Navbar key={expand} fixed="top" variant="light" expand={expand} className="mb-3">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand href="#">Car Rental</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
              <Offcanvas.Header closeButton>
                <LinkContainer to="/">
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Car Rental</Offcanvas.Title>
                </LinkContainer>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <LinkContainer to="/cars">
                    <Nav.Link>Cars</Nav.Link>
                  </LinkContainer>
                  <Nav.Link href="#services">Our Services</Nav.Link>
                  <Nav.Link href="#why-us">Why Us</Nav.Link>
                  <Nav.Link href="#testi">Testimonial</Nav.Link>
                  <Nav.Link href="#faq">FAQ</Nav.Link>
                  <Nav>
                    { useUserInfoStore.getState().name != "" ? (
                      <NavDropdown title={useUserInfoStore.getState().name} id="basic-nav-dropdown">
                        <LinkContainer to={role == "admin" ? "/dashboard-admin" : "/dashboard-member"}>
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                          Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                    ) : 
                    <LinkContainer to="/login">
                      <Button className="mr-2 btn-light-green">Login</Button>
                    </LinkContainer>
                    }
                  </Nav>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}
