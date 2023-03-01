import app from '../../apis/index'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './RecoveryPassword.css'

const RecoveryPassword = () => {
  const navigate = useNavigate()
  // State for error alert 
  const [alertMessage, setAlertMessage] = useState("")
  // States for password inputs
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    try{
      const response = await app.put('/api/change-password', passwordModel, {
        headers: {
          Authorization: localStorage.getItem('recovery-token')
        }
      })
      navigate('/matrix/')
      console.log(response)
    }catch(error){
      console.log(error.response.data)
      setAlertMessage(error.response.data.error)
      setTimeout(() => setAlertMessage(''), 4000)
    }
  }

  const passwordModel = {
    email: 'superadmin@locked.com',
    newPassword,
    confirmNewPassword,
  };

  return (
    <>
      <div className="recovery__password">
        <div className="recovery__password--container">
          <h2>Cambiar contraseña</h2>
          {alertMessage ? <Alert variant='danger' w-100 >{alertMessage}</Alert> : '' }
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
          <Button onClick={() => handleChangePassword()} id="recovery__password--save-button" variant="primary" type="submit">
            Guardar cambios
          </Button>
        </div>
      </div>
    </>
  );
};
export default RecoveryPassword;
