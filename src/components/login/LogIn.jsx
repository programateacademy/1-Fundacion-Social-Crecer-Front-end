import "./login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../../assets/img/logo.svg";
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";

const LogIn = () => {
  return (
    <>
      <Container className="text-center">
        <Row className="">
          <Col className="logoContainer">
            <img src={Logo} alt="Logo" />
          </Col>
          <Col className="form">
            <p className="log-in">Iniciar sesión</p>
            <hr />
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="1">
                  <BsFillPersonFill />
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    className="logInInput"
                    placeholder="Usuario"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label column sm="1">
                  <BsFillLockFill />
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    className="logInInput"
                    placeholder="Contraseña"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              ></Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LogIn;
