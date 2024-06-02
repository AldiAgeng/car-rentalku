import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import useUserInfoStore from "../../stores/UserInfoStore";

function HeaderBar() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigate('/login');
    }
  }, []);

  const redicrectToHome = () => {
    navigate('/');
  }

  const logout = () => {
    axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/logout`,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    }).then(() => {
      useUserInfoStore.setState({ name: '' });
      Cookies.remove('token');
      navigate('/login');
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Navbar.Brand>Car Rental</Navbar.Brand>
      <Navbar.Collapse>
        <NavDropdown title={useUserInfoStore.getState().name} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={redicrectToHome}>Home</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logout}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderBar;