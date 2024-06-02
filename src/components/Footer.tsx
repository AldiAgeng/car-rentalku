
import { Container, Row, Col, Image } from "react-bootstrap";

import facebook from "../assets/img/icon_facebook.png";
import instagram from "../assets/img/icon_instagram.png";
import twitter from "../assets/img/icon_twitter.png";
import mail from "../assets/img/icon_mail.png";
import twitch from "../assets/img/icon_twitch.png";

export default function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row className="mt-5">
          <Col md className="my-1">
            <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
            <p>carrentalku@gmail.com</p>
            <p>081-233-334-808</p>
          </Col>
          <Col md className="my-1">
            <p>
              <a href="#services" className="text-decoration-none text-dark fw-bold">
                Our services
              </a>
            </p>
            <p>
              <a href="#why-us" className="text-decoration-none text-dark fw-bold">
                Why Us
              </a>
            </p>
            <p>
              <a href="#testi" className="text-decoration-none text-dark fw-bold">
                Testimonial
              </a>
            </p>
            <p>
              <a href="#faq" className="text-decoration-none text-dark fw-bold">
                FAQ
              </a>
            </p>
          </Col>
          <Col md className="my-1">
            <p>Connect with us</p>
            <Image className="m-1" src={facebook} alt="Facebook" />
            <Image className="m-1" src={instagram} alt="Instagram" />
            <Image className="m-1" src={twitter} alt="Twitter" />
            <Image className="m-1" src={mail} alt="Mail" />
            <Image className="m-1" src={twitch} alt="Twitch" />
          </Col>
          <Col md className="my-1">
            <p>Copyright Carrentalku 2024</p>
            <p>Carrentalku</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
