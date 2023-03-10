import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../../apis/index";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import IconPadLock from "../../icons/IconPadLock";

const AdminLockedModal = (props) => {
  const navigate = useNavigate();
  // State for get request message
  const [codeSendMessage, setCodeSendMessage] = useState("");
  // State for post request message
  const [codeVerifyMessage, setCodeVerifyMessage] = useState("");
  // State for userCode input
  const [userCode, setUserCode] = useState("");
  
  // Modal messages
  const superadminMessage = codeSendMessage || "¿Quieres que se te envíe un correo con el código de recuperación?";
  const adminMessage = "Ponte en contacto con el encargado.";
  
  const handleSendCode = async () => {
    try {
      const response = await app.get(`/api/code/${props.email}`, {
        headers: { Code: import.meta.env.VITE_CODE_KEY },
      });
      setCodeSendMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await app.post(
        "/api/code/",
        {email:props.email, code: userCode },
        {
          headers: {
            Code: import.meta.env.VITE_CODE_KEY,
          },
        }
      );
      localStorage.setItem("recovery-token", response.data.token);
      // Allow user to login
      props.onLogin();
      // Move user to /recover-password/ route
      navigate("/recover-password/");
    } catch (error) {
      console.log(error.response);
      setCodeVerifyMessage(error.response.data.message);
      setTimeout(() => setCodeVerifyMessage(""), 4000);
    }
  };

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
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
          <p>Has excedido la cantidad máxima de intentos para iniciar sesión</p>
          <p> {props.role === "admin" ? adminMessage : superadminMessage}</p>
          <div>
            {!codeSendMessage ? ( // If the code was not sent
              props.role === "superAdmin" && ( // Show button if user has a superAdmin role
                <Button
                  variant="primary"
                  className="w-50"
                  size="sm"
                  onClick={handleSendCode}
                >
                  Enviame el código
                </Button>
              )
            ) : (
              <form className="mt-2" onSubmit={handleCodeVerify}>
                <label htmlFor="">Tu código de recuperación</label>
                <input
                  type="text"
                  placeholder="codigo"
                  value={userCode}
                  name="userCode"
                  onChange={(e) => setUserCode(e.target.value)}
                ></input>
                <button type="submit" name="sendUserCode">
                  Continuar
                </button>
              </form>
            )}
          </div>
          {codeVerifyMessage ? (
            <Alert className="w-75" variant="danger">
              {codeVerifyMessage}
            </Alert>
          ) : (
            ""
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default AdminLockedModal;
