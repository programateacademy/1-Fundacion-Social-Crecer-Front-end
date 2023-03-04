import "./login.css";
// Import hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import react-bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Logo from "../../assets/img/logo.svg";
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
//Import modal components
import AdminLockedModal from "../modals/lockedaccountmodals/AdminLockedModal";

const LogIn = ({ loginFunction, onLogin, onLogout, userInfo }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  
  // Define an async function that will handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(email, password);
    const sucess = await loginFunction({ email, password });
    // If the login was successful call the onLogin function
    if (sucess) {
      onLogin();
      navigate("/matrix/");
    } else if (userInfo[0]) {
      // If user is locked, show locked modal (true or false)
      setShowLockedModal(true);
      // Save super admin info into local storage (isLocked, role, email)
      localStorage.setItem({ adminUserInfo: userInfo })
      // localStorage.setItem('userEmail', userInfo[2])
    } else {
      console.log("NO Llamo a handleLogin");
      // Set the showErrorAlert state to true to show the error message
      setShowErrorAlert(true);
      // Hide the error message after 3 seconds
      setTimeout(() => setShowErrorAlert(false), 3000);
      onLogout();
    }
  };
  const resetLocalStorage = () => {
    localStorage.clear();
  };
  
  return (
    <div className="bodyLogin" onLoad={() => resetLocalStorage()}>
      <div className="containerLogIn">
        <div className="logoContainer">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="vr"></div>
        <div className="form">
          <p className="log-in">Iniciar sesión</p>
          <hr />
          {showErrorAlert && (
            <Alert variant="warning" className="w-75">
              Las credenciales son incorrectas
            </Alert>
          )}
          <Form className="inputsForm" onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="1">
                <BsFillPersonFill />
              </Form.Label>
              <Col sm="11">
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="logInInput"
                  placeholder="Email"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicPassword">
              <Form.Label column sm="1">
                <BsFillLockFill />
              </Form.Label>
              <Col sm="11">
                <Form.Control
                  onChange={(e) => setPassword(e.target.value) }
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
      <AdminLockedModal
        onLogin={onLogin}
        show={showLockedModal}
        onHide={() => setShowLockedModal(false)}
        role={userInfo[1]}
        email={userInfo[2]}
      />
    </div>
  );
};

export default LogIn;
