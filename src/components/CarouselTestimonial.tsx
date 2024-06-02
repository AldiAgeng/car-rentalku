import OwlCarousel from 'react-owl-carousel';
import { Container, Row, Col, Image, Button } from "react-bootstrap";

import testimonial1 from "../assets/img/img_photo-1.png";
import testimonial2 from "../assets/img/img_photo-2.png";
import testimonial3 from "../assets/img/img_photo-4.jpg";

import chevronR from "../assets/img/chevron-right.svg";
import chevronL from "../assets/img/chevron-left.svg";

export default function CarouselTestimonial() {
  return (
    <div>
      <OwlCarousel
        className="owl-carousel owl-theme"
        center={true}
        items={3}
        loop
        margin={10}
        nav={false}
        dots={false}
        responsive={{
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 2,
          },
        }}
      >
        <div className="item">
          <Row>
            <Col md={3} className="text-center my-auto">
              <Image src={testimonial1} className="rounded-circle" alt="GambarPhoto1" />
            </Col>
            <Col md>
              <div className="bintang">
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, incidunt odit? Exercitationem earum officia est. Dolore nobis totam quia dolores ad velit tempora accusamus maiores eligendi, illo quidem modi fugit.</p>
              <p className="user fw-bold">John Dee 32, Bromo</p>
            </Col>
          </Row>
        </div>
        <div className="item">
          <Row>
            <Col md={3} className="text-center my-auto">
              <Image src={testimonial2} className="rounded-circle" alt="GambarPhoto1" />
            </Col>
            <Col md>
              <div className="bintang">
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, incidunt odit? Exercitationem earum officia est. Dolore nobis totam quia dolores ad velit tempora accusamus maiores eligendi, illo quidem modi fugit.</p>
              <p className="user fw-bold">John Dee 32, Bromo</p>
            </Col>
          </Row>
        </div>
        <div className="item">
          <Row>
            <Col md={3} className="text-center my-auto">
              <Image src={testimonial3} className="rounded-circle" alt="GambarPhoto1" />
            </Col>
            <Col md>
              <div className="bintang">
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, incidunt odit? Exercitationem earum officia est. Dolore nobis totam quia dolores ad velit tempora accusamus maiores eligendi, illo quidem modi fugit.</p>
              <p className="user fw-bold">John Dee 32, Bromo</p>
            </Col>
          </Row>
        </div>
      </OwlCarousel>
      <Container>
        <Row>
          <Col className="mt-3 text-center">
            <Button className="btn-left">
              <img src={chevronL} alt="Chevron1" />
            </Button>
            <Button className="btn-right">
              <img src={chevronR} alt="Chevron2" />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
