import { useState } from 'react';
import app from '../../../apis/index'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IconPadLock from "../../icons/IconPadLock";

const AdminLockedModal = ( props ) => {
  const superAdminMessagge = "Se ha enviado un mensaje deseguridad a tu email registrado";
  const adminMessagge = "Ponte en contacto con el encargado ";

  const [Code, setCode] = useState()

  const handleCodeVerification = async () => {
    try {
      const response = await app.get('/api/code', { headers: { Code: process.env.VITE_CODE_KEY }});
      setCode(response.data.code);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Oh! se ha bloqueado tu cuenta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex gap-4 p-5">
        <IconPadLock />
        <div className="d-flex flex-column justify-content-between fs-4">
          <p>Has excedido la cantidad maxima de intentos para iniciar sesion</p>
          <p> {props.role == "admin" ? adminMessagge : superAdminMessagge}</p>
          <div>
            {props.role == "superadmin" ? 
            <Button variant="primary" className="w-50" size="sm" onClick={() => handleCodeVerification() }>
              Enviame el codigo
            </Button> : ''}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default AdminLockedModal;
