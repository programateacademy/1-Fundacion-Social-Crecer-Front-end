import { useState, useRef } from "react";
import users from '../../apis/index'
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert'

const AddManagersModal = ({ add, setShow, managers}) => {
  const [validated, setValidated] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorDocnumMessage, setErrorDocnumMessage] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [usuarioIndex,setUsuarioIndex] = useState(-1);
  const [repatedE,setRepeatedE] = useState(-1);
  const repeatedId=(ID)=>{return (managers.findIndex((usuario) => usuario.docnum === ID))};
  const repeatedEmail=(email)=>{return (managers.findIndex((usuario) => usuario.email === email))};
  const formRef = useRef(null);
  const role="admin";
  // State to send form data
  const [form, setForm] = useState(formModel);
  
  const formModel = {
    name: "",
    email: "",
    unity: "",
    newPassword: "",
    confirmNewPassword: "",
    docnum: ""
  }
  /*   const handleCreate = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    //alert(usuarioIndex);
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if(usuarioIndex!==-1){
      setErrorDocnumMessage("Este ID ya existe");
    } else if(repatedE!==-1){
      setErrorEmailMessage("Este email ya existe");
    } else if (password !== password2) {
      setErrorPasswordMessage("Las contraseñas no coinciden");
    } 
      else {
      const addItem = {
        docnum: docnum,
        name: name,
        email: email,
        password: password,
        unity:unity,
        role:role
      };
      add(addItem);
      setShow(false);
    }
    setValidated(true);
  }; */

   // Función para manejar los cambios en los campos del formulario
/*    const handleChange = (e) => {
    // Actualizar el estado del formulario
    setForm({
      ...form,
      [e.target.name]: e.target.value
    }); */

    const handleInputText = e=>{
      let {name, value} = e.target;
      let newForm = {...form, [name]: value};
      setForm(newForm);
    };

    const handleInputNumber = e=>{
      let {name, value} = e.target;
      let newForm = {...form, [name]: parseInt(value)};
      setForm(newForm);
    };


  const addManagers = async () => {
    try {
      const response = await users.post('/api/superadmin/admin', form, {
        headers: {
          Authorization: localStorage.getItem( 'token' || 'recovery-token')
        }
      })
      console.log(response)
    } catch (error) {
      console.error(error.response.data);
    }
  }
  return (
    <div id="Form">
      <button onClick={() => addManagers()}>ENVIAR</button>
      <Form noValidate validated={validated} ref={formRef}>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder="Numero de identificación"
            required
            name="docnum"
            value={formModel.docnum}
            onChange={handleInputNumber}
            isInvalid={errorDocnumMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorDocnumMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder="Nombre"
            required
            name="name"
            value={formModel.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
            required
            name="email"
            value={formModel.email}
            onChange={handleInputText}/* ,setRepeatedE(repeatedEmail(e.target.value)),setErrorEmailMessage('')  */
            isInvalid={errorEmailMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorEmailMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder="Unidad"
            required
            name="unity"
            value={formModel.unity}
            onChange={handleInputText}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="password"
            placeholder="Contraseña"
            required
            name="newPassword"
            value={formModel.newPassword}
            onChange={handleInputText}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="password"
            placeholder="Repetir contraseña"
            name="confirmNewPassword"
            value={formModel.confirmNewPassword}
            onChange={handleInputText}
            required
            isInvalid={errorPasswordMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorPasswordMessage}
          </Form.Control.Feedback>
        </Form.Group>

      </Form>
      {/* Button functionality assignment */}
      <div className="btnsUser">
          <button type="submit" className="btnCreateUser">Crear</button>
          <button className="btnCancelUser" onClick={() => setShow(false)}>Cancelar</button>
        </div>
    </div>
  );
};

export default AddManagersModal;