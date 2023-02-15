//   Imports the main React component and hook
import { useState } from "react";
//   Imports form Bootstrap
import Form from "react-bootstrap/Form";
import modelUser from '../../assets/img/userImage.png';

const AddManagersModal = ({add,setShow}) => {

  //   States for item document
  const [id, setId]=useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


//   Managers model 
const addItem ={
    id:id,
    name: name,
    email: email,
    img:modelUser,
    password: password,
};

  //   Component return
  return (
    <div id="Form">
      <Form>
        <Form.Group className="inputNewUser">
          <Form.Control type="text" placeholder="Numero de identificación" 
            onChange={(e) => {setId(e.target.value)}}
          />
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
      <div className="btnsCreateUser">
          <button className="btnCreateUser" onClick={()=>{add(addItem), setShow(false)}} >Crear</button>
          <button className="btnCancelUser" onClick={() => setShow(false)}>Cancelar</button>
        </div>
    </div>
  );
};

export default AddManagersModal;