import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import modelUser from '../../assets/img/userImage.png';

const AddManagersModal = ({ add, setShow }) => {
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const formRef = useRef(null);

  const handleCreate = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if (password !== password2) {
      alert("Las contraseñas no coinciden");
    } else {
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
            onChange={(e) => { setId(e.target.value) }}
          />
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
            onChange={(e) => { setEmail(e.target.value) }}
          />
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
            onChange={(e) => { setPassword2(e.target.value) }}
            required
          />
        </Form.Group>
      </Form>
      {/* Button functionality assignment */}
      <div className="btnsCreateUser">
          <button className="btnCreateUser" onClick={handleCreate} >Crear</button>
          <button className="btnCancelUser" onClick={() => setShow(false)}>Cancelar</button>
        </div>
    </div>
  );
};

export default AddManagersModal;