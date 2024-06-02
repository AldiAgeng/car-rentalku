import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Hourglass } from 'react-loader-spinner'
import CardCars from "./CardCars";


export default function FilterCars() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cars/public`); 

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setCars(data.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  
  
  const handleSubmit = () => {
    setLoading(true);
    const url = new URL(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/cars/public`);
    url.searchParams.append("search", search);

    axios.get(url.href).then((response) => {
      setCars(response.data.data.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      console.log(error);
    })
  };

  return (
    <div className="filter-cars">
      <Container>
        <Row className="mt-5 pt-5">
          <Col md className="d-flex justify-content-center">
            <Card>
              <Card.Body>
                <Row>
                  <Col md>
                    <label className="form-label col-form-label-sm">Cari Berdasarkan Merk / Model</label>
                    <input type="text" className="form-control form-control-sm" onChange={handleSearch} placeholder="Honda" />
                  </Col>
                  <Col md={1} className="text-center">
                    <Button className="btn btn-sm btn-light-green mx-auto search-btn" id="btn-search" onClick={handleSubmit} type="submit">
                      Cari Mobil
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {loading ? (
          <div className="mt-5 d-flex justify-content-center">
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={['#306cce', '#72a1ed']}
            />
          </div>
          ) : (
          <CardCars cars={cars} />
          )}
      </Container>
    </div>
  );
}
