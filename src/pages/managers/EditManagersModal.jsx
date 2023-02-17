//   Imports the main React component and hook
import { useState } from "react";
//   Imports form Bootstrap
import Form from "react-bootstrap/Form";
import modelUser from '../../assets/img/userImage.png';

const EditManagersModal = ({ id1, name1, email1,setShow,editManagers,setManagers,eliminateManager}) => {

  //   States for item document
  const [id, setId]=useState(id1);
  const [newName, setNewName] = useState(name1);
  const [newEmail, setNewEmail] = useState(email1);


/* //   Managers model 
const editItem ={
    newId:newId,
    newName: newName,
    newEmail: newEmail,
}; */

  //   Component return
  return (
    <div id="Form">
      <Form>
        <Form.Group className="inputNewUser">
          <Form.Control type="text" placeholder={id1}
            onChange={(e) => {setNewId(e.target.value)}}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder={name1}
            onChange={(e) => {setNewName(e.target.value)}} 
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control type="email" placeholder={email1}        
          onChange={(e) => {setNewEmail(e.target.value)}}
          />
        </Form.Group>
      </Form>
      {/* Button functionality assignment */}
      <div className="btnsUser">
          <button className="btnCreateUser" onClick={()=>{editManagers(id1, setManagers,newName,newEmail),setShow(false)}} >Editar</button>
          <button className="btnEliminateUser" onClick={() => {eliminateManager(id1, setManagers),setShow(false)}}>Eliminar</button>
        </div>
    </div>
  );
};

export default EditManagersModal;