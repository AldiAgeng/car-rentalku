
import { Container, Row, Col } from "react-bootstrap";
import CarouselTestimonial from "./CarouselTestimonial";
export default function Testimonial() {
  return (
    <div className="testi" id="testi">
      <Container>
        <Row className="mt-5 pt-3">
          <Col md className="mt-5 text-center">
            <h3>Testimonial</h3>
            <p>Berbagai review positif dari para pelanggan kami.</p>
          </Col>
        </Row>
      </Container>
      <CarouselTestimonial />
    </div>
  );
}
