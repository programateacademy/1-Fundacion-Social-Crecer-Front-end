import { useState } from "react";
import Form from "react-bootstrap/Form";
import users from "../../apis/index";

const EditDeleteFunction = ({ id, docnum1, name1, email1,unity1, setShow ,onClose,setIsEditing }) => {
  const [form, setForm] = useState(
    {
      name: name1, 
      docnum: docnum1, 
      email: email1, 
      unity: unity1
    }
  )
  const handleInputText = (e) => {
    let { name, value } = e.target;
    let newForm = { ...form, [name]: value };
    setForm(newForm);
  };
const handleEditClick = () => {
      editManager(id);
      setIsEditing(false);
      setShow(false);
      onClose();
  };  
      
  const deleteManager = async (id) => { 
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
          onClick={_=> {handleEditClick();setShow(false)}}
        >
          Editar
        </button>
        <button
          className="btnEliminateUser"
          onClick={() => {
            deleteManager(id);
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
export default EditDeleteFunction;
