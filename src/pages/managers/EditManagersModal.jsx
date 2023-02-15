//   Imports the main React component and hook
import { useState } from "react";
//   Imports form Bootstrap
import Form from "react-bootstrap/Form";
import modelUser from '../../assets/img/userImage.png';

const EditManagersModal = ({id1, name1, email1,setShow,edit}) => {

  //   States for item document
  const [id, setId]=useState(id1);
  const [name, setName] = useState(name1);
  const [email, setEmail] = useState(email1);


//   Managers model 
const editItem ={
    id:id,
    name: name,
    email: email,
};

  //   Component return
  return (
    <div id="Form">
      <Form>
        <Form.Group className="inputNewUser">
          <Form.Control type="text" placeholder={id1}
            onChange={(e) => {setId(e.target.value)}}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder={name1}
            onChange={(e) => {setName(e.target.value)}}
            value={name1}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control type="text" placeholder={email1}        
          onChange={(e) => {setEmail(e.target.value)}}
          value={email1}/>
        </Form.Group>
      </Form>
      {/* Button functionality assignment */}
      <div className="btnsCreateUser">
          <button className="btnCreateUser" onClick={()=>{edit(theManager._id, editItem), setShow(false)}} >Editar</button>
          <button className="btnCancelUser" onClick={() => setShow(false)}>Cancelar</button>
        </div>
    </div>
  );
};

export default EditManagersModal;