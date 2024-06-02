import { Button, Col, Row, Card, Container } from "react-bootstrap";
import { CardCarsDashboard } from "../components"
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import useUserInfoStore from "../stores/UserInfoStore";

function DashboardAdmin() {
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  const [formData, setFormData] = useState({
    merk: "",
    model: "",
    number_plate: "",
    price_per_day: 0,
    image: null as File | null,
  });

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const listCars = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cars`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((response) => {
      setCars(response.data.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "image" && files) {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    const form = new FormData();
    (Object.keys(formData) as (keyof typeof formData)[]).forEach(key => {
      const value = formData[key];
      if (value !== null) {
        if (typeof value === 'number') {
          form.append(key, value.toString());
        } else {
          form.append(key, value);
        }
      }
    });

    axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cars`, form, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      listCars();
      handleClose();
    }).catch((error) => {
      if (error.response.status == 400) {
        error.response.data.data.forEach((err: any) => {
          console.log(err);
          toast.error(err);
        })
      }
    })
  }

  const handleLogout = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/logout`, {}, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then(() => {
      useUserInfoStore.setState({ name: '' })
      Cookies.remove("token");
      navigate("/login");
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    listCars();
  }, [])

  return (
    <Container fluid>
    <Row className="vh-100">
      <Col md={3} className="bg-light">
        <Card className="h-100">
          <Card.Header>Menu Admin</Card.Header>
          <Card.Body>
            <Button variant="primary" className="w-100 mb-2">Dashboard</Button>
            <Button variant="secondary" className="w-100 mb-2" onClick={() => navigate('/cars')}>Home</Button>
            <Button variant="secondary" className="w-100 mb-2" onClick={handleLogout}>Logout</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={9}>
      <div className="container-fluid">
      <ToastContainer />
      {/* <HeaderBar/> */}
      {/* <Row> */}
        <Col className="d-flex mt-3">
          <Button variant="primary" onClick={handleShow}>
          + Add Car
          </Button>
        </Col>
      {/* </Row> */}
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cars</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Merk</Form.Label>
                <Form.Control
                  value={formData.merk} 
                  name="merk"
                  onChange={handleChange}
                  type="text"
                  placeholder="Honda"
                  autoFocus
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    value={formData.model}
                    name="model"
                    onChange={handleChange}
                    type="text"
                    placeholder="Jazz"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Number Plate</Form.Label>
                  <Form.Control
                    value={formData.number_plate}
                    name="number_plate"
                    onChange={handleChange}
                    type="text"
                    placeholder="Corolla"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" name="image" size="sm" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                  <Form.Label>Price Per Day</Form.Label>
                  <Form.Control
                    value={formData.price_per_day}
                    name="price_per_day"
                    onChange={handleChange}
                    type="number"
                    placeholder="10000"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      <div className="container mt-3">
        <CardCarsDashboard cars={cars} />
      </div>
      

    </div>
      </Col>
    </Row>
    </Container>
  )
}

export default DashboardAdmin