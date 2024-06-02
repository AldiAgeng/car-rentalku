import { BiCar } from 'react-icons/bi';
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { Cars } from '../interfaces/CarInterface';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CardCars({ cars: cars }: { cars: Cars[] }) {
  const [show, setShow] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Cars | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (car: Cars) => {
    setSelectedCar(car);
    setFormData({
      ...formData,
      car_id: car.id,
    });
    setShow(true);
  };

  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    pickup_date: getCurrentDate(),
    return_date: '',
    car_id: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/orders`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Order Success',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
      handleClose();
      navigate('/dashboard-member');
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        Swal.fire({
          title: 'Error!',
          text: 'Unauthorized',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
        navigate('/login');
      }

      if (error.response.status === 403) {
        Swal.fire({
          title: 'Error!',
          text: 'Forbidden',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
        navigate('/dashboard');
      }

      if (error.response.status == 400) {
        console.log(typeof error.response.data.meta.message);
        if (typeof error.response.data.meta.message === 'object') {
          error.response.data.meta.message.forEach((err: any) => {
            toast.error(err);
          })
        } else {
          toast.error(error.response.data.meta.message);
        }
      }
    });
  };

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cars</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
                <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Tanggal Di Sewa</Form.Label>
                  <Form.Control
                    value={formData.pickup_date}
                    name="pickup_date"
                    onChange={handleChange}
                    type="date"
                    placeholder="yyyy-mm-dd"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Tanggal Di Kembalikan</Form.Label>
                  <Form.Control
                    value={formData.return_date}
                    name="return_date"
                    onChange={handleChange}
                    type="date"
                    placeholder="yyyy-mm-dd"
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
      <Row className="mt-5">
        {cars && cars.length === 0  ? (
          <Col>
            <p className="text-center">Tidak ada mobil yang tersedia.</p>
          </Col>
        ) : (
          cars &&
          cars?.length > 0 &&
          cars.map((car) => (
              <Col md={4} className="mb-3 d-flex justify-content-center" key={car.id}>
                <Card style={{ width: "333px" }}>
                  <Card.Img variant="top" src={import.meta.env.VITE_BACKEND_BASE_URL + car.image_url} style={{ maxHeight: "13rem" }} />
                  <Card.Body>
                  <Card.Title>
                      {car.merk} / {car.model}
                    </Card.Title>
                    <Card.Text>
                      <span className="fw-bold">Rp. {car.price_per_day.toString()}</span>
                    </Card.Text>
                    <Card.Text>
                      <span> Available : {car.is_available ? "Yes" : "No"}</span>
                      <br/>
                      <span><BiCar /> {car.number_plate}</span>
                    </Card.Text>
                    <Button className="btn-light-green w-100" onClick={() => handleShow(car)}>Pilih Mobil</Button>
                  </Card.Body>
                </Card>
              </Col>
          ))
        )}
      </Row>
    <ToastContainer />
    </>
  );
}
