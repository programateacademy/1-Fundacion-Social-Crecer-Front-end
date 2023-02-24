import { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
      <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="w-75 h-75">
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
          <Button variant="primary" type="submit">
            Guardar cambios
          </Button>
        </div>
      </div>
    </>
  );
};
export default RecoveryPassword;
