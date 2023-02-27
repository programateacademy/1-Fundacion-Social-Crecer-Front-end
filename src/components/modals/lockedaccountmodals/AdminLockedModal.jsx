import { useState } from 'react';
import app from '../../../apis/index'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from 'react-bootstrap/Alert'
import IconPadLock from "../../icons/IconPadLock";

const AdminLockedModal = ( props ) => {
  // State for get request message 
  const [codeSendMessage, setCodeSendMessage] = useState('')
  // State for post request message
  const [codeVerifyMessage, setCodeVerifyMessage] = useState('')
  // State for userCode input 
  const [userCode, setUserCode] = useState('')
  // Modal messages 
  const superAdminMessagge = codeSendMessage || "¿Quires que se te envie un correo con el codigo de recuperacion?";
  const adminMessagge = "Ponte en contacto con el encargado ";

  

  const handleSendCode = async () => {
    try {
      const response = await app.get('/api/code', { headers: { Code: import.meta.env.VITE_CODE_KEY }});
      setCodeSendMessage(response.data.message)
    } catch (error) {
      console.error(error);
    }
  }

  const handleCodeVerify = async (e) => {
    e.preventDefault();
    try {
    const response = await app.post('/api/code/verify-code', { code: userCode }, {
      headers: {
        Code: import.meta.env.VITE_CODE_KEY 
      }
    });
    console.log(response.data.message);
    }catch (error){
      setCodeVerifyMessage(error.response.data.message)
      setTimeout(() => setCodeVerifyMessage(''), 4000)
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
          <p> {props.role === "admin" ? adminMessagge : superAdminMessagge}</p>
          <div>
            {
              !codeSendMessage // si el código no fue enviado
                ? props.role == "superadmin" && // mostrar botón si es superadmin
                  <Button variant="primary" className="w-50" size="sm" onClick={handleSendCode}>
                    Enviame el codigo
                  </Button>
                : 
                <form className='mt-2' onSubmit={handleCodeVerify}> 
                  <label htmlFor="">Tu codigo de recuperacion</label>
                  <input type='text' placeholder='codigo' value={userCode} name='userCode' onChange={(e) =>setUserCode(e.target.value)}></input>
                  <button type='submit' name='sendUserCode' >Continuar</button>
                </form>    
            }
          </div>
          {codeVerifyMessage ? <Alert className='w-75' variant='danger'>{codeVerifyMessage}</Alert> : ''}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default AdminLockedModal;
