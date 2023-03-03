import { useState } from "react";
import Form from "react-bootstrap/Form";
import users from "../../apis/index";

const ChangePasswordModal = ({ email1 }) => {
  const [form, setForm] = useState(
    {
      email: email1, 
      newPassword: "",
      confirmNewPassword: ""
    }
  )

  const handleInputText = (e) => {
    let { name, value } = e.target;
    let newForm = { ...form, [name]: value };
    setForm(newForm);
  };
    
  const handleChangePassword = async () => {
    try{
      const response = await users.put('/api/change-password', form, {
        headers: {
          Authorization: localStorage.getItem('recovery-token' || 'token' )
        }
      })
      console.log(response)
    }catch(error){
      console.log(error.response.data)
      setAlertMessage(error.response.data.error)
      setTimeout(() => setAlertMessage(''), 4000)
    }
  }

  return (
    <div id="Form">
      <Form>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            name="name"
            value={form.newPassword}
            placeholder="Nueva contraseña"
            onChange={handleInputText}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            placeholder="Confirmar contraseña"
            onChange={handleInputText}
          />
        </Form.Group>
      </Form>
      <div className="btnsUser">
        <button
          className="btnCreateUser"
          onClick={_=> {handleChangePassword; setShow(false)}}
        >
          Editar
        </button>
        <button
          className="btnEliminateUser"
          onClick={() => {
            eliminateManager(id);
            console.log(id);
            setShow(false);
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );}
  
export default ChangePasswordModal;
