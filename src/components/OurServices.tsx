
import { Container, Row, Col, Image } from "react-bootstrap";
import imgServices from "../assets/img/img_service.png";
import iconCheck from "../assets/img/icon_cek.png"

export default function OurServices() {
  return (
    <div className="services" id="services">
      <Container>
        <Row className="mt-5 pt-5">
          <Col md={6} className="text-center mt-5">
            <Image src={imgServices} className="img-fluid" alt="GambarOrang"></Image>
          </Col>
          <Col md={6} className="mt-5">
            <h2 className="text-justify mt-4">Best Car Rental for any kind of trip in (Lokasimu)!</h2>
            <p className="mt-4">
              Sewa mobil di (lokasimu) bersam Car Rental jaminan harga lebih murah dibandingkan yang lain, kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting, dll.
            </p>
            <ul className="list-group">
              <li className="list-group-item border-0">
                <Image src={iconCheck} alt="IconCheck" className="me-1" />
                Sewa Mobil Dengan Supir di Bali 12 Jam
              </li>
              <li className="list-group-item border-0">
              <Image src={iconCheck} alt="IconCheck" className="me-1" /> Sewa Mobil Lepas Kunci di Bali 24 Jam
              </li>
              <li className="list-group-item border-0">
              <Image src={iconCheck} alt="IconCheck" className="me-1" /> Sewa Mobil Jangka Panjang Bulanan
              </li>
              <li className="list-group-item border-0">
              <Image src={iconCheck} alt="IconCheck" className="me-1" /> Gratis Antar - Jemput Mobil di Bandara
              </li>
              <li className="list-group-item border-0">
              <Image src={iconCheck} alt="IconCheck" className="me-1" /> Layanan Airport Transfer / Drop In Out
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
