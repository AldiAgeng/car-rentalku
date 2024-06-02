
import { Container, Row, Col, Accordion } from "react-bootstrap";
export default function FAQ() {
  return (
    <div className="faq" id="faq">
      <Container>
        <Row className="mt-5 pt-3">
          <Col md={5} className="mt-5">
            <h3>Frequently Asked Question</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </Col>

          <Col md className="mt-5">
            <Accordion>
              <Accordion.Item className="mb-3" eventKey="0">
                <Accordion.Header>Apa saja syarat yang dibutuhkan?</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nulla.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="mb-3" eventKey="1">
                <Accordion.Header>Berapa hari minimal sewa mobil lepas kunci?</Accordion.Header>
                <Accordion.Body>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, repudiandae?</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="mb-3" eventKey="2">
                <Accordion.Header>Berapa hari sebelumnya sebainya booking sewa mobil?</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, amet.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="mb-3" eventKey="3">
                <Accordion.Header>Apakah Ada biaya antar-jemput?</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, amet.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="mb-3" eventKey="4">
                <Accordion.Header>Bagaimana jika terjadi kecelakaan?</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, amet.</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
