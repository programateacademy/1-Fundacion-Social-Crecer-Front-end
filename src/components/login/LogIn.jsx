import "./login.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../../assets/img/logo.svg";
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";


const LogIn = ({addFunction}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
    addFunction({email,password})
  }
  return (
    < div className='bodyLogin'>
      <div className="containerLogIn">
          <div className="logoContainer">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="vr"></div>
          <div className="form">
            <p className="log-in">Iniciar sesión</p>
            <hr />
            <Form className="inputsForm" onSubmit={handleSubmit} >
              <Form.Group as={Row}>
                <Form.Label column sm="1">
                  <BsFillPersonFill />
                </Form.Label>
                <Col sm="11">
                  <Form.Control
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className="logInInput"
                    placeholder="Email"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formBasicPassword"
              >
                <Form.Label column sm="1">
                  <BsFillLockFill />
                </Form.Label>
                <Col sm="11">
                  <Form.Control
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="logInInput"
                    placeholder="Contraseña "
                  />
                </Col>
              </Form.Group>
              <Button type="submit">Ingresar</Button>
            </Form>
          </div>
      </div>
    </div>
  );
};

export default LogIn;
