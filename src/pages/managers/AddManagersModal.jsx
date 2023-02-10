//   Imports the main React component and hook
import { useState } from "react";
//   Imports form Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const AddManagersModal = ({add}) => {

  //   States for item document
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


//   Item model 
const addItem ={
    name: name,
    email: email,
    password: password,
};

  //   Component return
  return (
    <div id="Form">
      <Form>
        <Form.Group className="inputNewUser">
          <Form.Control type="text" placeholder="Numero de identificación" />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder="Nombre"
            onChange={(e) => {setName(e.target.value)}}
            value={name}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control type="text" placeholder="Correo electrónico"          
          onChange={(e) => {setEmail(e.target.value)}}
          value={email}/>
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control type="text" placeholder="Contraseña"          
          onChange={(e) => {setPassword(e.target.value)}}
          value={password}/>
        </Form.Group>
      </Form>
      {/* Button functionality assignment */}

    </div>
  );
};

export default AddManagersModal;