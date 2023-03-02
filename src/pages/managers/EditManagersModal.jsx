import { useState } from "react";
import Form from "react-bootstrap/Form";
import users from "../../apis/index";

const EditManagersModal = ({ id, docnum1, name1, email1,unity1, setShow, setManagers,onClose,setIsEditing }) => {
  const [form, setForm] = useState(
    {
      name: name1, 
      docnum: docnum1, 
      email: email1, 
      unity: unity1
    }
  )
   const [emailError, setEmailError] = useState("");  
  
  const handleInputText = (e) => {
    let { name, value } = e.target;
    let newForm = { ...form, [name]: value };
    setForm(newForm);
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

/*   const handleEditClick = () => {
    if (!validateEmail(form.name)) {
      setEmailError("Por favor, ingrese un correo electrónico válido");
    } else {
      setEmailError("");
      editManager(id);
      setIsEditing(false);
      setShow(false);
    }
  };  */ 
  
  const handleClose = () => {
    if (!emailError) {
      setShow(false);
      onClose();
    }
  };
    
  const eliminateManager = async (id) => { 
    try {
    const response = await users.delete(`/api/superadmin/admin/${id}`, {headers: {
      Authorization: localStorage.getItem('token' || 'recovery-token')
    }})
    console.log(response);
  } catch (error) {
      console.error(error);
    }
  };
 

  const editManager = async (id) => { 
    try {
    const response = await users.put(`/api/superadmin/admin/${id}`,form, {headers: {
      Authorization: localStorage.getItem('token' || 'recovery-token')
    }})
    console.log(response);
  } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="Form">
      <Form>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            placeholder={name1}
            onChange={handleInputText}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            name="unity"
            value={form.unity}
            placeholder={unity1}
            onChange={handleInputText}
          />
        </Form.Group>
      </Form>
      <div className="btnsUser">
        <button
          className="btnCreateUser"
          onClick={_=> {editManager(id);setShow(false)}}
        >
          Editar
        </button>
        <button
          className="btnEliminateUser"
          onClick={() => {
            eliminateManager(id);
            console.log(id);
            setShow(false);
            onClose();
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );}
export default EditManagersModal;
