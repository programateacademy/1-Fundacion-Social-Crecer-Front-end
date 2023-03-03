import { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert'
import users from "../../apis/index";

const EditDeleteFunction = ({ email1, setShow }) => {
  const [alertMessage, setAlertMessage] = useState("")
  const [form, setForm] = useState({email: email1})


  const handleInputText = (e) => {
    let { name, value } = e.target;
    let newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  const handleChangePassword = async () => {
    try{
      const response = await users.put('/api/change-password', form, {
        headers: {
          Authorization: localStorage.getItem('token' || 'recovery-token')
        }
      })

      await setShow(false)
    }catch(error){
      console.log(error.response.data)
      setAlertMessage(error.response.data.error)
      setTimeout(() => setAlertMessage(''), 3000)
    }
  }

  return (
    <div id="Form">
      {alertMessage ? <Alert variant="danger">{alertMessage}</Alert> : ''}
      <Form>
        <Form.Group className="inputNewUser" controlId="formBasicPassword">
          <Form.Label>Contraseña nueva</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Contraseña nueva"
            onChange={handleInputText}
          />
        </Form.Group>
        <Form.Group className="inputNewUser" controlId="formBasicPassword">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            name="confirmNewPassword"
            placeholder='Confirmar contraseña'
            onChange={handleInputText}
          />
        </Form.Group>
      </Form>
      <div className="btnsUser">
        <button
          className="btnCreateUser"
          onClick={_=> {handleChangePassword()}}
        >
          Confirmar
        </button>
        <button
          className="btnEliminateUser"
          onClick={() => {
            setShow(false)
            getManagers();
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );}
export default EditDeleteFunction;
