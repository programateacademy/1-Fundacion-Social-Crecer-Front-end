import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert'
import users from "../../apis/index";

const ReallyEdit = ({ id, docnum1,name1,email1,unity1,setShow,setManagers,getManagers,onClose,
  setIsEditing={setIsEditing} }) => {
  const [alertMessage, setAlertMessage] = useState("")
  const [form, setForm] = useState({email: email1})


  const handleInputText = (e) => {
    let { name, value } = e.target;
    let newForm = { ...form, [name]: (value? value: key) };
    setForm(newForm);
  };

  const handleChangePassword = async () => {
    try{
      const response = await users.put('/api/change-password', form, {
        headers: {
          Authorization: localStorage.getItem('token' || 'recovery-token')
        }
      })

      await setShow(false)
    }catch(error){
      console.log(error.response.data)
      setAlertMessage(error.response.data.error)
      setTimeout(() => setAlertMessage(''), 3000)
    }
  }
  const handleEditUser= async () => {
    try{
      const response = await users.put(`/api/superadmin/admin/${id}`, form, {
        headers: {
          Authorization: localStorage.getItem('token' || 'recovery-token')
        }
      })
      console.log(response)
      await setShow(false)
    }catch(error){
      console.log(error.response.data)
      setAlertMessage(error.response.data.error)
      setTimeout(() => setAlertMessage(''), 3000)
    }
  }

  

  return (
    <div id="Form">
      {alertMessage ? <Alert variant="danger">{alertMessage}</Alert> : ''}
      <Form>
        <Form.Group className="inputNewUser" controlId="formBasicPassword">
          <Form.Label>Numero de Documento</Form.Label>
          <Form.Control
            type="string"
            name="docnum"
            key={docnum1}
            placeholder={docnum1}
            onChange={handleInputText}
          />
        </Form.Group>
        <Form.Group className="inputNewUser" controlId="formBasicPassword">
          <Form.Label>Nombre del usuario</Form.Label>
          <Form.Control
            type="string"
            name="name"
            placeholder={name1}
            onChange={handleInputText}
            key={name1}
          />
        </Form.Group>
        <Form.Group className="inputNewUser" controlId="formBasicPassword">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="docNum"
            placeholder={email1}
            onChange={handleInputText}
            key={email1}
          />
        </Form.Group>
        <Form.Group className='inputNewUser'>
          <label>Unidad</label>
          <Form.Select name='unity' onChange={handleInputText} key={unity1}>
            <option value={unity1} hidden></option>
            <option value='FISCALA' >FISCALA- U1</option>
            <option value='USME'>USME- U2</option>
            <option value='SERRANIAS'>SERRANIAS- U3</option>
            <option value='VIRREY'>VIRREY- U4</option>
            <option value='SAN JUAN A'>SAN JUAN A- U5</option>
            <option value='EL UVAL'>EL UVAL - U6</option>
            <option value='TRIANGULO'>TRIANGULO - U7</option>
            <option value='LORENZO'>LORENZO- U8</option>
          </Form.Select>
{/*           <Form.Control
            type='text'
            placeholder='Unidad'
            required
            name='unity'
            value={formManager.unity}
            onChange={handleInputText}
          /> */}
        </Form.Group>
                
      </Form>
      <div className="btnsUser">
        <button
          className="btnCreateUser"
          onClick={_=> {handleEditUser();getManagers()}}
        >
          Confirmar
        </button>
        <button
          className="btnEliminateUser"
          onClick={() => {
            setShow(false)
            getManagers();
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );}
export default ReallyEdit;
