import { useState } from "react";
import { Modal, Form } from "react-bootstrap";

const PasswordConfirm = ({ show, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleConfirm = () => {
    if (password === "1234") { // Cambiar "1234" por la contraseña que se desea validar hacer petición post desde
      //este frontend, mirar el login de cami
      onConfirm();
    } else {
      setErrorMessage("Contraseña incorrecta");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Validar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange}
            isInvalid={errorMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <button className="btnCreateUser" onClick={handleConfirm}>
          Confirmar
        </button>
        <button className="btnCancelUser" onClick={onClose}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordConfirm;
