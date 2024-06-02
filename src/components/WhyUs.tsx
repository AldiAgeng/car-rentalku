
import { Container, Row, Col, Image, Card } from "react-bootstrap";

import iconComplete from "../assets/img/icon_complete.png";
import iconPrice from "../assets/img/icon_price.png";
import icon24h from "../assets/img/icon_24hrs.png";
import iconProfessional from "../assets/img/icon_professional.png";

export default function WhyUs() {
  return (
    <div className="why-us" id="why-us">
      <Container>
        <Row className="mt-5 pt-3">
          <Col md className="mt-5">
            <h3>Why Us</h3>
            <p className="mt-3">Mengapa harus pilih Car Rental?</p>
          </Col>
        </Row>
        <Row>
          <Col md className="mb-3">
            <Card className="card p-3">
              <Card.Body>
                <Image src={iconComplete} alt="IconComplete" />
                <h5 className="card-title mt-3">Mobil Lengkap</h5>
                <p className="card-text mt-3">Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md className="mb-3">
            <Card className="card p-3">
              <Card.Body>
                <Image src={iconPrice} alt="IconPrice" />
                <h5 className="card-title mt-3">Harga Murah</h5>
                <p className="card-text mt-3">Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md className="mb-3">
            <Card className="card p-3">
              <Card.Body>
                <Image src={icon24h} alt="Icon24h" />
                <h5 className="card-title mt-3">Layanan 24 Jam</h5>
                <p className="card-text mt-3">Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md className="mb-3">
            <Card className="card p-3">
              <Card.Body>
                <Image src={iconProfessional} alt="IconProfessional" />
                <h5 className="card-title mt-3">Sopir Profesional</h5>
                <p className="card-text mt-3">Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
