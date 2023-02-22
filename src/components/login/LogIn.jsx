import "./login.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../../assets/img/logo.svg";
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AdminLockedModal from "../modals/lockedaccountmodals/AdminLockedModal";



const LogIn = ({loginFunction, onLogin, onLogout }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [showLockedModal, setShowLockedModal] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password)
    const sucess = await loginFunction({email,password});
    if  (sucess){
      onLogin();
      navigate("/matrix/");
    }else {
      console.log("NO Llamo a handleLogin")
      onLogout();
      
    }
  }

  return (
    <div className="bodyLogin">
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
      <Button variant="primary" onClick={() => setShowLockedModal(true)}>
        Launch vertically centered modal
      </Button>
      <AdminLockedModal
        show={showLockedModal}
        onHide={() => setShowLockedModal(false)}
        role="superadmin"
      />
    </div>
  );
};

export default LogIn;
