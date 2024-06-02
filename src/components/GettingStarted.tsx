

import { Container, Row, Col, Button } from "react-bootstrap";
export default function GettingStarted() {
  return (
    <div className="getting-started" id="getting-started">
      <Container>
        <Row className="mt-5">
          <Col md className="mt-5">
            <div className="jumbotron jumbotron-fluid item-jumbo text-center pt-5">
              <h2 className="pt-5">Sewa Mobil di (Lokasimu) Sekarang</h2>
              <p className="mt-2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur exercitationem laboriosam quia facilis voluptas ipsam quod, quasi numquam necessitatibus et?</p>
              <Button className="btn-light-green mt-3">Mulai Sewa Mobil</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
