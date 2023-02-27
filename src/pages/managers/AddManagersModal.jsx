import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import modelUser from '../../assets/img/userImage.png';

const AddManagersModal = ({ add, setShow, managers}) => {
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorIdMessage, setErrorIdMessage] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [usuarioIndex,setUsuarioIndex] = useState(-1);
  const [repatedE,setRepeatedE] = useState(-1);
  const repeatedId=(ID)=>{return (managers.findIndex((usuario) => usuario.id === ID))};
  const repeatedEmail=(email)=>{return (managers.findIndex((usuario) => usuario.email === email))};
  const formRef = useRef(null);

  const handleCreate = (e) => {
    e.preventDefault();
    const form = formRef.current;
    alert(usuarioIndex);
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if(usuarioIndex!==-1){
      setErrorIdMessage("Este ID ya existe");
    } else if(repatedE!==-1){
      setErrorEmailMessage("Este email ya existe");
    } else if (password !== password2) {
      setErrorPasswordMessage("Las contraseñas no coinciden");
    } 
      else {
      const addItem = {
        id: id,
        name: name,
        email: email,
        img: modelUser,
        password: password
      };
      add(addItem);
      setShow(false);
    }
    setValidated(true);
  };

  return (
    <div id="Form">
      <Form noValidate validated={validated} ref={formRef}>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder="Numero de identificación"
            required
            value={id}
            onChange={(e) => { setId(e.target.value), setUsuarioIndex(repeatedId(e.target.value)),setErrorIdMessage('')}}
            isInvalid={errorIdMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorIdMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder="Nombre"
            required
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value),setRepeatedE(repeatedEmail(e.target.value)),setErrorEmailMessage('') }}
            isInvalid={errorEmailMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorEmailMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="password"
            placeholder="Repetir contraseña"
            value={password2}
            onChange={(e) => { setPassword2(e.target.value), setErrorPasswordMessage('')}}
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
          <button className="btnCreateUser" onClick={handleCreate} >Crear</button>
          <button className="btnCancelUser" onClick={() => setShow(false)}>Cancelar</button>
        </div>
    </div>
  );
};

export default AddManagersModal;