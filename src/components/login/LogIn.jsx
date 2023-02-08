import "./login.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../../assets/img/logo.svg";
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import axios from "axios";

const LogIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');
  const [loading, setloading] = useState(false);
  const { email, password } = inputs;
  const onChange = (e) => {
    setInputs({...inputs,[e.target.email]:e.target.value})
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    if(email !=='' && password !==''){
      const User ={
        email,
        password
      };
      setloading(true)
      await axios
      .post('http://localhost:3030', User)
      .then(({data}) => console.log(data))
    }
  };
  return (
    <>
      <div className="containerLogIn">
          <div className="logoContainer">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="vr"></div>
          <div className="form">
            <p className="log-in">Iniciar sesión</p>
            <hr />
            <Form className="inputsForm"onSubmit={(e) => (onSubmit(e))}>
              <Form.Group as={Row}>
                <Form.Label column sm="1">
                  <BsFillPersonFill />
                </Form.Label>
                <Col sm="11">
                  <Form.Control
                    onChange={(e) => (onChange(e))}
                    type="email"
                    className="logInInput"
                    placeholder="Usuario"
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
                    onChange={(e) => (onChange(e))}
                    type="password"
                    className="logInInput"
                    placeholder="Contraseña"
                  />
                </Col>
              </Form.Group>
              <Button type="submit">Ingresar</Button>
            </Form>
          </div>
      </div>
    </>
  );
};

export default LogIn;
