import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BiCalendar } from 'react-icons/bi';
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { Cars } from '../../interfaces/CarInterface';
export default function CardCarsDashboard({ cars: cars }: { cars: Cars[] }) {

  const [idCar, setIdCar] = useState(0)
  const [plate, setPlate] = useState('')
  const [manufacture, setManufacture] = useState('')
  const [model, setModel] = useState('')
  const [image, setImage] = useState(null)
  const [rentPerDay, setRentPerDay] = useState('')
  const [capacity, setCapacity] = useState('')
  const [description, setDescription] = useState('')
  const [avaliableAt, setAvaliableAt] = useState('')
  const [transmission, setTransmission] = useState('')
  const [available, setAvailable] = useState('')
  const [type, setType] = useState('')
  const [year, setYear] = useState('')
  const [options, setOptions] = useState('')
  const [specs, setSpecs] = useState('')

  

  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);

  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleDelete = (Id: number) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cars/${Id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        handleCloseDelete();
      }).catch((error) => {
        console.log(error);
      })
  }

  const handleDetail = (Id: number,) => {
    setIdCar(Id);
    setShowUpdate(true);
    axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cars/${Id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((response) => {
      setPlate(response.data.data.plate);
      setManufacture(response.data.data.manufacture);
      setModel(response.data.data.model);
      setRentPerDay(response.data.data.rent_per_day);
      setCapacity(response.data.data.capacity);
      setDescription(response.data.data.description);
      setTransmission(response.data.data.transmission);
      setAvaliableAt(new Date(response.data.data.available_at).toISOString().split('T')[0])
      setAvailable(response.data.data.available);
      setType(response.data.data.type);
      setImage(response.data.data.image);
      setYear(response.data.data.year);
      setOptions(response.data.data.options);
      setSpecs(response.data.data.specs);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleUpdate = () => {
    const form = new FormData();
    form.append("plate", plate);
    form.append("manufacture", manufacture);
    form.append("model", model);
    form.append("image", image);
    form.append("rent_per_day", rentPerDay);
    form.append("capacity", capacity);
    form.append("description", description);
    form.append("available_at", avaliableAt);
    form.append("transmission", transmission);
    form.append("available", available);
    form.append("type", type);
    form.append("year", year);
    form.append("options", JSON.stringify(options));
    form.append("specs", JSON.stringify(specs));
    axios
      .patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cars/${idCar}`, form, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        alert(response.data.message);
        handleCloseUpdate();
        window.location.reload();
      }).catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
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
                      <span className="fw-bold">Rp. {car.price_per_day.toString()} / Hari</span>
                    </Card.Text>
                    <Card.Text>
                      <BiCalendar/> {car.updated_at}
                    </Card.Text>
                    <Row>
                      {/* <Col>
                      <Button className="btn-danger w-100" onClick={handleShowDelete}>Delete</Button>
                        <Modal show={showDelete} onHide={handleCloseDelete}>
                          <Modal.Header closeButton>
                            <Modal.Title>Deleting Data</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Woohoo, are you sure you want to delete this data?</Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDelete}>
                              Cancel
                            </Button>
                            <Button variant="primary" onClick={() => handleDelete(car.id)}>
                              Yes
                            </Button>
                          </Modal.Footer>
                      </Modal>
                      </Col>
                      <Col>
                        <Button className="btn-light-green w-100" onClick={() => handleDetail(car.id)}>Update</Button>
                        <Modal show={showUpdate} onHide={handleCloseUpdate}>
                          <Modal.Header closeButton>
                            <Modal.Title>Cars</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                  <Form.Label>Plate</Form.Label>
                                  <Form.Control
                                    value={plate}
                                    onChange={(e) => setPlate(e.target.value)}
                                    type="text"
                                    placeholder="Z-123-ABC"
                                    autoFocus
                                  />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Manufacture</Form.Label>
                                    <Form.Control
                                      value={manufacture}
                                      onChange={(e) => setManufacture(e.target.value)}
                                      type="text"
                                      placeholder="Toyota"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                      value={model}
                                      onChange={(e) => setModel(e.target.value)}
                                      type="text"
                                      placeholder="Corolla"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" size="sm" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      if (e.target.files) {
                                        setImage(e.target.files[0]);
                                      }else{
                                        setImage(null);
                                      }
                                    }}/>
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                    <Form.Label>Rent Per Day</Form.Label>
                                    <Form.Control
                                      value={rentPerDay}
                                      onChange={(e) => setRentPerDay(e.target.value)}
                                      type="number"
                                      placeholder="10000"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                    <Form.Label>Capacity</Form.Label>
                                    <Form.Control
                                      value={capacity}
                                      onChange={(e) => setCapacity(e.target.value)}
                                      type="number"
                                      placeholder="10000"
                                    />
                                  </Form.Group>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea6">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                                  <Form.Label>Available At</Form.Label>
                                  <Form.Control type="date" value={avaliableAt} onChange={(e) => setAvaliableAt(e.target.value)}  />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                                  <Form.Label>Transmission</Form.Label>
                                  <Form.Control
                                      value={transmission}
                                      onChange={(e) => setTransmission(e.target.value)}
                                      type="text"
                                      placeholder="Sedan"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
                                    <Form.Label>Available</Form.Label>
                                    <Form.Control
                                      value={available}
                                      onChange={(e) => setAvailable(e.target.value)}
                                      type="text"
                                      placeholder="Sedan"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control
                                      value={type}
                                      onChange={(e) => setType(e.target.value)}
                                      type="text"
                                      placeholder="Manual / Automatic"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control
                                      value={year}
                                      onChange={(e) => setYear(e.target.value)}
                                      type="text"
                                      placeholder="Sedan"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput12">
                                    <Form.Label>Options</Form.Label>
                                    <Form.Control
                                      value={options }
                                      onChange={(e) => setOptions(e.target.value)}
                                      type="text"
                                      placeholder="Sedan, Bla, bla"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput13">
                                    <Form.Label>Specs</Form.Label>
                                    <Form.Control
                                      value={specs}
                                      onChange={(e) => setSpecs(e.target.value)}
                                      type="text"
                                      placeholder="Bla, bla, bla"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseUpdate}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={() => handleUpdate()}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Col> */}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
          ))
        )}
      </Row>
    </>
  );
}
