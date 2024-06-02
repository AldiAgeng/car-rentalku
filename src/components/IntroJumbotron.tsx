
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import imgIntroCar from "../assets/img/img_car.png";
export default function IntroJumbotron() {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <Container>
          <Row className="mb-5 mt-5">
            <Col md className="m-auto">
              <h1 className="text-justify">Sewa & Rental Mobil Terbaik di Kawasan (Lokasimu)</h1>
              <p>Selamat datang di Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</p>
              <Button className="btn-light-green" href="#">
                Mulai Sewa Mobil
              </Button>
            </Col>
            <Col>
              <Image src={imgIntroCar} className="img-fluid img-car" alt="GambarMobil" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
