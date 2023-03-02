import { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './RecoveryPassword.css'

const RecoveryPassword = () => {
  // States for password inputs
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const passItems = {
    newPassword,
    confirmNewPassword,
  };

  return (
    <>
      <div className="recovery__password">
        <div className="recovery__password--container">
          <Form>
            <Col>
              <Form.Group className="inputNewPass">
                <Form.Label>Contraseña Nueva</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña nueva"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  value={newPassword}
                />
              </Form.Group>
            </Col>
            <Form.Group className="inputNewPass">
              <Form.Label>Confirma tu contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu contraseña"
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
                value={confirmNewPassword}
              />
            </Form.Group>
          </Form>
          <Button id="recovery__password--save-button" variant="primary" type="submit">
            Guardar cambios
          </Button>
        </div>
      </div>
    </>
  );
};
export default RecoveryPassword;
