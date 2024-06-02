import React, { Fragment, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import useUserInfoStore from '../stores/UserInfoStore';
import { useState } from 'react';
import Swal from 'sweetalert2';


const DashboardMember: React.FC = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<{id: string, car: {merk: string, number_plate: string}, pickup_date: string, return_date: string, status: string, total_price: number}[]>([]);

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

  const listOrder = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setOrder(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleConfirmReturn = (id: string) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/orders/${id}/return`, {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          text: 'Return Success',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        listOrder();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    listOrder();
  }, []);

  return (
    <Container fluid>
    <Row className="vh-100">
      <Col md={3} className="bg-light">
        <Card className="h-100">
          <Card.Header>Menu Member</Card.Header>
          <Card.Body>
            <Button variant="primary" className="w-100 mb-2">Dashboard</Button>
            <Button variant="secondary" className="w-100 mb-2" onClick={() => navigate('/cars')}>Home</Button>
            <Button variant="secondary" className="w-100 mb-2" onClick={handleLogout}>Logout</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={9}>
      <div className="container-fluid">
      {/* <ToastContainer /> */}
        <h4 className="mt-3">Data Order</h4>
        <Col className="d-flex mt-3">
        <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Merk Mobil</th>
            <th>Plat</th>
            <th>Tanggal Sewa</th>
            <th>Tanggal Kembali</th>
            <th>Status</th>
            <th>Total Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) => (
            <Fragment key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{item.car.merk}</td>
                <td>{item.car.number_plate}</td>
                <td>{item.pickup_date}</td>
                <td>{item.return_date}</td>
                <td>{item.status}</td>
                <td>{item.total_price}</td>
                <td>
                {item.status === 'rented' ? (
                <Button variant="primary" onClick={() => handleConfirmReturn(item.id)}>Konfirmasi Selesai</Button>
                ) : <>Sudah Selesai</>}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
        </Col>
    </div>
      </Col>
    </Row>
    </Container>
  );
}

export default DashboardMember;
